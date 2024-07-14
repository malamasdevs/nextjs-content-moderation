import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {};

const Header = (props: Props) => {
  return (
    <div className="h-20 w-full flex items-center px-5 justify-between">
      <div className="flex gap-5 items-center">
        <div className="uppercase text-xl italic">ImageModerator</div>
        <button className="uppercase hover:">New Project</button>
      </div>
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span>PAUL</span>
        </div>
       
      </div>
    </div>
  );
};

export default Header;
