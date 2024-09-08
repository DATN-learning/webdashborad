import { getChapterSubject } from "@/api/class/subjectApi";
import { IChapterSubject } from "@/interface/Chapter";
import { Select } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { options } from "@/data/dropdown";
import { useSelector } from "react-redux";
import { getChooseSubject } from "@/redux/classRoom/selectors";
import Chapter from "./Dropdown/Chapter";
import { Slide } from "react-toastify";
const ChooseLesstion = () => {
  const router = useRouter();
  const [dataChapter, setDataChapter] = React.useState<IChapterSubject[]>([]);
  const [selectedOption, setSelectedOption] = React.useState<any>(null);
  const handleOptionChange = (selectedOption: any) => {
    setSelectedOption(selectedOption);
  };
  const getSubject = useSelector(getChooseSubject);
  React.useEffect(() => {
    const fetch = async () => {
      const res = await getChapterSubject(getSubject.id);
      setDataChapter(res?.chapter);
    };
    fetch();
  }, [router]);
  const renderComponent = () => {
    switch (selectedOption) {
      case "Chapter":
        return <Chapter dataChapter={dataChapter} />;
      case "Slide":
        return <Slide />;
      default:
        return <Chapter dataChapter={dataChapter} />;
    }
  };
  return (
    <div className="">
      <div className="border-[2px] border-gray-200 rounded-lg p-2 flex items-center justify-between">
        <div className="flex-1 ">
          <p className="font-bold ">
            {selectedOption?.value ? selectedOption?.value : "Chọn mục"}
          </p>
        </div>
        <Select
          className="w-1/3 text-[#9e80f2]"
          allowClear
          options={options}
          value={selectedOption}
          defaultValue={options[0]}
          onChange={handleOptionChange}
        />
      </div>
      <div className="border-[2px] border-gray-200 rounded-lg mt-2 p-2 flex  justify-between overflow-y-auto h-[calc(100vh-100px)]">
        {renderComponent()}
      </div>
    </div>
  );
};

export default ChooseLesstion;
