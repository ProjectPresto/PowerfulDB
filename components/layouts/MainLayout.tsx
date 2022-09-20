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
      <section className="md:pl-56 lg:pl-60 xl:pl-72 space-y-12 w-full">
        <main className="w-full">{children}</main>
        <FooterContainer />
      </section>
    </div>
  );
};

export default MainLayout;
