import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AddUser() {
    return (
        <form className="form-container">

            <h2 className="form-title mb-1 text-center">Add New User</h2>
            <hr />

            <div className="form-group">
                <label htmlFor="fname">Full Name</label>
                <input
                    type="text"
                    id="fname"
                    placeholder="Enter full name"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="id">User ID</label>
                <input
                    type="text"
                    id="id"
                    placeholder="Enter user ID"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="role">User Role</label>
                <select
                    name="role"
                    id="role"
                >
                    <option value="" disabled selected>Select role</option>
                    <option value="voter">Voter</option>
                    <option value="admin">Admin</option>
                </select>
            </div>

            <button type="submit" className="form-submit-btn mt-3">
                <FontAwesomeIcon icon={faPlus} /> Add User
            </button>
        </form>
    )
}

export default AddUser;