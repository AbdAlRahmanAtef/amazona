import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiAddFill } from "react-icons/ri";
import { AiOutlineUser } from "react-icons/ai";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { setActiveSidebar } from "redux/slices/sidebarSlice";

const Sidebar = ({ activeStep = 0 }) => {
  const dispatch = useDispatch();
  const { isActive } = useSelector((state) => state.sidebar);
  const links = [
    {
      title: "Dashboard",
      href: "/admin/dashboard",
      icon: <RxDashboard size={25} />,
    },
    {
      title: "Add Product",
      href: "/admin/add-product",
      icon: <RiAddFill size={25} />,
    },
    {
      title: "Users",
      href: "/admin/users",
      icon: <AiOutlineUser size={25} />,
    },
    {
      title: "Orders",
      href: "/admin/orders",
      icon: <MdOutlineDeliveryDining size={25} />,
    },
  ];
  return (
    <aside
      onMouseEnter={() => dispatch(setActiveSidebar(true))}
      onMouseLeave={() => dispatch(setActiveSidebar(false))}
      className={`flex flex-col min-w-fit py-2 h-[100vh] duration-300 border-r `}
    >
      {links.map((link, step) => (
        <Link
          className={`flex gap-2 items-center px-4 py-2 ${
            activeStep === step && "bg-[#eee]"
          } hover:bg-[#eee]`}
          href={link.href}
          key={link.title}
        >
          {link.icon}
          <span className={`${isActive ? "inline" : "hidden"}`}>
            {link.title}
          </span>
        </Link>
      ))}
      {/* <Link
        className="flex gap-2 items-center px-4 py-2 hover:bg-[#eee] rounded-md "
        href="/admin/users"
      >
        <AiOutlineUser size={25} />{" "}
        <span className={`${isActive ? "inline" : "hidden"}`}>Users</span>
      </Link>
      <Link
        className="flex gap-2 items-center px-4 py-2 hover:bg-[#eee] rounded-md "
        href="/admin/products"
      >
        <MdOutlineDeliveryDining size={25} />{" "}
        <span className={`${isActive ? "inline" : "hidden"}`}>Orders</span>
      </Link> */}
    </aside>
  );
};

export default Sidebar;
