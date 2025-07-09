import { stackServerApp } from "@/stack";
import ClientWrapper from "./_components/ClientWrapper";

const App = async () => {
  await stackServerApp.getUser({ or: "redirect" });

  return <ClientWrapper />;
};

export default App;
