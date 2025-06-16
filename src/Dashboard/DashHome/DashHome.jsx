import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../../Components/Side Bar/SideBar";
import "./DashHome.css";
import { useEffect, useState } from "react";
import HeroSection2 from "../../Components/Hero Section 2/HeroSection2";

function DashHome() {
    const location = useLocation();
    const [active, setActive] = useState(false);

    useEffect(() => {
        setActive(location.pathname === "/Dashboard");
    }, [location.pathname]);

    return (
        <div className="dashHome">
            <Sidebar />
            <div className="dashHome__outlet">
                {active ? (
                    <div>
                        <HeroSection2 title={"Admin Control Panel"} text={"Manage your voting system's candidates, decisions, and sessions"} />
                        <hr />
                        <div className="dashHome__img-container">
                            <img src="/public/sentiment-analysis-concept-illustration.webp" loading="lazy" alt="" />
                        </div>
                    </div>
                ) : (
                    <Outlet />
                )
                }
            </div>
        </div>
    );
}

export default DashHome;