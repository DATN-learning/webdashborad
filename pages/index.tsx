import Head from "next/head";
import Header from "@/components/Header/Header";
import BarChart from "@/components/Chart/BarChart";
import RecentOrders from "@/components/Order/RecentOrders";
import TopCards from "@/components/TopCard/TopCards";
import { authContext } from "@/context/AuthContext";
import React from "react";
import { Loading } from "@/assets/json";
export default function Home() {
  return (
    <>
      <main className="bg-gray-100 min-h-screen">
        <Header />
        <TopCards />

        <div className="p-4 grid md:grid-cols-3 grid-cols-1 gap-4">
          <BarChart />
          <RecentOrders />
        </div>
      </main>
    </>
  );
}
