import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "~/app/hooks";
import {
  getAllPostSave,
  getAllPostSaveAsync,
  getLoadingSave,
} from "~/features/savePosts/savePostsSlice";
import LoadingSpinner from "../LoadingSpinner";

import styles from "./savePostsStyles.module.scss";

type Props = {};
const SavePosts: React.FC<Props> = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const allPostSave = useAppSelector(getAllPostSave);
  const loadingSave = useAppSelector(getLoadingSave);
  const allPostSaveSort = [...allPostSave].sort(
    (a, b) => Number(b.updated_at) - Number(a.updated_at)
  );

  useEffect(() => {
    dispatch(getAllPostSaveAsync());
  }, []);

  return (
    <>
      {loadingSave ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LoadingSpinner width={30} />
        </div>
      ) : (
        <div className={styles.savePosts}>
          <ul className={styles.savePostList}>
            {allPostSave?.length > 0
              ? allPostSaveSort.map((post) => (
                  <div className={styles.savePostItem} key={post.id}>
                    <Link
                      to={`/post-newfeeds/${post.id}`}
                      state={{ background: location }}
                    >
                      <img src={`${post.image}`} alt="" />
                    </Link>
                  </div>
                ))
              : null}
          </ul>
        </div>
      )}
    </>
  );
};

export default SavePosts;
