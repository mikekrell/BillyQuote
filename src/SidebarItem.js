function SidebarItem (props) {
    return (
        <li>
            <a href="index.html" className="side-menu side-menu">
                <div className="side-menu__title">
                    {props.children}
                </div>
            </a>
        </li>
    )
}

export default SidebarItem

