
import SidebarItem from './SidebarItem';

function Sidebar() {
    const navItems = [
        {title: "Dashboard", id: 1},
        {title: "Quotes", id: 2 },
        {title: "Machines", id: 3 }

    ]
    return (
        <nav className="side-nav">
            <a href="" className="intro-x flex items-center pl-5 pt-4">
                <span className="hidden xl:block text-white text-lg ml-3"> Billy<span className="font-medium">Quotes 🐐</span> </span>
            </a>
            <div className="side-nav__devider my-6"></div>
            <ul>
                {navItems.map((nav)=>(
                    <SidebarItem key={nav.id}>{nav.title}</SidebarItem>
                ))}
            </ul>
        </nav>
    )
}

export default Sidebar;
