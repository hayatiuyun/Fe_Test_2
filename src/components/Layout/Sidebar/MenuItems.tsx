import {
    IconCopy,
    IconLayoutDashboard,
    IconTypography,
  } from "@tabler/icons-react";

  export interface SubMenuItem {
    id: string;
    title: string;
    href: string;
  }

  export interface MenuItem {
    id: string;
    title: string;
    icon?: any;
    href: string;
    submenu?: SubMenuItem[] | undefined;
  }
  
  const Menuitems = [
    {
      id: "dashboard",
      title: "Dashboard",
      icon: IconLayoutDashboard,
      href: "/",
    },
    {
      id: "reports",
      title: "Traffic Reports",
      icon: IconTypography,
      href: "#",
      submenu: [
        {
          id: "today-reports",
          title: "Todays Reports",
          href: "/traffic-reports/today",
        },
        {
          id: "monthly-reports",
          title: "Monthly Reports",
          href: "/traffic-reports/monthly",
        },
        {
          id: "annual-reports",
          title: "Annual Reports",
          href: "/traffic-reports/annual",
        },
      ],
    },
    {
      id: "master-gates",
      title: "Master Gates",
      icon: IconCopy,
      href: "/master-gates",
    }
  ];
  
  export default Menuitems;