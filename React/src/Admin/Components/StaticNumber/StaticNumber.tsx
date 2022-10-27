import "./staticNumberStyles.scss";
type Props = {
  icon: React.ReactNode;
  title: string;
};

const PostsNumber = ({ icon, title }: Props) => {
  return (
    <div className="post__number">
      <div>
        <div className="post__number-icon">{icon}</div>
        <div className="post__number-content">
          <h1 className="heading">{title}</h1>
          <p className="number">123.123</p>
        </div>
      </div>
    </div>
  );
};

export default PostsNumber;
