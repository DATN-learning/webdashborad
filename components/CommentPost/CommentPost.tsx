import { deleteCommentPosts, getCommentsByPostIdApi } from "@/api/post/postApi";
import { IComment } from "@/interface/Comment";
import { getPostByIDSel } from "@/redux/post/selectors";
import { Avatar, Card, Pagination, PaginationProps, Dropdown, Modal } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MenuProps } from "antd";
import { AiFillDelete, AiOutlineEdit } from "react-icons/ai";
import { toast } from "react-toastify";
const { Meta } = Card;

const CommentPost = () => {
  const postId = useSelector(getPostByIDSel);
  const [comment, setComment] = React.useState<IComment[]>([]);
  const [page, setPage] = React.useState<number>(1);
  const [lastPage, setLastPage] = React.useState<number>(0);
  React.useEffect(() => {
    const getComment = async () => {
      const res = await getCommentsByPostIdApi(postId, 10, page);
      res.data.data.last_page && setLastPage(res.data.data.last_page);
      if (res.status === 200) {
        if (res.data.status) {
          setComment(res.data.data.data);
        }
      }
    };
    getComment();
  }, [postId, page]);
  
  const getItems = (comment_id: string): MenuProps["items"] => [
    {
      key: "1",
      icon: <AiOutlineEdit size={20} />,
      label: (
        <div className="text-lg">
          <span>Edit</span>
        </div>
      ),
    },
    {
      key: "2",
      icon: <AiFillDelete size={20} />,
      label: (
        <div
          className="text-lg"
          onClick={() => handleDeleteComment(comment_id)}>
          <span>Delete</span>
        </div>
      ),
    },
  ];
  const onChange: PaginationProps["onChange"] = (pageNumber) => {
    setPage(pageNumber);
  };
  const handleDeleteComment = async (comment_id: string) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa bình luận này?",
      okText: "Xóa",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          const res = await deleteCommentPosts(comment_id);
          if (res) {
            toast.success("Xóa bình luận thành công!"); 
            setComment((prev) => prev.filter((item) => item.comment_id !== comment_id)); 
          } else {
            toast.error("Xóa bình luận thất bại!"); 
          }
          console.log(comment_id)
        } catch (error) {
          console.error("Error deleting comment:", error);
          toast.error("Có lỗi xảy ra khi xóa bình luận!"); // Thông báo lỗi
        }
      },
    });
  };

  return (
    <div className="mt-3">
      {comment.map((item, index) => (
        <Card bordered={false} className="w-full mt-3" key={item.id}>
          <div className="flex items-center justify-between">
            <Meta
              avatar={<Avatar src={item?.user_create.avatar} size={50} />}
              title={
                item?.user_create.first_name + " " + item?.user_create.last_name
              }
              description={item?.timeAgo}
            />
            <div className="cursor-pointer text-xl">
            <Dropdown menu={{ items: getItems(item.comment_id) }} placement="bottomLeft">
                <BsThreeDotsVertical />
              </Dropdown>
            </div>
          </div>
          <div className="space-y-2 mt-3">
            <p>{item.body}</p>
            <p>{item.title}</p>
            <img
            src="https://i.pinimg.com/564x/ab/ca/9b/abca9be563b4ca5760eeb795def1bffc.jpg"
            className="w-full rounded-md"
          />
          </div>
        </Card>
      ))}
      {comment.length > 0 && (
        <div className="mt-2">
          <Pagination
            defaultCurrent={1}
            onChange={onChange}
            total={lastPage * 10}
          />
        </div>
      )}
    </div>
  );
};

export default CommentPost;
