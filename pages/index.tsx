import Head from "next/head";
import Header from "@/components/Header/Header";
import BarChart from "@/components/Chart/BarChart";
import RecentOrders from "@/components/Order/RecentOrders";
import TopCards from "@/components/TopCard/TopCards";
import { authContext } from "@/context/AuthContext";
import React from "react";
import { Loading } from "@/assets/json";
import ManagerClassContainer from "@/containers/ManagerClassContainer";
import { useDispatch } from "react-redux";
import { getSubjectClassRoomRequest } from "@/redux/classRoom/actions";

export default function Home() {
  const dispatch = useDispatch();
  const subject = React.useCallback(() => {
    dispatch(getSubjectClassRoomRequest());
  }, [dispatch]);
  React.useEffect(() => {
    subject();
  }, [subject]);
  return (
    <>
      <main className="bg-gray-100 min-h-screen">
        <ManagerClassContainer />
        {/* <Header />
        <TopCards />

        <div className="p-4 grid md:grid-cols-3 grid-cols-1 gap-4">
          <BarChart />
          <RecentOrders />
        </div> */}
      </main>
    </>
  );
}
