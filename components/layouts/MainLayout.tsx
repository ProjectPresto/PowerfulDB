import { ReactNode } from "react";
import SideBar from "../sideBar/SideBar";
import FooterContainer from "./FooterContainer";

interface Props {
  children: ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return (
    <div className="flex">
      <SideBar />
      <main className="md:pl-56 lg:pl-60 xl:pl-72 w-full space-y-16">
        {children}
        <FooterContainer />
      </main>
    </div>
  );
};

export default MainLayout;
