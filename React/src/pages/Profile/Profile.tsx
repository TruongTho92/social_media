import { Outlet } from "react-router-dom";
import Account from "~/components/Account";
import Header from "~/components/Header";

const Profile: React.FC = () => {
  return (
    <>
      <Header />
      <>
        <Account />
        <Outlet />
      </>
    </>
  );
};

export default Profile;
