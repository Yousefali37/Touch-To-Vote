import './Tabs.css';
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function Tabs({ page }) {

    const navigate = useNavigate();
    const [select, setSelect] = useState(1);

    useEffect(() => {
        if (location.pathname.includes(`edit-${page}`)) return;

        if (select === 1) {
            navigate(`view-${page}s`, { replace: true });
        } else if (select === 2) {
            navigate(`add-${page}`, { replace: true });
        }
    }, [select, navigate, page]);

    return (
        <div className="management-container d-flex flex-column justify-content-center align-items-center gap-4 p-4">
            <div className="product-tabs container">
                <div className="tab-buttons">
                    <button
                        className={`tab-button ${select === 1 ? 'active-tab' : ''}`}
                        onClick={() => setSelect(1)}
                    >
                        View all {page[0].toUpperCase() + page.slice(1)}s
                    </button>
                    <button
                        className={`tab-button ${select === 2 ? 'active-tab' : ''}`}
                        onClick={() => setSelect(2)}
                    >
                        Add new {page[0].toUpperCase() + page.slice(1)}
                    </button>
                </div>
            </div>
            <Outlet />
        </div>
    )
}

Tabs.propTypes = {
    page: PropTypes.string.isRequired,
};

export default Tabs;