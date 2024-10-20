import BottomNav from "../components/BottomNav";
import { HomeView } from "../components/home";

const Home = () => {
  return (
    <div className="h-[100vh] flex add__grid w-full">
      <div className="flex w-full h-full items-center justify-center">
        <HomeView />
      </div>
      <BottomNav />
    </div>
  );
};

export default Home;
