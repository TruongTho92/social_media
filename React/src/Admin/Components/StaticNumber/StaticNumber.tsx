import { UserResponse } from "~/common/types";
import "./staticNumberStyles.scss";
import { PostResponse } from "../../../common/types";
type Props = {
  icon: React.ReactNode;
  title: string;
  data: UserResponse[] | PostResponse[];
};

const PostsNumber = ({ icon, title, data }: Props) => {
  return (
    <div className="post__number">
      <div>
        <div className="post__number-icon">{icon}</div>
        <div className="post__number-content">
          <h1 className="heading">{title}</h1>
          <p className="number">{data.length}</p>
        </div>
      </div>
    </div>
  );
};

export default PostsNumber;
