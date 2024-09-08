import React from "react";
import { IChapterSubject, ILessionByChapterPayLoad } from "@/interface/Chapter";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { BsEye, BsPencil } from "react-icons/bs";
import PopupChapter from "@/components/popups/PopupChapter";
import PopupLesstion from "@/components/popups/PopupLesstion";
import { IoAddOutline } from "react-icons/io5";
import PopupAddLession from "../Modal/PopupAddLession";
import { useDispatch } from "react-redux";
import { chooseChapterEBRD } from "@/redux/classRoom/actions";
type MenuItem = Required<MenuProps>["items"][number];
interface Props {
  dataChapter: IChapterSubject[];
}
const Chapter: React.FC<Props> = ({ dataChapter }) => {
  const dispatch = useDispatch();
  const [openPopup, setOpenPopup] = React.useState(false);
  const [indexPopup, setIndexPopup] = React.useState<number>(1);
  const [popupChapter, setPopupChapter] = React.useState(false);
  const [popupLesstion, setPopupLesstion] = React.useState(false);
  const [chooseChapter, setChooseChapter] = React.useState<
    IChapterSubject | undefined
  >(undefined);
  const [chooseLesstion, setChooseLesstion] = React.useState<
    ILessionByChapterPayLoad | undefined
  >(undefined);
  const closePopupChapter = () => {
    setPopupChapter(false);
  };
  const handleChooseChapter = (item: IChapterSubject) => {
    setChooseChapter(item);
  };

  const closePopupLesstion = () => {
    setPopupLesstion(false);
  };

  const handleChooseLesstion = (item: ILessionByChapterPayLoad) => {
    setPopupLesstion(true);
    setChooseLesstion(item);
  };
  const items: MenuItem[] = [
    ...(dataChapter?.map((item: IChapterSubject) => {
      return {
        label: (
          <div onClick={() => handleChooseChapter(item)}>
            {item.name_chapter_subject}
          </div>
        ),
        key: item.id,
        icon: (
          <div className="flex items-center space-x-2">
            <div
              onClick={() => {
                dispatch(
                  chooseChapterEBRD({
                    id: item.id_chapter_subject,
                    name: item.name_chapter_subject,
                    id_relation: item.id,
                  })
                );
                setOpenPopup(true);
                setIndexPopup(1);
              }}
              className="bg-[#2be36b] text-white p-3 rounded-lg inline-block"
            >
              <IoAddOutline className="inline-block " />
            </div>
            <div className="bg-[#9e80f2] text-white p-3 rounded-lg inline-block">
              <BsEye className="inline-block " />
            </div>
            <div
              className="bg-[#9e80f2] text-white p-3 rounded-lg inline-block"
              onClick={() => {
                setPopupChapter(true);
                setChooseChapter(item);
              }}
            >
              <BsPencil className="inline-block " />
            </div>
          </div>
        ),
        children: [
          ...(item.lessions?.map((child: ILessionByChapterPayLoad) => {
            return {
              label: (
                <div onClick={() => handleChooseLesstion(child)}>
                  {child.name_lesstion_chapter}
                </div>
              ) as any,
              key: child.id,
            };
          }) || []),
        ],
      };
    }) || []),
  ];

  return (
    <div className="w-full">
      {dataChapter?.length > 0 ? (
        <Menu
          mode="inline"
          className="w-full border-[2px] border-gray-200 rounded-lg"
          items={items}
        />
      ) : (
        <p>Không có chương học nào</p>
      )}
      <PopupChapter
        open={popupChapter}
        onClose={closePopupChapter}
        chooseChapter={chooseChapter}
      />
      <PopupLesstion
        open={popupLesstion}
        onClose={closePopupLesstion}
        chooseLesstion={chooseLesstion}
        chooseChapter={chooseChapter}
      />
      <PopupAddLession
        open={openPopup && indexPopup == 1}
        onCancel={() => setOpenPopup(false)}
      />
    </div>
  );
};

export default Chapter;
