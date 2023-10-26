import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";

const NavBar = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

    const navLinkClass = 'text-black hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'
    return (
        <>
            <nav className="bg-slate-200">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    <NavLink to=""
                                             className={({isActive}) => isActive ? `${navLinkClass} underline` : navLinkClass}>
                                        Home
                                    </NavLink>
                                    {
                                        !isAuthenticated &&
                                        <NavLink to="/login"
                                                 className={({isActive}) => isActive ? `${navLinkClass} underline` : navLinkClass}>
                                            Login
                                        </NavLink>
                                    }

                                    {
                                        isAuthenticated && <>
                                            <NavLink to="logout"
                                                     className={({isActive}) => isActive ? `${navLinkClass} underline` : navLinkClass}>
                                                Log out
                                            </NavLink>

                                            <NavLink to="profile"
                                                     className={({isActive}) => isActive ? `${navLinkClass} underline` : navLinkClass}>
                                                Profile
                                            </NavLink>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </nav>

        </>
    )

}

export default NavBar
