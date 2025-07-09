"use client";

import dynamic from "next/dynamic";

// Dynamic imports for client components to prevent SSR issues
const MainComponent = dynamic(() => import("./MainComponent"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 mx-auto"></div>
      </div>
    </div>
  ),
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
