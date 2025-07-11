"use client";
import { Button } from "@/_components/ui/button";
import { useStackApp } from "@stackframe/stack";

const LeftCard = () => {
  const app = useStackApp();
  return (
    <div className="flex flex-col gap-y-2 w-full">
      <p className="text-base sm:text-sm p-2 sm:p-3 px-3 sm:px-4 rounded-2xl border w-full sm:w-fit max-w-full">
        Welcome to rread.app!
      </p>

      <p className="text-base sm:text-sm p-2 sm:p-3 px-3 sm:px-4 rounded-2xl border w-full sm:w-fit max-w-full">
        Too many apps overwhelm you with notifications, ads, and endless
        features. We keep it minimal.
      </p>
      <p className="text-base sm:text-sm p-2 sm:p-3 px-3 sm:px-4 rounded-2xl border w-full sm:w-fit max-w-full">
        We believe reading should be simple, focused, and high-quality.
      </p>
      <p className="text-base sm:text-sm p-2 sm:p-3 px-3 sm:px-4 rounded-2xl border w-full sm:w-fit max-w-full">
        Every detail protects your focus, because your attention is priceless.
      </p>
      <p className="text-base sm:text-sm p-2 sm:p-3 px-3 sm:px-4 rounded-2xl border w-full sm:w-fit max-w-full">
        Start building your reading list today.
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
