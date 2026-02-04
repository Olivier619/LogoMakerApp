import React, { useContext, useState } from "react";
import Header from "./components/custom/Header";
import SideNav from "./components/custom/SideNav";
import ImageUploadController from "./components/custom/ImageUploadController";
import BackgroundController from "./components/custom/BackgroundController";
import LogoPreview from "./components/custom/LogoPreview";
import Footer from "./components/custom/Footer";
import { Separator } from "./components/ui/separator";

const App = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="w-[100vw] overflow-x-hidden">
      <Header activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
      <div className=" grid grid-cols-1 md:grid-cols-6 ">
        <div className="md:hidden h-[350px] w-screen overflow-scroll  p-5 ">
          <LogoPreview />
        </div>
        <div className="md:col-span-3 h-[330px] md:h-screen border  shadow-sm p-5 overflow-auto">
          <Separator className="md:hidden" />
          {activeIndex == 0 ? <ImageUploadController /> : <BackgroundController />}
        </div>
        <div className="hidden md:block md:col-span-3 ">
          <LogoPreview />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
