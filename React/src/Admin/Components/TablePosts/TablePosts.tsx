import { Tag, Typography } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import React, { useState } from "react";
import { useAppDispatch } from "~/app/hooks";
import { PostResponse } from "~/common/types";
import { postsApi } from "~/features/accountPost/Posts/postsApi";
import { allPostApi } from "~/features/Admin/AllPost/AllPostApi";
import { deleteAdminApi } from "~/features/Admin/DeleteAccount/deleteAdminApi";
import "./tablePostsStyles.scss";
type Props = {
  data: PostResponse[];
};

const TablePosts = ({ data }: Props) => {
  const dispatch = useAppDispatch();

  const [ellipsis, setEllipsis] = useState(true);

  const columns: ColumnsType<PostResponse> = [
    {
      title: "Id post",
      dataIndex: "id",
      key: "id",
      className: "cell__id",
      sorter: {
        compare: (a, b) => b.id - a.id,
        multiple: 4,
      },
      render: (id: number) => (
        <Typography className="table__user-id">{id}</Typography>
      ),
    },
    {
      title: "User id",
      dataIndex: "user_id",
      key: "user_id",
      className: "cell__user-id",
      render: (id: number) => (
        <Typography className="table__user-id">{id}</Typography>
      ),
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      className: "cell__image",
      render: (image: number) => (
        <div className="table__posts-image">
          <img src={`${image}`} alt="" />
        </div>
      ),
    },

    {
      title: "Caption",
      dataIndex: "caption",
      key: "caption",
      className: "cell__caption",
      render: (caption: string) =>
        caption ? (
          <Typography.Paragraph
            ellipsis={
              ellipsis ? { rows: 1, expandable: true, symbol: "more" } : false
            }
            className="table__posts-caption"
          >
            {caption}
          </Typography.Paragraph>
        ) : (
          <div className="table__posts-caption-error">
            Post dont have content
          </div>
        ),
    },
    {
      title: "Date",
      dataIndex: "created_at",
      key: "created_at",
      className: "cell__created_at",
      render: (date: number) => {
        var dateConvert = new Date(date);
        return (
          <Typography className="table__posts-date">
            {dateConvert.toUTCString()}
          </Typography>
        );
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
            await dispatch(deleteAdminApi.deletePost(record.id));
            dispatch(allPostApi.getAllPost());
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
        pagination={{
          pageSize: 9,
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
        dataSource={data}
        className="table__user"
        locale={{
          triggerDesc: "",
          triggerAsc: "",
          cancelSort: "",
        }}
        rowKey={(record) => record.id}
      />
    </div>
  );
};

export default TablePosts;
