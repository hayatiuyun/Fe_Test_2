"use client";
import { useMediaQuery, Box, Drawer } from "@mui/material";
import SidebarItems from "./SidebarItems";

interface ItemType {
  isMobileSidebarOpen: boolean;
  onSidebarClose: (event: React.MouseEvent<HTMLElement>) => void;
  isSidebarOpen: boolean;
}

const Sidebar = ({
  isMobileSidebarOpen,
  onSidebarClose,
  isSidebarOpen,
}: ItemType) => {
  const sidebarWidth = "270px";

  return (
    <>
      {/* ------------------------------------------- */}
      {/* Sidebar for mobile */}
      {/* ------------------------------------------- */}
      <Drawer
        anchor="left"
        open={isMobileSidebarOpen}
        onClose={onSidebarClose}
        variant="temporary"
        sx={{
          display: { lg: "none", xs: "block" },
        }}
        PaperProps={{
          sx: {
            width: sidebarWidth,
            boxShadow: (theme) => theme.shadows[8],
          },
        }}
      >
        {/* ------------------------------------------- */}
        {/* Logo */}
        {/* ------------------------------------------- */}
        {/* ------------------------------------------- */}
        {/* Sidebar For Mobile */}
        {/* ------------------------------------------- */}
        <SidebarItems isSidebarOpen={true} />
      </Drawer>

      <Box
        sx={{
          width: {
            lg: isSidebarOpen ? sidebarWidth : "70px",
            xs: "0",
          },
          flexShrink: 0,
          position: "relative",

        }}
      >
        {/* ------------------------------------------- */}
        {/* Sidebar for desktop */}
        {/* ------------------------------------------- */}
        <Drawer
          anchor="left"
          open={isSidebarOpen}
          variant="permanent"
          sx={{
            position: "sticky",
            display: { lg: "block", xs: "none" },
          }}
          PaperProps={{
            sx: {
              width: isSidebarOpen ? `calc(${sidebarWidth} - 30px)` : "70px",
              boxSizing: "border-box",
              mt: "calc(100px + 1.5rem)",
              ml: "15px",
              borderRadius: 4,
              height: "calc(100vh - 100px - 2.5rem)",
              transition: "all 0.5s",
              overflow: "hidden",

            },
          }}
        >
          {/* ------------------------------------------- */}
          {/* Sidebar Box */}
          {/* ------------------------------------------- */}
          <Box
            sx={{
              height: "100%",
              paddingY: 4,
            }}
          >
            {/* ------------------------------------------- */}
            {/* Logo */}
            {/* ------------------------------------------- */}

            <Box>
              {/* ------------------------------------------- */}
              {/* Sidebar Items */}
              {/* ------------------------------------------- */}
              <SidebarItems isSidebarOpen={isSidebarOpen} />
            </Box>
          </Box>
        </Drawer>
      </Box>
    </>

  );
};

export default Sidebar;
