import { Input } from "antd";
import { useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "~/app/hooks";
import useDebounce from "~/common/hooks/useDebounce";
import { AllAccountResponse } from "~/common/types";
import { searchAccountApi } from "~/features/searchAccount/searchAccountApi";
import { getSearchResults } from "~/features/searchAccount/searchAccountSlice";
import { userAllApi } from "~/features/userAll/userAllApi";
import { getAllUser } from "~/features/userAll/userAllSlice";
import styles from "./searchStyles.module.scss";
type Props = {};

const Search = (props: Props) => {
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce<string>(searchValue, 500);

  const resultSearch = useAppSelector(getSearchResults);
  const allAccount = useAppSelector(getAllUser);

  // CALL API SEARCH USER
  useEffect(() => {
    if (searchValue.length <= 0) return;
    dispatch(searchAccountApi.search(searchValue.trim()));
  }, [debouncedValue.trim()]);

  useEffect(() => {
    dispatch(userAllApi.getAllUser());
  }, [allAccount]);

  return (
    <div className={styles.searchContainer}>
      <form action="">
        <Input
          suffix={<BiSearch size={20} />}
          className={styles.searchInput}
          placeholder="Search user..."
          onChange={(e) => setSearchValue(e.target.value)}
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
            <div className={styles.searchError}>User dont exist</div>
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
