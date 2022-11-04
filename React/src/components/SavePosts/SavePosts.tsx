import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "~/app/hooks";
import {
  getAllPostSave,
  getAllPostSaveAsync,
} from "~/features/savePosts/savePostsSlice";
import styles from "./savePostsStyles.module.scss";

type Props = {};
const SavePosts: React.FC<Props> = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const allPostSave = useAppSelector(getAllPostSave);

  useEffect(() => {
    dispatch(getAllPostSaveAsync());
  }, []);
  return (
    <div className={styles.savePosts}>
      <ul className={styles.savePostList}>
        {allPostSave?.length > 0
          ? allPostSave.map((post) => (
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
  );
};

export default SavePosts;
