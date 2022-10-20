import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "~/app/hooks";
import PostDetail from "~/components/Posts/PostAccount/PostDetail";
import { postDetailApi } from "~/features/accountPost/postDetail/postDetailApi";
import {
  getPostDetail,
  getUsersCommented,
  getUsersLiked,
} from "./postDetailSlice";

export type Props = {
  isAccount: boolean;
};
const PostDetailAction: React.FC<Props> = ({ isAccount }) => {
  const dispatch = useAppDispatch();

  const postDetaiData = useAppSelector(getPostDetail);
  const userLikedData = useAppSelector(getUsersLiked);
  const userCommentedData = useAppSelector(getUsersCommented);
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
        commentData={userCommentedData}
        isAccount={isAccount}
        postId={postId}
      />
    </>
  );
};

export default PostDetailAction;
