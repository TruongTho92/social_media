import { Table, Tag, Typography } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useState } from "react";

import { UserResponse } from "~/common/types";

import "./tableUserStyles.scss";

type Props = {
  data: UserResponse[];
};

const TableUsers = ({ data }: Props) => {
  const [ellipsis, setEllipsis] = useState(true);

  const columns: ColumnsType<UserResponse> = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      className: "cell__avatar",
      render: (avatar: string) => (
        <div className="table__user-img">
          <img
            src={avatar ? avatar : "/assets/images/user-vacant.jpg"}
            alt=""
          />
        </div>
      ),
    },
    {
      title: "Name",
      dataIndex: "user_name",
      key: "user_name",
      className: "cell__name",
      render: (username: string) => (
        <Typography className="table__user-name">{username}</Typography>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      className: "cell__email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      className: "cell__phone",
      render: (phone: string) => (
        <Typography className="table__user-name">{phone}</Typography>
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
          onClick: (event) => {
            console.log(record);
          }, // click row
        };
      },

      render: () => (
        <div className="table__user-delete">
          <i className="far fa-trash-alt delete__icon"></i>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        scroll={{ x: "max-content", y: 460 }}
        dataSource={data}
        className="table__user"
        rowKey={(record) => record.id}
      />
    </div>
  );
};

export default TableUsers;
