import { ReactNode } from "react";
import SideBar from "./SideBar";

interface Props {
  children: ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return (
    <div className="flex">
      <SideBar />
      <main className="md:ml-56 lg:ml-60 xl:ml-72 w-full">{children}</main>
    </div>
  );
};

export default MainLayout;
