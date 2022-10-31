import { Input, Typography } from "antd";
import React from "react";
import AccountList from "~/Admin/Components/AccountList";

import "./searchUserStyles.scss";

const SearchUser: React.FC = () => {
  return (
    <div className="search">
      <Typography className="search__heading">Search user</Typography>
      <Input
        className="search__input"
        placeholder="Enter name user..."
        suffix={<i className="bi bi-search search__icon"></i>}
      />
      <AccountList />
    </div>
  );
};

export default SearchUser;
