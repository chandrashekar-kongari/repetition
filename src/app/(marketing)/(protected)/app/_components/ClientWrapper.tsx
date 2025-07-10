"use client";

import dynamic from "next/dynamic";

// Dynamic imports for client components to prevent SSR issues
const MainComponent = dynamic(() => import("./MainComponent"), {
  ssr: false,
  loading: () => null,
});

const UserSettings = dynamic(() => import("./UserSettings"), {
  ssr: false,
});

const ClientWrapper = () => {
  return (
    <div>
      <MainComponent />
      <UserSettings />
    </div>
  );
};

export default ClientWrapper;
