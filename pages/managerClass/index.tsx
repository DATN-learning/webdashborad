import ManagerClassContainer from "@/containers/ManagerClassContainer";
import { getSubjectClassRoomRequest } from "@/redux/classRoom/actions";
import React from "react";
import { useDispatch } from "react-redux";

export default function index() {
  const dispatch = useDispatch();
  const subject = React.useCallback(() => {
    dispatch(getSubjectClassRoomRequest());
  }, [dispatch]);
  React.useEffect(() => {
    subject();
  }, [subject]);

  return (
    <div>
      <ManagerClassContainer />
    </div>
  );
}
