import React, { useEffect } from "react";
import TablePosts from "~/Admin/Components/TablePosts";
import { useAppDispatch, useAppSelector } from "~/app/hooks";
import { allPostApi } from "~/features/Admin/AllPost/AllPostApi";
import { getAllPost } from "~/features/Admin/AllPost/AllPostSlice";

type Props = {};

const ManagePosts = (props: Props) => {
  const dispatch = useAppDispatch();
  const allPost = useAppSelector(getAllPost);
  useEffect(() => {
    dispatch(allPostApi.getAllPost());
  }, []);

  return (
    <div className="section">
      <TablePosts />
    </div>
  );
};

export default ManagePosts;
