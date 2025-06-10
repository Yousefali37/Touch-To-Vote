import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../../Components/Loading/Loading";
import { useParams, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

function EditUser() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/users/${id}`)
            .then((res) => {
                setUserData(res.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching user:', error.response?.data || error.message);
                toast.error(error.response?.data?.message || 'Failed to fetch user data.');
                setLoading(false);
            });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // نبعت الداتا المعدّلة للـ API
            await axios.put(`http://127.0.0.1:8000/api/users/${id}`, {
                name: userData.name,
                role: userData.role,
                login_id: userData.login_id
            });
            toast.success('User updated successfully!');
            navigate('/manage-users/view-users');
        } catch (error) {
            console.error('Error updating user:', error.response?.data || error.message);
            toast.error(error.response?.data?.message || 'Failed to update user.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <h2 className="form-title mb-1 text-center">Update User</h2>
            <hr />
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter User name"
                    value={userData.name || ''}
                    onChange={(e) => {
                        setUserData({ ...userData, name: e.target.value });
                    }}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="role">Role</label>
                <select
                    name="role"
                    id="role"
                    value={userData.role || ''}
                    onChange={(e) => {
                        setUserData({ ...userData, role: e.target.value });
                    }}
                >
                    <option value="manager">Manager</option>
                    <option value="voter">Voter</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="login_id">Login ID</label>
                <input
                    type="text"
                    id="login_id"
                    name="login_id"
                    placeholder="Enter Login ID"
                    value={userData.login_id || ''}
                    onChange={(e) => {
                        setUserData({ ...userData, login_id: e.target.value });
                    }}
                    required
                />
                <p className="form-text text-muted">
                    This will be used as the login ID for the user. It should be unique and not contain any special characters.
                </p>
            </div>

            <button type="submit" className="form-submit-btn" disabled={loading}>
                {loading ? 'Updating...' : 'Update User'}
            </button>
        </form>
    );
}

export default EditUser;