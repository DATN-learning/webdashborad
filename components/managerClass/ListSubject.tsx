import { ISubject } from "@/interface/Class";
import { getSubjectClass } from "@/redux/classRoom/selectors";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { chooseSubject } from "@/redux/classRoom/actions";
import { BiPlus } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { SiGoogleclassroom } from "react-icons/si";
import { BsBookHalf } from "react-icons/bs";
import { RiCriminalLine } from "react-icons/ri";
import ClassModal from "./Modal/ClassModal";
import SubjectModal from "./Modal/SubjectModal";
import ChapterModal from "./Modal/ChapterModal";
import PopupSubject from "../popups/PoupSubject";
import { toast } from "react-toastify";
interface ListSubjectProps {
  options: { value: number; label: string }[];
}
const ListSubject = ({ options }: ListSubjectProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [showPlus, setShowPlus] = React.useState(false);
  const [listSubject, setListSubject] = React.useState<ISubject[]>([]);
  const listClass = useSelector(getSubjectClass);
  const [showModalClass, setShowModalClass] = React.useState(false);
  const [showModalSubject, setShowModalSubject] = React.useState(false);
  const [showModalChapter, setShowModalChapter] = React.useState(false);
  const [showDetailSubject, setShowDetailSubject] = React.useState(false);
  const handleButton1Click = () => {
    setShowModalClass(true);
  };
  const handleButton2Click = () => {
    setShowModalSubject(true);
  };

  const handleButton3Click = () => {
    setShowModalChapter(true);
  };
  const handleCloseModal1 = () => {
    setShowModalClass(false);
  };
  const setUpData = async () => {
    const classRoom = await listClass.listClass.find(
      (item) => item.class === Number(listClass.numberClassRoom)
    );
    setListSubject(classRoom?.subjects || []);
    router.query.name == undefined &&
      router.push({
        pathname: `/managerClass/`,
        query: {
          name:
            classRoom?.subjects && classRoom?.subjects?.length > 0
              ? classRoom?.subjects[0].slug
              : "",
        },
      });
    dispatch(
      chooseSubject({
        id:
          classRoom?.subjects && classRoom?.subjects?.length > 0
            ? classRoom?.subjects[0].id_subject
            : "",
        name:
          classRoom?.subjects && classRoom?.subjects?.length > 0
            ? classRoom?.subjects[0].name_subject
            : "",
        id_relation:
          classRoom?.subjects && classRoom?.subjects?.length > 0
            ? classRoom?.subjects[0].id
            : -1,
      })
    );
  };
  React.useEffect(() => {
    setUpData();
  }, [listClass.numberClassRoom]);
  const handleChooseSubject = (slug: string, id: string, name: string) => {
    router.push({
      pathname: `/managerClass/`,
      query: {
        name: slug,
      },
    });
    dispatch(
      chooseSubject({
        id,
        name,
        id_relation: listSubject.find((item) => item.slug === slug)?.id || -1,
      })
    );
  };

  const handleOpenDetailSubject = () => {
    alert("double click");
  };

  const handleCloseDetailSubject = () => {
    setShowDetailSubject(false);
  };
  return (
    <div>
      {listSubject && listSubject.length > 0 ? (
        <div>
          <div
            className="flex-wrap gap-2 grid grid-cols-3 xl:grid-cols-4 mt-2 border-2 border-gray-200 rounded-lg p-4 relative 
        overflow-y-auto h-[calc(100vh-100px)]
      "
          >
            {listSubject?.map((item, index) => (
              <div
                key={item.id}
                className={`flex flex-col items-center justify-center  p-4 border-2 border-gray-200 shadow-lg rounded-lg pb-2  cursor-pointer
            ${
              item.slug === router.query.name
                ? "bg-[#9e80f27f] animate-active-subject  "
                : "bg-white"
            }
            `}
                onClick={() => {
                  handleChooseSubject(
                    item.slug,
                    item.id_subject,
                    item.name_subject
                  );
                }}
                onDoubleClick={handleOpenDetailSubject}
              >
                <img src={item.logo_image} alt={item.name_subject} />
                <p className="font-bold text-md xl:text-xl">
                  {item.name_subject}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <span className="">Chưa có môn học nào</span>
        </div>
      )}
    </div>
  );
};

export default ListSubject;
