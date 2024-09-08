import React from "react";
import { Avatar, Card, Dropdown } from "antd";
import { ButtonCommon } from "../Button";
import { useSelector } from "react-redux";
import { getPostByIDSel } from "@/redux/post/selectors";
import { getPostByIdApi } from "@/api/post/postApi";
import { IPostById } from "@/interface/Post";
import { BsThreeDotsVertical } from "react-icons/bs";
import CommentPost from "../CommentPost/CommentPost";
import { MenuProps } from "antd";
import { AiFillDelete, AiOutlineEdit } from "react-icons/ai";
const { Meta } = Card;
const items: MenuProps["items"] = [
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
        onClick={() => {
          confirm();
        }}
      >
        <span>Delete</span>
      </div>
    ),
  },
];

const PostDetail = () => {
  const postId = useSelector(getPostByIDSel);
  const [post, setPost] = React.useState<IPostById>();
  const [showComment, setShowComment] = React.useState<boolean>(false);
  React.useEffect(() => {
    const getPostById = async () => {
      const res = await getPostByIdApi(postId);
      if (res.status === 200) {
        if (res.data.status) {
          setPost(res.data.data);
        }
      }
    };
    getPostById();
  }, [postId]);

  return (
    <div>
      {post && (
        <>
          <Card bordered={true} className="w-full">
            <div className="flex items-center justify-between">
              <Meta
                avatar={<Avatar src={post?.user_create.avatar} size={50} />}
                title={
                  post?.user_create.first_name +
                  " " +
                  post?.user_create.last_name
                }
                description={post?.timeAgo}
              />
              <div className="cursor-pointer text-xl">
                <Dropdown menu={{ items }} placement="bottomLeft">
                  <BsThreeDotsVertical />
                </Dropdown>
              </div>
            </div>
            <div className="mt-3">
              <img
                src={post?.images[0].url_image}
                className="w-full rounded-md"
              />
              <p className="font-bold">{post?.title}</p>
              <p>{post?.description}</p>
            </div>
            <div className="mt-3 flex items-center  justify-between">
              <div className="flex items-center space-x-3">
                <div>
                  <ButtonCommon title={post?.classNumber} />
                </div>
                <div>
                  <ButtonCommon title={post?.subjectName} />
                </div>
              </div>
              <div onClick={() => setShowComment(!showComment)}>
                <ButtonCommon title="Show comment" />
              </div>
            </div>

            {showComment && <CommentPost />}
          </Card>
        </>
      )}
    </div>
  );
};

export default PostDetail;
