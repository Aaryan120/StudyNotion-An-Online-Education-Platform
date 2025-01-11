import react from "react";
import * as Icons from "react-icons/vsc";
import { matchPath, NavLink, useLocation } from "react-router-dom";

const SidebarLink = ({element,iconName}) =>{
    const location = useLocation()

    const matchRoute = (route) =>{
        return matchPath({path:route},location.pathname);
    }
    const Icon = Icons[iconName];
    return (
        <NavLink
        to={element.path}
        className={`relative py-2 px-4 md:px-8 md:py-2 text-sm font-medium transition-all duration-300 ${matchRoute(element.path) ? ("bg-yellow-800") : ("bg-opacity-0")}`}>

            <span className={`absolute bottom-0 left-0 md:top-0 md:h-full h-[0.2rem] w-full bg-yellow-50 md:w-[0.2rem] ${matchRoute(element.path) ? "opacity-100" : "opacity-0"}`}>
            </span>

            <div className={`${matchRoute(element.path) ? "text-yellow-50" : "text-richblack-300"} flex items-center gap-2`}>

                <Icon className="size-6 md:size-[16px]"/>

                <p className="hidden md:block">{element.name}</p>
            </div>
        </NavLink>
    )
}


export default SidebarLink;