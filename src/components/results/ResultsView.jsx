import React, { useEffect } from "react";
import EmptyStateWithNavLink from "../EmptyStateWithNavLink";
import { ghost } from "../../assets/images";

const ResultsView = () => {
  return (
    <div className="">
      <EmptyStateWithNavLink
        image={ghost}
        mainText={"Ready to Dive In?"}
        imgStyles={"h-[150px]"}
        subText={
          "Start your journey by creating your first analysis. To get started"
        }
        linkText={" Click here"}
        showNavBtn={false}
        link={"/"}
      />
    </div>
  );
};

export default ResultsView;
