import { useEffect, useState } from "react";
import apiClient from "~/apiClient/apiClient";
import styles from "./homeStyles.module.scss";

export interface postsTypes {
  id: number;
  title: string;
  description: string;
}

const HomePage = () => {
  const [posts, setPosts] = useState<postsTypes[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await apiClient.get("/posts");
      console.log(res.data);
      setPosts(res.data);
    };
    fetchPosts();
  }, []);

  return (
    <div className={styles.homePage}>
      {posts && posts.length > 0
        ? posts.map((post) => <li key={post.id}>{post.title}</li>)
        : ""}
    </div>
  );
};

export default HomePage;
