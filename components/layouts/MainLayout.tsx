import { ReactNode } from "react";
import SideBar from "@components/sideBar/SideBar";
import FooterContainer from "./FooterContainer";

interface Props {
  children: ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return (
    <div className="flex">
      <SideBar />
      <section
        className="md:pl-56 lg:pl-60 xl:pl-72 w-full
                  min-h-screen flex flex-col justify-between"
      >
        <main className="w-full">{children}</main>
        <FooterContainer />
      </section>
    </div>
  );
};

export default MainLayout;
