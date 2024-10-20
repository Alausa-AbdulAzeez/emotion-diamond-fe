import BottomNav from "../components/BottomNav";
import { HomeView } from "../components/home";
import { ResultsView } from "../components/results";

const Home = () => {
  return (
    <div className="h-[100vh] flex">
      <div className="flex-1 h-full overflow-auto relative">
        <ResultsView />
      </div>
      <BottomNav />
    </div>
  );
};

export default Home;
