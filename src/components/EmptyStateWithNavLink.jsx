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
  action,
  disabledState,
  actionButtonText,
  showActionBtn,
}) => {
  return (
    <div className="w-full h-full flex justify-center items-center flex-col">
      <img src={image} alt="Empty" className={`${imgStyles}`} />
      <h4
        className={`${
          mainTextStyles || " text-primary text-sm font-bold 2xl:text-lg"
        }`}
      >
        {mainText}
      </h4>
      <p
        className={`${
          subTextStyles || "font-normal text-primary"
        }  text-center w-[90%] md:w-full 2xl:text-lg`}
      >
        {subText}{" "}
        {linkText && (
          <Link
            className="text-sm font-bold underline hover:opacity-55 transition-all ease-in-out duration-300 2xl:text-lg"
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
            <button className="bg-primary mt-8 text-white h-[48px] rounded-[60px] w-[174px] text-sm 2xl:text-lg font-bold ">
              Click here{" "}
            </button>
          </Link>
        </>
      )}
      {showActionBtn && (
        <button
          type="button"
          className={`transition-all ease-in-out duration-300 opacity-100 bg-primary mt-7 hover:opacity-70 disabled:opacity-55 disabled:cursor-not-allowed text-white h-[40px] 2xl:h-[48px] rounded w-[150px] 2xl:w-[174px] text-sm 2xl:text-lg font-bold`}
          onClick={action}
          disabled={disabledState}
        >
          {actionButtonText}
        </button>
      )}
    </div>
  );
};

export default EmptyStateWithNavLink;
