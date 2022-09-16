import { ReactNode } from "react";
import SideBar from "../sideBar/SideBar";

interface Props {
  children: ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return (
    <div className="flex">
      <SideBar />
      <main className="md:pl-56 lg:pl-60 xl:pl-72 w-full">{children}</main>
    </div>
  );
};

export default MainLayout;
