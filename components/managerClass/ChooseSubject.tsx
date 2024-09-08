import { chooseSubject, setClassRoom } from "@/redux/classRoom/actions";
import {
  chooseClassRoom,
  getChooseSubject,
  getSubjectClass,
} from "@/redux/classRoom/selectors";
import { Select } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ListSubject from "./ListSubject";
import ClassModal from "./Modal/ClassModal";
import SubjectModal from "./Modal/SubjectModal";
import { useRouter } from "next/router";
import ChapterModal from "./Modal/ChapterModal";
import { toast } from "react-toastify";

const ChooseSubject = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const classRoom = useSelector(chooseClassRoom);
  const subject = useSelector(getChooseSubject);
  const listClass = useSelector(getSubjectClass);
  const [isShowPopup, setIsShowPopup] = React.useState<boolean>(false);
  const [popupEnable, setPopupEnable] = React.useState<number>(1);
  const [options, setOptions] = React.useState<
    {
      value: number;
      label: string;
    }[]
  >([]);

  React.useEffect(() => {
    setUpdata();
  }, []);

  const handelShowPopup = (enable: number) => {
    setIsShowPopup(true);
    setPopupEnable(enable);
  };

  const setUpdata = async () => {
    const data = await listClass?.listClass?.map((item) => ({
      value: item.class,
      label: item.name_class,
    }));
    setOptions(data);
  };

  const handleChange = (selectClass: any) => {
    const subjectFirst = listClass?.listClass.find(
      (item) => item.class === selectClass
    )?.subjects[0];
    dispatch(setClassRoom(selectClass));
    subjectFirst &&
      (dispatch(
        chooseSubject({
          id: subjectFirst?.id_subject,
          name: subjectFirst?.name_subject,
          id_relation: subjectFirst?.id,
        })
      ),
      router.push({
        pathname: `/managerClass/`,
        query: {
          name: subjectFirst?.slug,
        },
      }));
    !subjectFirst &&
      router.push({
        pathname: `/managerClass/`,
        query: {
          name: "",
        },
      });
  };

  return (
    <div className="">
      <div className="border-[2px] border-gray-200 rounded-lg p-2 flex items-center justify-between">
        <div className="flex-1 ">
          <p className="font-bold ">
            Chọn môn học để xem bài tập và bài giảng{" "}
          </p>
        </div>
        <Select
          className="w-1/3 text-[#9e80f2]"
          allowClear
          options={options}
          value={classRoom}
          onChange={handleChange}
        />
      </div>

      <div className="w-full flex">
        <div className="flex  p-2 ">
          <button
            onClick={() => {
              handelShowPopup(1);
            }}
            className="bg-[#9e80f2] text-white rounded-lg px-4 font-bold  py-2 text-xs"
          >
            <p>Thêm Lớp Học</p>
          </button>
        </div>
        <div className="flex  p-2 ">
          <button
            onClick={() => {
              handelShowPopup(2);
            }}
            className="bg-[#9e80f2] text-white rounded-lg px-4 py-2 font-bold  text-xs"
          >
            <p>Thêm Môn Học</p>
          </button>
        </div>
        <div className="flex p-2 ">
          <button
            onClick={() => {
              subject && subject.id ? handelShowPopup(3):toast.error("Vui lòng chọn môn học");
            }}
            className="bg-[#9e80f2] text-white rounded-lg px-4 py-2 font-bold   text-xs"
          >
            <p>Thêm Chương Học</p>
          </button>
        </div>
      </div>
      <ListSubject options={options} />
      <ClassModal
        open={isShowPopup && popupEnable == 1}
        onCancel={() => {
          setIsShowPopup(false);
        }}
      />
      <SubjectModal
        open={isShowPopup && popupEnable == 2}
        onCancel={() => {
          setIsShowPopup(false);
        }}
      />
      <ChapterModal
        open={isShowPopup && popupEnable == 3}
        onCancel={() => {
          setIsShowPopup(false);
        }}
      />
    </div>
  );
};

export default ChooseSubject;
