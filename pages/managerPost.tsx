import PostDetail from "@/components/Post/PostDetail";
import PostMain from "@/components/Post/PostMain";
import { data, dataPost } from "@/data/data";
import { getPostRequest } from "@/redux/post/actions";
import { selectPostList } from "@/redux/post/selectors";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaShoppingBag } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const managerPost = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getPostRequest());
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="p-4 mb-2">
        <div
          className="w-full m-auto border rounded-lg bg-white 
        h-[calc(100vh-60px)] flex"
        >
          <div className="flex-1 p-3 overflow-y-auto">
            <PostMain />
          </div>
          <div className="flex-1 overflow-y-auto p-3">
            <PostDetail />
          </div>
        </div>
      </div>
    </div>
  );
};

export default managerPost;
