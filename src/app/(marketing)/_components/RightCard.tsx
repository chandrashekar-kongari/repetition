"use client";

import React from "react";

const RightCard = () => {
  return (
    <div className="w-full flex items-center justify-center lg:justify-end">
      <div className="w-full aspect-video max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl relative">
        <img
          src="/Fast-Internet.svg"
          alt="Fast Internet"
          className="w-full h-full object-contain"
          style={{ filter: "brightness(0) invert(1)" }}
        />
      </div>
    </div>
  );
};

export default RightCard;
