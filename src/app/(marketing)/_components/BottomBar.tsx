import { Button } from "@/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/_components/ui/dropdown-menu";

const BottomBar = () => {
  return (
    <div className="border-t mx-auto p-3 md:sticky md:bottom-0 z-50 w-full">
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl mx-auto gap-2 md:gap-0">
        <div className="flex items-center gap-x-2 justify-center md:justify-start w-full md:w-auto">
          <span className="text-sm text-muted-foreground">Made with ❤️</span>
        </div>

        <div className="flex items-center gap-x-2 justify-center md:justify-end w-full md:w-auto">
          <Button variant="ghost" className="cursor-pointer">
            Contact Us
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BottomBar;
