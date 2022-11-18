import { Tag, Tooltip, Typography } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import moment from "moment";
import React, { useState } from "react";
import Slider from "react-slick";
import { ToastContainer } from "react-toastify";
import { useAppDispatch } from "~/app/hooks";
import { PostResponse } from "~/common/types";
import {
  NextArrow,
  PrevArrow,
} from "~/components/ArrowSlickCustom/ArrowSlickCustom";
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

  const settings = {
    dots: false,

    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
    className: "slider postImgSlider",
    nextArrow: (
      <NextArrow
        styleArrow="arrow"
        styleNext="next"
        styleIcon="arrowNextIcon"
      />
    ),
    prevArrow: (
      <PrevArrow
        styleArrow="arrow"
        stylePrev="prev"
        styleIcon="arrowNextIcon"
      />
    ),
  };

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
      title: "Name",
      dataIndex: "user_name",
      key: "user_name",
      className: "cell__user-username",
      render: (username: number) => (
        <Typography className="table__user-name">{username}</Typography>
      ),
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      className: "cell__image",
      render: (image: any[], record) => (
        <Tooltip
          trigger={"hover"}
          placement="right"
          color="#fff"
          title={
            <div className="table__posts-morePost">
              <div className="table__posts-morePost-info">
                <div className="avatar">
                  <img
                    src={
                      record.avatar
                        ? record.avatar
                        : "/assets/images/user-vacant.jpg"
                    }
                    alt="avatar-user"
                  />
                </div>
                <Typography className="name">{record.user_name}</Typography>
              </div>
              <div className="table__posts-morePost-img">
                <img src={record.image} alt="" />
              </div>
              <i className="fas fa-sun table__posts-morePost-sunIcon"></i>
            </div>
          }
        >
          {image && (
            <Slider {...settings}>
              {image.map((image) => (
                <div className="table__posts-image" key={image}>
                  <img src={`${image}`} alt="" />
                </div>
              ))}
            </Slider>
          )}
        </Tooltip>
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
              ellipsis ? { rows: 2, expandable: true, symbol: "more" } : false
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
        return (
          <Typography className="table__posts-date">
            {moment(date).fromNow()}
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
              return (
                <Typography className="table__dots-hidden">...</Typography>
              );
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

export default TablePosts;
