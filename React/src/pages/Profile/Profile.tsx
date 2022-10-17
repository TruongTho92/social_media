import { Outlet } from "react-router-dom";
import Account from "~/components/Account";

const Profile: React.FC = () => {
  return (
    <div className="">
      <Account />
      <Outlet />
    </div>
  );
};

export default Profile;
