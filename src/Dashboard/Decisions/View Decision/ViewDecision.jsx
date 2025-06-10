import TableComponent from './../../../Components/Table/TableComponent';

function ViewDecision() {
    return (
        <div className="table-container">
            <TableComponent
                endpoint={"http://127.0.0.1:8000/api/election-decisions"}
                headers={["election_decision_id", "election_id", "title", "description", "category", "duration"]}
                dataFields={["election_decision_id", "election_id", "title", "description", "category", "duration"]}
                searchField={"title"}
                title={"decision"}
            />
        </div>
    )
}

export default ViewDecision;