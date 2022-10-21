import { Input, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import styles from "./searchHeaderStyles.module.scss";
import useDebounce from "~/common/hooks/useDebounce";
import { FiCheck } from "react-icons/fi";
import { AiOutlineLoading } from "react-icons/ai";
import { Link } from "react-router-dom";
type Props = {};

const SearchHeader = (props: Props) => {
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce<string>(searchValue, 500);

  // CALL API SEARCH USER
  useEffect(() => {
    console.log(searchValue);
  }, [debouncedValue]);
  return (
    <div className={styles.searchHeader}>
      <Tooltip
        trigger={"click"}
        className={styles.tooltipUser}
        placement="bottom"
        color={"#fff"}
        title={
          searchValue.length ? (
            <div className={styles.userList}>
              <div className={styles.userItem}>
                <div className={styles.userInfo}>
                  <Link to={`/user-profile/`}>
                    <img
                      src="/assets/images/user-img.jpg"
                      alt=""
                      className={styles.userImg}
                    />
                  </Link>
                  <div className={styles.info}>
                    <span className={styles.name}>Minh Tài</span>
                    <span className={styles.description}>Conian Guys</span>
                    <span className={styles.ticked}>
                      <FiCheck className={styles.tickedIcon} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.loading}>
              <AiOutlineLoading className={styles.loadingIcon} />
            </div>
          )
        }
      >
        <Input
          className={`${styles.searchInput} `}
          placeholder="Search"
          value={searchValue}
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
