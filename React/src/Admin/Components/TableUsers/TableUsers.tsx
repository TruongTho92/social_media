import { Input, Table, Tag, Tooltip, Typography } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useAppDispatch } from "~/app/hooks";

import { UserResponse } from "~/common/types";
import { allUserApi } from "~/features/Admin/AllUser/allUserApi";
import { deleteAdminApi } from "~/features/Admin/DeleteAccount/deleteAdminApi";

import "./tableUserStyles.scss";

type Props = {
  data: UserResponse[];
};

const TableUsers = ({ data }: Props) => {
  const dispatch = useAppDispatch();

  const [dataSource, setDataSource] = useState<UserResponse[]>();
  const [value, setValue] = useState("");
  const [ellipsis, setEllipsis] = useState(true);

  useEffect(() => {
    setDataSource(data);
  }, [data]);

  const FilterByNameInput = (
    <Input
      placeholder="Search Name"
      value={value}
      className="table__user-search-name"
      onChange={(e) => {
        const currValue = e.target.value;
        setValue(currValue);
        const filteredData = data.filter((entry) =>
          entry.user_name?.includes(currValue)
        );
        setDataSource(filteredData);
      }}
    />
  );

  const FilterByEmailInput = (
    <Input
      placeholder="Search Name"
      value={value}
      className="table__user-search-name"
      onChange={(e) => {
        setValue(e.target.value);
        const filteredData = data.filter((entry) =>
          entry.email?.includes(value)
        );
        setDataSource(filteredData);
      }}
    />
  );

  const columns: ColumnsType<UserResponse> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      className: "cell__id",
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      className: "cell__avatar",
      render: (avatar: string, record) => (
        <Tooltip
          trigger={"hover"}
          placement="right"
          color="#fff"
          title={
            <div className="table__users-moreUser">
              <div className="table__users-moreUser-avatar">
                <img
                  src={
                    record.avatar
                      ? record.avatar
                      : "/assets/images/user-vacant.jpg"
                  }
                  alt="avatar-user"
                />
              </div>
              <div className="table__users-moreUser-info">
                <Typography className="name">{record.user_name}</Typography>
                <Typography className="nickname">{record.nick_name}</Typography>
                {record.is_supervisor ? (
                  <Tag className="table__users-moreUser-role supervisor">
                    Supervisor
                  </Tag>
                ) : (
                  <Tag className="table__users-moreUser-role user">User</Tag>
                )}
              </div>

              <i className="fas fa-sun table__users-moreUser-sunIcon"></i>
            </div>
          }
        >
          <div className="table__user-img">
            <img
              src={avatar ? avatar : "/assets/images/user-vacant.jpg"}
              alt=""
            />
          </div>
        </Tooltip>
      ),
    },
    {
      title: "Name",
      filterDropdown: () => FilterByNameInput,
      filterIcon: () => <i className="fal fa-search"></i>,

      dataIndex: "user_name",
      key: "user_name",
      className: "cell__name",
      render: (username: string) => (
        <Typography className="table__user-name">{username}</Typography>
      ),
    },
    {
      title: "Email",
      filterDropdown: () => FilterByEmailInput,
      filterIcon: () => <i className="fal fa-search"></i>,
      dataIndex: "email",
      key: "email",
      className: "cell__email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      className: "cell__phone",
      render: (phone: string) =>
        phone ? (
          <Typography className="table__user-phone">{phone}</Typography>
        ) : (
          <Typography className="table__user-phone error">None</Typography>
        ),
    },
    {
      title: "bio",
      dataIndex: "bio",
      key: "bio",
      className: "cell__bio",
      render: (bio: any) => {
        return (
          <Typography.Paragraph
            ellipsis={
              ellipsis ? { rows: 1, expandable: true, symbol: "more" } : false
            }
            className="table__user-bio"
          >
            {bio}
          </Typography.Paragraph>
        );
      },
    },

    {
      title: "Role",
      dataIndex: "is_supervisor",
      key: "is_supervisor",
      className: "cell__role",
      render: (supervior: any) => {
        if (!supervior) {
          return <Tag className="table__user-role-user">User</Tag>;
        } else {
          return <Tag className="table__user-role-supervisor">Supervisor</Tag>;
        }
      },
    },
    {
      title: "",
      dataIndex: "delete",
      key: "delete",
      className: "cell__delete",
      onCell: (record, rowIndex) => {
        return {
          onClick: async () => {
            await dispatch(deleteAdminApi.deleteAccount(record.id));
            dispatch(allUserApi.getAllUser());
          },
        };
      },

      render: () => (
        <div className="table__user-delete">
          <i className="fal fa-minus-octagon delete__icon"></i>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        scroll={{ x: "max-content", y: 460 }}
        dataSource={dataSource}
        pagination={{
          pageSize: 9,
          className: "table__pagination",
          itemRender: (page, type, element) => {
            if (type === "prev") {
              return <i className="far fa-chevron-left table__arrow-prev"></i>;
            } else if (type === "next") {
              return <i className="far fa-chevron-right table__arrow-next"></i>;
            } else if (type === "jump-next" || type === "jump-prev") {
              return (
                <Typography className="table__dots-hidden">...</Typography>
              );
            } else {
              return page;
            }
          },
          position: ["bottomCenter"],
        }}
        className="table__user"
        rowKey={(record) => record.id}
      />
      <ToastContainer
        // icon={}
        position="top-center"
        autoClose={1000}
        theme="dark"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default TableUsers;
