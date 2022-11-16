import { Typography } from "antd";
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

const SavePosts: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const allPostSave = useAppSelector(getAllPostSave);
  const loadingSave = useAppSelector(getLoadingSave);

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
          {allPostSave?.length > 0 ? (
            <ul className={styles.savePostList}>
              {allPostSave.map((post) => (
                <div className={styles.savePostItem} key={post.id}>
                  <Link
                    to={`/post-newfeeds/${post.id}`}
                    state={{ background: location }}
                  >
                    {post.image.length > 1 ? (
                      <div className={styles.imageMutiple}>
                        <div className={styles.iconDuplicate}>
                          <i className="fas fa-clone"></i>
                        </div>
                        <img src={`${post.image[0]}`} alt="" />
                      </div>
                    ) : (
                      <img src={`${post.image[0]}`} alt="" />
                    )}
                  </Link>
                </div>
              ))}
            </ul>
          ) : (
            <Typography className={styles.textError}>
              Dont have post save
            </Typography>
          )}
        </div>
      )}
    </>
  );
};

export default SavePosts;
