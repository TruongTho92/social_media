import { Input, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { useAppDispatch, useAppSelector } from "~/app/hooks";
import useDebounce from "~/common/hooks/useDebounce";
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
    dispatch(searchAccountApi.search(searchValue));
  }, [debouncedValue]);

  return (
    <div className={styles.searchHeader}>
      <Tooltip
        trigger={"focus"}
        className={styles.tooltipUser}
        placement="bottom"
        color={"#fff"}
        title={
          loadingSearch ? (
            <div className={styles.loading}>
              <LoadingSpinner width={16} />
            </div>
          ) : (
            <div className={styles.userList}>
              {resultSearch?.length <= 0 ? (
                <div className={styles.textError}>
                  <span>No result found</span>
                </div>
              ) : (
                resultSearch.map((user) => (
                  <Link
                    to={
                      user.id === getUserData.user.id
                        ? "/profile"
                        : `/user-profile/${user.id}`
                    }
                    className={styles.userItem}
                    key={user.id}
                  >
                    <div className={styles.userItem} key={user.id}>
                      <div className={styles.userInfo}>
                        <img
                          src={
                            user.avatar
                              ? user.avatar
                              : "/assets/images/user-vacant.jpg"
                          }
                          alt=""
                          className={styles.userImg}
                        />
                        <div className={styles.info}>
                          <span className={styles.name}>{user.user_name}</span>
                          <span className={styles.description}>
                            {user.nick_name}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
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
            setSearchValue(e.target.value.trim())
          }
        />
      </Tooltip>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        theme="dark"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default SearchHeader;
