import { faFilter, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./FilterBar.module.css";
import PropTypes from "prop-types";

function FilterBar({ onFilterChange, onSearchChange, page }) {
    const handleFilterChange = (type, value) => {
        onFilterChange(type, value);
    };

    return (
        <div className="container-fluid my-3">
            <hr />
            <div className="row g-2 justify-content-around align-items-center">
                {/* Filters Section */}
                <div className="col-auto d-flex align-items-center gap-2">
                    <FontAwesomeIcon icon={faFilter} className={styles.filterIcon} />

                    {page === "position" && (
                        <select
                            name="position"
                            className="form-select form-select-sm"
                            onChange={(e) => handleFilterChange("position", e.target.value)}
                        >
                            <option value="">All Positions</option>
                            {[
                                "President",
                                "Vice President",
                                "Secretary",
                                "Treasurer",
                                "HR Manager",
                                "Operations Manager",
                                "Marketing Head",
                                "IT Manager",
                                "Public Relations Officer",
                            ].map((position) => (
                                <option key={position} value={position}>
                                    {position}
                                </option>
                            ))}
                        </select>
                    )}

                    <select
                        name="status"
                        className="form-select form-select-sm"
                        onChange={(e) => handleFilterChange("status", e.target.value)}
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>

                {/* Search Section */}
                <div className="col-auto">
                    <form className="input-group input-group-sm">
                        <span className="input-group-text">
                            <FontAwesomeIcon icon={faSearch} />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search..."
                            onChange={(e) => onSearchChange(e.target.value)}
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}

FilterBar.propTypes = {
    onFilterChange: PropTypes.func.isRequired,
    onSearchChange: PropTypes.func.isRequired,
    page: PropTypes.string.isRequired,
};

export default FilterBar;
