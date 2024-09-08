import React from "react";
import { Avatar, Card } from "antd";
import { ButtonCommon } from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { selectPostList } from "@/redux/post/selectors";
import { IPost } from "@/interface/Post";
import { getPostById } from "@/redux/post/actions";
const { Meta } = Card;
const PostMain = () => {
  const getListPost = useSelector(selectPostList);
  const dispatch = useDispatch();
  const [listPost, setListPost] = React.useState<IPost[]>([]);
  const handleGetIdPost = (id: string) => {
    dispatch(getPostById(id));
  };
  return (
    <div className="w-full">
      {getListPost.map((item, index) => (
        <Card
          key={index}
          hoverable
          className="w-full mb-3"
          onClick={() => handleGetIdPost(item.id_post)}
          cover={<img alt="example" src={item.images[0].url_image} />}
        >
          <Meta title={item.title} description={item.description} />
          <div className="flex items-center justify-between mt-4">
            <div className="">
              <ButtonCommon title="Trả lời" />
            </div>
            <div className="flex items-center gap-2">
              <span>{item.timeAgo}</span>
              <Avatar
                src={item?.user_create.avatar}
                // src="https://i.pinimg.com/736x/a5/37/d3/a537d3681fdfddb76ba4d9dca91d70f7.jpg"
                className="w-6 h-6"
              />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default PostMain;
