import { Input } from "antd";
import { useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "~/app/hooks";
import useDebounce from "~/common/hooks/useDebounce";
import { searchAccountApi } from "~/features/searchAccount/searchAccountApi";
import {
  getLoadingSearch,
  getSearchResults,
} from "~/features/searchAccount/searchAccountSlice";
import { userAllApi } from "~/features/userAll/userAllApi";
import { getAllUser } from "~/features/userAll/userAllSlice";
import LoadingSpinner from "../LoadingSpinner";
import styles from "./searchStyles.module.scss";
type Props = {};

const Search = (props: Props) => {
  const [searchValue, setSearchValue] = useState("");

  const dispatch = useAppDispatch();
  const debouncedValue = useDebounce<string>(searchValue, 500);
  const resultSearch = useAppSelector(getSearchResults);
  const allAccount = useAppSelector(getAllUser);
  const loadingSearch = useAppSelector(getLoadingSearch);

  // CALL API SEARCH USER
  useEffect(() => {
    if (searchValue.length <= 0) return;
    dispatch(searchAccountApi.search(searchValue));
  }, [debouncedValue]);

  useEffect(() => {
    dispatch(userAllApi.getAllUser());
  }, []);

  return (
    <div className={styles.searchContainer}>
      <form className={styles.formSearch}>
        <Input
          suffix={
            searchValue.length > 0 ? (
              <>
                {loadingSearch && (
                  <div className={styles.iconSuffix}>
                    <LoadingSpinner width={16} />
                  </div>
                )}
              </>
            ) : (
              <BiSearch size={20} />
            )
          }
          className={styles.searchInput}
          placeholder="Search user..."
          onChange={(e) => setSearchValue(e.target.value.trim())}
        />
      </form>
      {searchValue.length > 0 ? (
        <div className={styles.userList}>
          {resultSearch.length > 0 ? (
            resultSearch.map((user) => (
              <div className={styles.userItem} key={user.id}>
                <div className={styles.userInfo}>
                  <Link to={`/user-profile/${user.id}`}>
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
                    <span className={styles.description}>{user.nick_name}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.searchError}>
              <span>User dont exist</span>
            </div>
          )}
        </div>
      ) : (
        <>
          <div className={styles.userList}>
            {allAccount.length > 0 ? (
              allAccount.map((user) => (
                <div className={styles.userItem} key={user.id}>
                  <div className={styles.userInfo}>
                    <Link to={`/user-profile/${user.id}`}>
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
            ) : (
              <div className={styles.loading}>
                <AiOutlineLoading className={styles.loadingIcon} />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Search;
