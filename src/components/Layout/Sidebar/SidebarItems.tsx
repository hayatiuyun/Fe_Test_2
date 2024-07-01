import React from "react";
import Menuitems, { MenuItem } from "./MenuItems";
import { usePathname } from "next/navigation";
import { Box, List } from "@mui/material";
import NavItem from "./NavItem";
import MenuDropdown from "./MenuDropdown";

const SidebarItems = ({ toggleMobileSidebar, isSidebarOpen }: any) => {
  const pathname = usePathname();
  const pathDirect = pathname;

  return (
    <Box sx={{ px: isSidebarOpen ? 3 : 1.5, transition: "padding 0.2s" }}>
      <List sx={{ pt: 0 }} className="sidebarNav" component="div">
        {/* Render Menuitems mapping */}
        {Menuitems.map((item: MenuItem) => {
          if (!item.submenu) {
            return (
              <NavItem
                item={item}
                key={item.id}
                pathDirect={pathDirect}
                isSidebarOpen={isSidebarOpen}
                onClick={toggleMobileSidebar}
              />
            );
          } else {
            // Ensure that 'item' properties are valid React props
            const { id, submenu, ...otherProps } = item;
            return (
              <MenuDropdown
                key={id}
                id={id}
                pathDirect={pathDirect}
                isSidebarOpen={isSidebarOpen}
                onClick={toggleMobileSidebar}
                submenu={submenu}
                icon={item.icon}
                { ...otherProps }
                // Spread other valid props here
              />
            );
          }
        })}
      </List>
    </Box>
  );
};

export default SidebarItems;
