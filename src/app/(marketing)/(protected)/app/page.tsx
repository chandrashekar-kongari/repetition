import { stackServerApp } from "@/stack";
import MainComponent from "./_components/MainComponent";
import UserSettings from "./_components/UserSettings";

const App = async () => {
  await stackServerApp.getUser({ or: "redirect" });

  return (
    <div>
      <MainComponent />
      <UserSettings />
    </div>
  );
};

export default App;
