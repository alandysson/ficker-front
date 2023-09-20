"use client";
import MainContext from "@/context";
import { useContext, useEffect, useState } from "react";
import { HomeScreen } from "./pages/Home/Home";
import { Spin } from "antd";
import Resume from "./resume/page";

export default function Home() {
  const { auth, setAuth } = useContext(MainContext);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuth(true);
    }
    setLoading(false);
  }, []);

  if (loading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );

  if (auth) return <Resume />;

  return <HomeScreen />;
}
