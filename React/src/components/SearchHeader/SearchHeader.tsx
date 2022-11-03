import { Input, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "~/app/hooks";
import useDebounce from "~/common/hooks/useDebounce";
import { SearchUserResponse } from "~/common/types";
import { getUser } from "~/features/Auth/userSlice";
import { searchAccountApi } from "~/features/searchAccount/searchAccountApi";
import {
  getLoadingSearch,
  getSearchResults,
} from "~/features/searchAccount/searchAccountSlice";
import LoadingSpinner from "../LoadingSpinner";
import styles from "./searchHeaderStyles.module.scss";

const SearchHeader: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce<string>(searchValue, 500);
  const loadingSearch = useAppSelector(getLoadingSearch);
  const getUserData = useAppSelector(getUser);
  const resultSearch = useAppSelector(getSearchResults);

  // CALL API SEARCH USER
  useEffect(() => {
    if (searchValue.length <= 0) return;
    dispatch(searchAccountApi.search(searchValue.trim()));
  }, [debouncedValue.trim()]);

  return (
    <div className={styles.searchHeader}>
      <Tooltip
        trigger={"focus"}
        className={styles.tooltipUser}
        placement="bottom"
        color={"#fff"}
        title={
          searchValue.length <= 0 ? (
            <div className={styles.loading}>
              <AiOutlineLoading className={styles.loadingIcon} />
            </div>
          ) : (
            <div className={styles.userList}>
              {resultSearch?.length <= 0 ? (
                <div className={styles.textError}>
                  <span>No result found</span>
                </div>
              ) : (
                resultSearch.map((user) => (
                  <div className={styles.userItem} key={user.id}>
                    <div className={styles.userInfo}>
                      <Link
                        to={
                          user.id === getUserData.user.id
                            ? "/profile"
                            : `/user-profile/${user.id}`
                        }
                      >
                        <img
                          src={
                            user.avatar
                              ? user.avatar
                              : "/assets/images/user-vacant.jpg"
                          }
                          alt=""
                          className={styles.userImg}
                        />
                      </Link>
                      <div className={styles.info}>
                        <span className={styles.name}>{user.user_name}</span>
                        <span className={styles.description}>
                          {user.nick_name}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )
        }
      >
        <Input
          className={`${styles.searchInput} `}
          placeholder="Search"
          value={searchValue}
          suffix={
            searchValue.length > 0 ? (
              <>
                {loadingSearch && (
                  <div className={styles.iconSuffix}>
                    <LoadingSpinner width={16} />
                  </div>
                )}
              </>
            ) : null
          }
          prefix={<IoSearchOutline className={styles.searchIcon} />}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchValue(e.target.value)
          }
        />
      </Tooltip>
    </div>
  );
};

export default SearchHeader;
