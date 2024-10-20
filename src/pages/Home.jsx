import BottomNav from "../components/BottomNav";
import { HomeView } from "../components/home";

const Home = () => {
  return (
    <div className="h-[100vh] flex add__grid w-full">
      <div className="flex-1 h-full overflow-auto relative">
        <HomeView />
      </div>
      <BottomNav />
    </div>
  );
};

export default Home;
