import './TableComponent.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {
    ModeEdit as EditIcon,
    Delete as DeleteIcon,
    Search as SearchIcon
} from '@mui/icons-material';
import Loading from '../Loading/Loading';
import { useNavigate } from 'react-router-dom';

function TableComponent({ endpoint, title, headers, dataFields, searchField, data: propData }) {
    const navigate = useNavigate();
    const [data, setData] = useState(propData || []);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (!propData) {
            setLoading(true);
            axios.get(endpoint)
                .then((res) => {
                    setData(Array.isArray(res.data) ? res.data : []);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                    setLoading(false);
                });
        } else {
            setData(propData);
            setLoading(false);
        }
    }, [endpoint, propData]);

    const getIdField = () => {
        switch (title) {
            case 'candidate':
                return 'candidate_id';
            case 'session':
                return 'session_id';
            case 'user':
                return 'user_id';
            case 'decision':
                return 'election_decision_id';
            default:
                return 'id';
        }
    };

    const getNestedFieldValue = (obj, fieldPath) => {
        const fields = fieldPath.split('.');
        let value = obj;
        for (const field of fields) {
            value = value ? value[field] : null;
            if (!value) break;
        }
        return value || 'N/A';
    };

    const filteredData = Array.isArray(data) ? data.filter(item => {
        const searchValue = searchField ? getNestedFieldValue(item, searchField) : (item.name || item.election_Name || item.description || '');
        const idValue = item[getIdField()];
        return (
            (searchValue && searchValue.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
            (idValue && idValue.toString().includes(searchTerm))
        );
    }) : [];

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${endpoint}/${id}`);
            setData(data.filter(item => item[getIdField()] !== id));
        } catch (error) {
            console.error(`Error deleting ${title}:`, error);
            alert(`Failed to delete ${title}.`);
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="table-card">
            <div className="table-header">
                <h2>{title[0].toUpperCase() + title.slice(1)} Management</h2>
                <div className="search-container">
                    <SearchIcon className="search-icon" />
                    <input
                        type="text"
                        placeholder={`Search ${title}...`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="table-responsive">
                <table className="modern-table">
                    <thead>
                        <tr>
                            {headers.map((header, index) => (
                                <th key={index}>
                                    {header}
                                </th>
                            ))}
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.length > 0 ? (
                            filteredData.map((item, index) => (
                                <tr key={index}>
                                    {dataFields.map((field, index) => (
                                        <td key={index}>
                                            <p
                                                className={`status-badge ${getNestedFieldValue(item, field) === "active" ? "active" : ""} ${getNestedFieldValue(item, field) === "completed" ? "completed" : ""} ${getNestedFieldValue(item, field) === "upcoming" ? "upcoming" : ""}`}
                                            >
                                                {getNestedFieldValue(item, field)}
                                            </p>
                                        </td>
                                    ))}
                                    <td>
                                        <div className="action-buttons">
                                            <button
                                                className="edit-btn"
                                                title="Edit"
                                                onClick={() => navigate(`/Dashboard/manage-${title}s/edit-${title}/${item[getIdField()]}`)}
                                            >
                                                <EditIcon />
                                            </button>
                                            <button
                                                className="delete-btn"
                                                title="Delete"
                                                onClick={() => handleDelete(item[getIdField()])}
                                            >
                                                <DeleteIcon />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr className="no-results">
                                <td colSpan={headers.length + 1}>No {title}s found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

TableComponent.propTypes = {
    endpoint: PropTypes.string,
    title: PropTypes.string.isRequired,
    headers: PropTypes.arrayOf(PropTypes.string).isRequired,
    dataFields: PropTypes.arrayOf(PropTypes.string).isRequired,
    searchField: PropTypes.string,
    data: PropTypes.array
};

TableComponent.defaultProps = {
    endpoint: '',
    searchField: '',
    data: []
};

export default TableComponent;