import { Input, Table, Tag, Typography } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useEffect, useState } from "react";
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
              return "...";
            } else {
              return page;
            }
          },
          position: ["bottomCenter"],
        }}
        className="table__user"
        rowKey={(record) => record.id}
      />
    </div>
  );
};

export default TableUsers;
