import React from "react";
import { SubMenuItem, MenuItem } from "./MenuItems";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import NavItem from "./NavItem";

interface MenuDropdownProps extends MenuItem {
  isSidebarOpen: boolean;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  pathDirect: string;
}

const MenuDropdown = ({
  id,
  title,
  icon,
  href,
  submenu,
  isSidebarOpen,
  onClick,
  pathDirect,
}: MenuDropdownProps) => {
  const [open, setOpen] = React.useState(false);
  const Icon = icon;
  const itemIcon = <Icon stroke={1.5} size="1.3rem" />;

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <ListItemButton
        onClick={handleClick}
        sx={{
          px: 1.5,
          borderRadius: "8px",
          mb: 1,
          whiteSpace: "nowrap",
          marginBottom: "2px",
          padding: "8px 10px",
          paddingLeft: "10px",
          color: "text.secondary",

          "&:hover": {
            backgroundColor: "primary.light",
            color: "primary.main",
          },
          "&.Mui-selected": {
            color: "white",
            backgroundColor: "primary.main",
            "&:hover": {
              backgroundColor: "primary.main",
              color: "white",
            },
          },
          ...(open && {
            bgcolor: "primary.light",
          }),
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: "36px",
            p: isSidebarOpen ? "3px 0" : "0",
            color: "inherit",
          }}
        >
          {itemIcon}
        </ListItemIcon>
        {isSidebarOpen && <ListItemText primary={title} />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {submenu?.map((subitem: SubMenuItem) => (
            <NavItem
              key={subitem.id}
              item={subitem}
              pathDirect={pathDirect}
              onClick={onClick}
              isSidebarOpen={isSidebarOpen}
              level={2}
            />
          ))}
        </List>
      </Collapse>
    </div>
  );
};

export default MenuDropdown;
