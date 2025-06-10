import TableComponent from "../../../Components/Table/TableComponent";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function ViewUser() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/users");
                const data = Array.isArray(response.data) ? response.data : [];
                const formattedData = data.map(user => ({
                    ...user,
                    fingerprint: user.fingerprint ? "Yes" : "No"
                }));
                setUsers(formattedData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching users:', error.response?.data || error.message);
                toast.error(error.response?.data?.message || 'Failed to fetch users.');
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (users.length === 0) {
        return <div>No users found.</div>;
    }

    return (
        <div className="table-container">
            <TableComponent
                data={users}
                headers={["user_id", "name", "role", "login_id", "fingerprint"]}
                dataFields={["user_id", "name", "role", "login_id", "fingerprint"]}
                searchField={"name"}
                title={"user"}
            />
        </div>
    );
}

export default ViewUser;