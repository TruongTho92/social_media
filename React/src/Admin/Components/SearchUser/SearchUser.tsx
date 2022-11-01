import { Input, Typography } from "antd";
import React, { useEffect, useState } from "react";
import AccountList from "~/Admin/Components/AccountList";
import { useAppDispatch, useAppSelector } from "~/app/hooks";
import useDebounce from "~/common/hooks/useDebounce";
import { SearchUserResponse } from "~/common/types";
import { getAllUser } from "~/features/Admin/AllUser/allUserSlice";
import { searchAccountApi } from "~/features/searchAccount/searchAccountApi";
import { getSearchResults } from "~/features/searchAccount/searchAccountSlice";

import "./searchUserStyles.scss";

const SearchUser: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const debounceValue = useDebounce(searchValue, 500);

  const dispatch = useAppDispatch();
  const allUser = useAppSelector(getAllUser);
  const resultSearch = useAppSelector(getSearchResults);

  useEffect(() => {
    if (searchValue.length <= 0) return;
    dispatch(searchAccountApi.search(searchValue.trim()));
  }, [debounceValue]);

  return (
    <div className="search">
      <Typography className="search__heading">Search user</Typography>
      <Input
        className="search__input"
        placeholder="Enter name user..."
        onChange={(e) => setSearchValue(e.target.value)}
        suffix={<i className="bi bi-search search__icon"></i>}
      />
      {searchValue.length > 0 && resultSearch.length > 0 ? (
        <AccountList data={resultSearch} />
      ) : (
        <AccountList data={allUser} />
      )}
    </div>
  );
};

export default SearchUser;
