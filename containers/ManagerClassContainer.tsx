import ChooseLesstion from "@/components/managerClass/ChooseLesstion";
import ChooseSubject from "@/components/managerClass/ChooseSubject";
import { getSubjectClass } from "@/redux/classRoom/selectors";
import React from "react";
import { useSelector } from "react-redux";
const ManagerClassContainer = () => {
  const subjectClass = useSelector(getSubjectClass);
  return (
    <>
      {subjectClass.loading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex">
          <div className="flex-1 p-2">
            <ChooseSubject />
          </div>
          <div className="flex-1 p-2">
            <ChooseLesstion />
          </div>
        </div>
      )}
    </>
  );
};

export default ManagerClassContainer;
