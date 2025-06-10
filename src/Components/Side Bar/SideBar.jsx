import { Link, useLocation } from 'react-router-dom';
import './SideBar.css';
import { Home } from '@mui/icons-material';
import { useEffect, useMemo, useState } from 'react';

// Material UI Icons
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import AssignmentAddIcon from '@mui/icons-material/AssignmentAdd';
import BadgeIcon from '@mui/icons-material/Badge';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AddchartIcon from '@mui/icons-material/Addchart';

function Sidebar() {
    const location = useLocation();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [active, setActive] = useState("Dashboard");

    const locations = useMemo(() => [
        "Manage-Decisions", "Manage-Candidates", "Manage-Elections", "Manage-Users", "Manage-Reports"
    ], []);

    useEffect(() => {
        const currentLocation = locations.find(loc => location.pathname.includes(loc));
        setActive(currentLocation || "Dashboard");
    }, [location.pathname, locations]);

    const iconMapping = {
        "Manage-Decisions": <CheckCircleOutlineIcon style={{ color: "rgb(139, 92, 246)" }} />,
        "Manage-Candidates": <BadgeIcon style={{ color: "rgb(59, 130, 246)" }} />,
        "Manage-Elections": <AssignmentAddIcon style={{ color: "rgb(245, 158, 11)" }} />,
        "Manage-Users" : <AddReactionIcon style={{ color: "rgb(246, 92, 92)" }} />,
        "Manage-Reports": <AddchartIcon style={{ color: ""}} />
    };

    return (
        <div  className={`sidebar ${isCollapsed ? 'collapsed' : ''}`} style={{
            minWidth: isCollapsed ? "70px" : "233px"
        }}>
            <button className='sidebar__button' onClick={() => {
                setIsCollapsed(!isCollapsed);
            }}>
                <CloseFullscreenIcon />
            </button>

            <p className="sidebar__title">
                {!isCollapsed && " TTV"}
            </p>

            <div className='sidebar__links'>
                <Link to={"/Dashboard"} className={`sidebar__link ${active === "Dashboard" && "sidebar__link-active"}`} onClick={() => {
                    setActive("Dashboard");
                }}>
                    <DashboardIcon className="sidebar__icon" />
                    <span className="sidebar__text">{!isCollapsed && "Dashboard"}</span>
                </Link>

                {
                    locations.map((e) => (
                        <Link key={e} to={`${e}`} className={`sidebar__link ${active === e && "sidebar__link-active"}`}>
                            {iconMapping[e]}
                            <span className="sidebar__text">{!isCollapsed && e.replace(/-/g, ' ')}</span>
                        </Link>
                    ))
                }
            </div>
        </div>
    );
}

export default Sidebar;