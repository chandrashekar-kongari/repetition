import { stackServerApp } from "@/stack";
import BottomBar from "./_components/BottomBar";
import LeftCard from "./_components/LeftCard";
import RightCard from "./_components/RightCard";
import TopNavBar from "./_components/TopNavBar";
import { redirect } from "next/navigation";

const MarketingPage = async () => {
  const user = await stackServerApp.getUser();

  if (user) {
    redirect("/app");
  }

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="w-full">
        <TopNavBar />
      </div>

      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto items-stretch justify-between w-full gap-6 md:gap-8 px-4 sm:px-6 md:px-8">
        <div className="w-full max-w-md mx-auto lg:w-1/3 lg:mx-0 mb-4 lg:mb-0 mt-4 sm:mt-6 md:mt-8">
          <LeftCard />
        </div>
        <div className="w-full lg:w-2/3 lg:ml-auto">
          <RightCard />
        </div>
      </div>

      <div className="w-full">
        <BottomBar />
      </div>
    </div>
  );
};

export default MarketingPage;
