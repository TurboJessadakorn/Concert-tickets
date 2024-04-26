import React, { useRef } from 'react';
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';


function Sidebar() {
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); //Control sidebar for small scrren
    const sidebarRef = useRef<HTMLElement>(null);

    const handleSidebarToggle = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // hide side bar when click outside
    const handleClickOutside = (event: any) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
            setIsSidebarOpen(false);
        }
    };

    useEffect(() => {
        if (isSidebarOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSidebarOpen]);
    
    return (
        <>
            {/* button when side screen is smaller than sm */}
            <button onClick={handleSidebarToggle} data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            {/* side bar (hide when screen smaller than sm) */}
            <aside ref={sidebarRef} id="default-sidebar" className={`fixed top-0 left-0 z-40 w-52 h-screen transition-transform -translate-x-full sm:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`} aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-white border-r">
                    <div className="px-2 py-6">
                        <h1 className="text-3xl font-semibold">Admin</h1>
                    </div>
                    <ul className="space-y-2 font-medium text-lg">
                        <li>
                            <a href="/" className={`flex items-center px-2 py-3 text-gray-900 rounded-lg group ${router.pathname === "/" ? "bg-gray-200" : "hover:bg-gray-200"} `}>
                                <svg className="w-5 h-5 transition duration-75 group-hover:text-gray-900" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" >
                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                                <span className="ms-3">Home</span>
                            </a>
                        </li>
                        <li>
                            <a href="/history" className={`flex items-center px-2 py-3 text-gray-900 rounded-lg group ${router.pathname === "/history" ? "bg-gray-200" : "hover:bg-gray-200"} `}>
                                <svg className="w-5 h-5 transition duration-75 group-hover:text-gray-900" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.51653902,11 L10,11 L10,13 L14,13 L14,11 L19.4839973,11 L17.1106841,5.45729333 C16.9986635,5.23944262 16.8952849,5.08654336 16.8117527,4.99992782 L7.17592076,4.99623293 C7.09869779,5.07946042 7.00332603,5.2252937 6.91914503,5.3939193 L4.51653902,11 Z M20,13 L16,13 C16,14.1045695 15.1045695,15 14,15 L10,15 C8.8954305,15 8,14.1045695 8,13 L4,13 L4,19 L20,19 L20,13 Z M22,19 C22,20.1045695 21.1045695,21 20,21 L4,21 C2.8954305,21 2,20.1045695 2,19 L2,11.7947423 L2.08085497,11.6060807 L5.10236458,4.55926124 C5.55302653,3.64141565 6.12143587,3.07300632 7,3 L17,3 L17.1308208,3.00859397 C17.8836715,3.10793627 18.4350886,3.65935343 18.919145,4.6060807 L22,11.7947423 L22,19 Z" fill-rule="evenodd" />
                                </svg>
                                <span className="ms-3">History</span>
                            </a>
                        </li>
                        <li>
                            <a href="/" className="flex items-center px-2 py-3 text-gray-900 rounded-lg hover:bg-gray-200 group">
                                <svg className="w-5 h-5 transition duration-75 group-hover:text-gray-900" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><polyline points="17 1 21 5 17 9" />
                                    <path d="M3 11V9a4 4 0 0 1 4-4h14" /><polyline points="7 23 3 19 7 15" />
                                    <path d="M21 13v2a4 4 0 0 1-4 4H3" /></svg>
                                <span className="ms-3">'Switch to User</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;