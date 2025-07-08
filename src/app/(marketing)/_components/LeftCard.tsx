"use client";
import { Button } from "@/_components/ui/button";
import { useStackApp } from "@stackframe/stack";

const LeftCard = () => {
  const app = useStackApp();
  return (
    <div className="flex flex-col gap-y-2 w-full">
      <p className="text-base sm:text-sm p-2 sm:p-3 px-3 sm:px-4 rounded-2xl border w-full sm:w-fit max-w-full">
        Welcome to texts.run!
      </p>
      <p className="text-base sm:text-sm p-2 sm:p-3 px-3 sm:px-4 rounded-2xl border w-full sm:w-fit max-w-full">
        The fastest way to launch a personal webpage.
      </p>

      <p className="text-base sm:text-sm p-2 sm:p-3 px-3 sm:px-4 rounded-2xl border w-full sm:w-fit max-w-full">
        your story in a familiar, easy-to-read format. No coding required, just
        cool messenger-like bubbles. easy-to-read format. No coding required,
        just cool messenger-like bubbles.
      </p>
      <p className="text-base sm:text-sm p-2 sm:p-3 px-3 sm:px-4 rounded-2xl border w-full sm:w-fit max-w-full">
        youad format. No coding required, just cool messenger-like bubbles.
      </p>
      <p className="text-base sm:text-sm p-2 sm:p-3 px-3 sm:px-4 rounded-2xl border w-full sm:w-fit max-w-full">
        Just write your story and your site is live.
      </p>

      <div className="p-1">
        <Button
          className="cursor-pointer w-fit p-6"
          onClick={() => app.redirectToSignUp()}
        >
          Get Started for free
        </Button>
      </div>
    </div>
  );
};

export default LeftCard;
