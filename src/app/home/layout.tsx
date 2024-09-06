import type { Metadata } from "next";
import SideBar from "~/components/side-bar";

export const metadata: Metadata = {
  title: "Home",
};

export default function HomeLayout({
  children, pathanme
}: Readonly<{
  children: React.ReactNode, pathanme: any
}>) {
  return (
    <div className="flex flex-col">
      <SideBar/>
      {children}
    </div>
  );
}
