import React from "react";
import { NavLink } from "react-router-dom";

const BottomNav = () => {
  // Tabs to be displayed
  const tabs = [
    { id: "home", label: "Home", url: "/" },
    { id: "results", label: "Results", url: "/results" },
  ];

  return (
    <div className="w-full fixed bottom-10 flex justify-center items-center">
      <div className="h-[60px] min-w-[200px] bg-primary-10 rounded p-1 flex gap-1">
        {tabs?.map((tab) => {
          const { id, label, url } = tab;
          return <NavItem label={label} key={id} url={url} />;
        })}
      </div>
    </div>
  );
};

export default BottomNav;

const NavItem = ({ url, label }) => {
  return (
    <NavLink to={url} className="flex-1">
      {({ isActive }) => (
        <div
          className={`${
            isActive ? " bg-primary text-white" : "bg-white text-primary"
          }  flex-1 cursor-pointer h-full flex  relative  items-center justify-center rounded gap-2 py-3 px-2 font-semibold text-sm hover:opacity-55 transition-all ease-in-out duration-300`}
        >
          {label}
          <div
            className={`${
              isActive ? "visible absolute" : "hidden"
            }  -bottom-3 bg-primary w-10 h-[2px] rounded-full`}
          ></div>
        </div>
      )}
    </NavLink>
  );
};
