import React from "react";
import { Link } from "react-router-dom";
import { arrow_down } from "../assets/images";

const EmptyStateWithNavLink = ({
  image,
  mainText,
  imgStyles,
  subText,
  subTextStyles,
  mainTextStyles,
  showNavBtn,
  link,
  linkText,
}) => {
  return (
    <div className=" flex justify-center items-center flex-col">
      <img src={image} alt="Empty" className={`${imgStyles}`} />
      <h4 className={`${mainTextStyles || " text-primary text-sm font-bold"}`}>
        {mainText}
      </h4>
      <p
        className={`${
          subTextStyles || "font-normal text-primary"
        }  text-center w-[90%] md:w-full`}
      >
        {subText}{" "}
        {linkText && (
          <Link
            className="text-sm font-bold underline hover:opacity-55 transition-all ease-in-out duration-300"
            to={link}
          >
            {linkText}
          </Link>
        )}
      </p>
      {showNavBtn && (
        <>
          <img src={arrow_down} alt="arrow down" className="h-8 mt-4 bounce" />
          <Link to={link}>
            {" "}
            <button className="bg-primary mt-8 text-white h-[48px] rounded-[60px] w-[174px] text-sm font-bold">
              Click here{" "}
            </button>
          </Link>
        </>
      )}
    </div>
  );
};

export default EmptyStateWithNavLink;
