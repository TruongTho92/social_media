import { Typography } from "antd";
import { useAppSelector } from "~/app/hooks";
import { getAllUser } from "~/features/Admin/AllUser/allUserSlice";
import "./accountListStyles.scss";
type Props = {};

const AccountList = (props: Props) => {
  const allUser = useAppSelector(getAllUser);

  return (
    <div className=" search__user-list w-100 ">
      {allUser && allUser.length > 0
        ? allUser.map((user) => (
            <div
              className="search__user-item w-100 d-flex justify-content-between align-items-center"
              key={user.id}
            >
              <div className="user__item-left d-flex justify-content-start align-items-center">
                <div className="user__item-img">
                  <img
                    src={
                      user.avatar
                        ? user.avatar
                        : "/assets/images/user-vacant.jpg"
                    }
                    alt=""
                  />
                </div>
                <div className="user__item-info">
                  <Typography className="user__item-name">
                    {user.user_name}
                  </Typography>
                  <Typography className="user__item-role">User</Typography>
                </div>
              </div>
              <div className="user__item-right">
                <i className="far fa-expand-arrows-alt"></i>
              </div>
            </div>
          ))
        : null}
    </div>
  );
};

export default AccountList;
