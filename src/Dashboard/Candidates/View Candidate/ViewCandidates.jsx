import TableComponent from "../../../Components/Table/TableComponent";

function ViewCandidates() {
    return (
        <div className="table-container">
            <TableComponent
                endpoint="http://127.0.0.1:8000/api/candidates"
                title="candidate"
                headers={["ID", "Election Id", "Name", "Bio"]}
                dataFields={["candidate_id", "election_id", "name", "bio"]}
                searchField="name"
            />
        </div>
    )
}

export default ViewCandidates;