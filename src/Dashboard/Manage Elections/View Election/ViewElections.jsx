import TableComponent from "../../../Components/Table/TableComponent";

function ViewElections() {
    return (
        <div className="table-container">
            <TableComponent 
                endpoint={"http://127.0.0.1:8000/api/elections"} 
                title={"election"} 
                headers={["ID", "Name", "Type", "Start Date", "End Date", "Status", "Manager ID"]}
                dataFields={["election_id", "name", "type", "start_date", "end_date", "status", "manager_id"]}
                searchField={"name"}
            />
        </div>
    );
}

export default ViewElections;