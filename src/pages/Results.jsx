import BottomNav from "../components/BottomNav";
import { HomeView } from "../components/home";
import { ResultsView } from "../components/results";

const Results = () => {
  return (
    <div className="h-[100vh] flex add__grid w-full ">
      <div className="flex w-full h-full items-center justify-center">
        <ResultsView />
      </div>
      <BottomNav />
    </div>
  );
};

export default Results;
