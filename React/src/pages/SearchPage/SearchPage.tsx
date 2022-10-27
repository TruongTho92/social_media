import React from "react";
import Search from "~/components/Search";
import Header from "~/components/Header";

const SearchPage: React.FC = () => {
  return (
    <>
      <Header />
      <div>
        <Search />
      </div>
    </>
  );
};

export default SearchPage;
