import { Input } from "antd";
import React from "react";
import { BiSearch } from "react-icons/bi";
import UserList from "../UserList";
import styles from "./searchStyles.module.scss";
type Props = {};

const Search = (props: Props) => {
  return (
    <div className={styles.searchContainer}>
      <form action="">
        <Input
          suffix={<BiSearch size={20} />}
          className={styles.searchInput}
          placeholder="Search user..."
        />
      </form>

      <UserList />
    </div>
  );
};

export default Search;
