import {Link, Outlet} from "react-router-dom";

function SideBar() {
    return (
        <>

            <div className="flex h-screen bg-gray-100">

                <div className="hidden md:flex flex-col w-64 bg-gray-800">
                    <div className="flex items-center justify-center h-16 bg-gray-900">
                        <span className="text-white font-bold uppercase">Admin Panel</span>
                    </div>
                    <div className="flex flex-col flex-1 overflow-y-auto">
                        <nav className="flex-1 px-2 py-4 bg-gray-800">
                            <Link to='genres'
                                  className="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 mr-2">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"/>
                                </svg>
                                Genres
                            </Link>
                        </nav>
                    </div>
                </div>

                <div className="flex flex-col flex-1 overflow-y-auto">
                    <div className="p-4">
                        <main>
                            <Outlet/>
                        </main>
                    </div>
                </div>

            </div>
        </>
    )
}

export default SideBar
