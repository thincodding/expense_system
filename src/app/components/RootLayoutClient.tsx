'use client'; 

import { usePathname } from 'next/navigation'; 
import SideBar from './SideBar'; 

const RootLayoutClient = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname(); 
  return (
    <div className="flex">
      {pathname !== '/login' && <SideBar />}
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default RootLayoutClient;
