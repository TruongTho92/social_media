import { Outlet } from "react-router-dom";
import Account from "~/components/Account";

type Props = {};

const Profile = (props: Props) => {
  return (
    <div className="">
      <Account />
      <Outlet />
    </div>
  );
};

export default Profile;
