import './VotePreference.css';
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { faUserGroup } from '@fortawesome/free-solid-svg-icons/faUserGroup';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';
import Header from "../../../Components/Header/Header";
import { useEffect, useState } from 'react';
import axios from 'axios';

function VotingPreference() {

    const id = localStorage.getItem("user_id");
    const [userName, setUserName] = useState();

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/users/${id}`)
        .then(res => setUserName(res.data.name))
        .catch(err => console.log(err));
    }, [id])


    return (
        <>
            <Header page={"after-login"} />
            <div className="vote-preference">
                <div className="vote-preference__header">
                    <h1 className='vote-preference__title title'><span className='title-highlight'>Welcome, {userName}</span></h1>
                    <p className='vote-preference__subtitle subtitle'>Please select your voting preference below</p>
                </div>
                <div className="vote-preference__options">
                    <Link to={'/Position-Sessions'} className="vote-preference__card vote-preference__card--candidates">
                        <div className='vote-preference__card-icon'>
                            <FontAwesomeIcon icon={faUserGroup} />
                        </div>
                        <h3 className='vote-preference__card-title'>Vote on Candidates</h3>
                        <p className='vote-preference__card-description'>Cast your vote for board positions and roles</p>
                    </Link>
                    <Link to={'/Decision-Sessions'} className="vote-preference__card vote-preference__card--decisions">
                        <div className='vote-preference__card-icon'>
                            <FontAwesomeIcon icon={faClipboardList} />
                        </div>
                        <h3 className='vote-preference__card-title'>Vote on Decisions</h3>
                        <p className='vote-preference__card-description'>Cast your vote on important company decisions</p>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default VotingPreference;