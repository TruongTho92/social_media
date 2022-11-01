import { Typography } from "antd";
import { SearchUserResponse, UserResponse } from "~/common/types";
import "./accountListStyles.scss";
type Props = {
  data: UserResponse[] | SearchUserResponse[];
};

const AccountList: React.FC<Props> = ({ data }) => {
  return (
    <div className=" search__user-list w-100 ">
      {data && data.length > 0
        ? data.map((user) => (
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
