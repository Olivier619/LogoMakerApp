import React, { useContext } from "react";
import { Button } from "../ui/button";
import { Download } from "lucide-react";
import { UserContext } from "@/context/UserContext";
import SideNav from "./SideNav";

import { Separator } from "@/components/ui/separator"
import logo from "@/assets/logo1.png"

const Header = ({activeIndex,setActiveIndex}) => {
  const { downloadLogoPng } = useContext(UserContext);
  return (
    <>
    <div className="px-10 py-2 gap-3 flex justify-between  items-center bg-[#23a2d4] overflow-x-hidden ">
      <div className="flex gap-2 items-center"><img src={logo} width={60} alt="logoExpress" />
      <span className=" md:text-3xl text-white font-thin">LogoExpress</span>
      </div>
      <div className="hidden md:block">
      <SideNav activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
      </div>
      {/* <div> */}
      <Button className="flex gap-2 items-center bg-[#0853b3] hover:scale-110 hover:bg-[#0853b3] transition-all duration-300 " onClick={downloadLogoPng}>
        <Download /> Download
      </Button>
      {/* </div> */}
    </div>
    <div className="md:hidden bg-[#23a2d4] py-2">
      <Separator/>

      <SideNav activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
    </div>
    </>
  );
};

export default Header;
