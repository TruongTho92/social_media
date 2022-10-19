import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "~/app/hooks";
import PostDetail from "~/components/Posts/PostAccount/PostDetail";
import { postDetailApi } from "~/features/accountPost/postDetail/postDetailApi";
import { getPostDetail, getUsersLiked } from "./postDetailSlice";

export type Props = {
  isAccount: boolean;
};
const PostDetailAction: React.FC<Props> = ({ isAccount }) => {
  const dispatch = useAppDispatch();

  const postDetaiData = useAppSelector(getPostDetail);
  const userLikedData = useAppSelector(getUsersLiked);

  const { id } = useParams();
  const postId = Number(id);

  useEffect(() => {
    dispatch(postDetailApi.getPost(postId));
  }, []);

  return (
    <>
      <PostDetail
        postDetailData={postDetaiData}
        userLiked={userLikedData}
        isAccount={isAccount}
      />
    </>
  );
};

export default PostDetailAction;
