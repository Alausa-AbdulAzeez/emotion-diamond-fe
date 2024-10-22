import { bouncingCircles } from "../assets/images";

const LoadingComponent = ({ style }) => {
  return (
    <div className="">
      <img src={bouncingCircles} className="" style={style} />
    </div>
  );
};

export default LoadingComponent;
