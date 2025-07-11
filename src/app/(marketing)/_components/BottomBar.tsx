import Link from "next/link";

const BottomBar = () => {
  return (
    <div className="border-t sticky bottom-0 z-50 w-full bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-7xl mx-auto gap-3 sm:gap-2 md:gap-0 px-4 sm:px-6 md:px-8 py-3 sm:py-4">
        <div className="flex items-center gap-x-2 justify-center sm:justify-start w-full sm:w-auto">
          <span className="text-xs sm:text-sm text-muted-foreground">
            Made with ❤️
          </span>
        </div>

        <div className="flex items-center gap-x-2 justify-center sm:justify-end w-full sm:w-auto">
          <Link
            href="https://tally.so/r/w505Ob"
            target="_blank"
            className="cursor-pointer text-xs sm:text-sm px-3 sm:px-4 py-2 text-muted-foreground"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BottomBar;
