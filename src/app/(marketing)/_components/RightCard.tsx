"use client";

import YouTube from "react-youtube";
import React, { useState } from "react";

const RightCard = () => {
  const [loading, setLoading] = useState(true);
  return (
    <div className="w-full flex items-center justify-end">
      <div className="w-full aspect-video max-w-3xl relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/3 z-10">
            <span className="inline-block w-12 h-12 border-4 border-t-transparent border-white/50 rounded-full animate-spin" />
          </div>
        )}
        <YouTube
          videoId="kEwhrnyx-4A"
          className="w-full h-full"
          opts={{
            width: "100%",
            height: "100%",
          }}
          onReady={() => setLoading(false)}
        />
      </div>
    </div>
  );
};

export default RightCard;
