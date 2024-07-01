"use client";
import { styled, Container, Box } from "@mui/material";
import React, { useState } from "react";
import Header from "@/components/Layout/Header";
import Sidebar from "@/components/Layout/Sidebar";

const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  zIndex: 1,
  backgroundColor: "transparent",
  maxWidth: '100vw',
  overflowX: "hidden"
}));

export default function RootLayout({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  }

  const openMobileSidebar = () => {
    setMobileSidebarOpen(true);
  }

  const closeMobileSidebar = () => {
    setMobileSidebarOpen(false);
  }

  return (
    <MainWrapper className="mainwrapper flex-col">
      {/* Header */}
      {/* ------------------------------------------- */}
      <Header toggleMobileSidebar={openMobileSidebar} />
      {/* ------------------------------------------- */}

      {/* ------------------------------------------- */}
      {/* Main Wrapper */}
      {/* ------------------------------------------- */}
      <PageWrapper
      >
        {/* ------------------------------------------- */}
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          isMobileSidebarOpen={isMobileSidebarOpen}
          onSidebarClose={closeMobileSidebar}
        />
        {/* PageContent */}
        {/* ------------------------------------------- */}
        <Container
          sx={{
            paddingTop: "20px",
            display: "flex",
            marginLeft: 0,
            width: "100%",
            maxWidth: {
              xs: "100%",
              sm: "100%",
              md: "100%",
              lg: "100%",
              xl: "100%",
            },
          }}
          // className={`pt-5 flex flex-col w-full ${isSidebarOpen ? "maw-[1440px]" : ""} `}
        >
          {/* ------------------------------------------- */}
          {/* Sidebar */}
          {/* ------------------------------------------- */}
          {/* ------------------------------------------- */}
          {/* Page Route */}
          {/* ------------------------------------------- */}
          <Box
            sx={{
              minHeight: "calc(100vh - 170px)",
              background: "#FFFFFF",
              border: "0.25px",
              borderColor: "#CCC",
              borderRadius: 3,
              width: "100%",
              maxWidth: {
                xs: "100vw",
                sm: "100vw",
                md: "100vw",
                lg: isSidebarOpen? "calc(100vw - 300px)" : "100vw",
                xl: isSidebarOpen? "calc(100vw - 300px)" : "100vw",
              },
              
            }}
          >
            <div className="border-[0.25px] border-[#CCC] rounded-t-xl bg-gray-200 w-full justify-between flex">
              <h1 className="font-semibold p-1.5 px-3 font-mono capitalize">{title}</h1>
              <div>
                <button
                  className="p-1.5 px-3 font-mono"
                  onClick={toggleSidebar}
                >
                  {isSidebarOpen ? "Hide" : "Show"} Sidebar
                </button>
              </div>
            </div>
            <div className="p-5">{children}</div>
          </Box>
          {/* ------------------------------------------- */}
          {/* End Page */}
          {/* ------------------------------------------- */}
        </Container>
      </PageWrapper>
    </MainWrapper>
  );
}
