import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import ReportData from './ReportData';
import HeroSection2 from './../../Components/Hero Section 2/HeroSection2';
import './SessionReport.css';
import GoBackBtn from './../../Components/Go Back btn/GoBackBtn';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const SessionReport = () => {

    const { id } = useParams();

    const filterData = ReportData.filter((e) => {
        const filterID = id ? e.Election_id == id : true;
        return filterID;
    })

    const navigate = useNavigate();
    const labels = filterData.map(item => item.sessionTitle);
    const [user, setUser] = useState([]);

    useEffect(() => {
        setUser(localStorage.getItem("user_id"));
    }, []);


    const barData = {
        labels,
        datasets: [
            {
                label: 'Yes Votes',
                data: filterData.map(item => item.yes),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
            {
                label: 'No Votes',
                data: filterData.map(item => item.no),
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
            }
        ]
    };


    const pieData = {
        labels: ['Yes', 'No'],
        datasets: filterData.map(item => ({
            label: item.sessionTitle,
            data: [item.yes, item.no],
            backgroundColor: [
                'rgba(75, 192, 192, 0.6)',
                'rgba(255, 99, 132, 0.6)',
            ],
            borderWidth: 1
        }))
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: 'Voting Results per Session'
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    const pieOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: 'Total Votes Distribution (Pie Chart)'
            }
        }
    };

    const renderReportText = () => {
        return filterData.map((item, index) => {
            const yesPercentage = ((item.yes / item.votersNo) * 100).toFixed(1);
            const noPercentage = ((item.no / item.votersNo) * 100).toFixed(1);

            return (
                <div key={item.id} className="session-report__report-item">
                    <h3 className="session-report__report-title">{index + 1}. {item.sessionTitle}</h3>
                    <p className="session-report__report-description">{item.desc}</p>
                    <ul className="session-report__report-list">
                        <li className="session-report__report-list-item">
                            <strong>Total Voters:</strong> {item.votersNo}
                        </li>
                        <li className="session-report__report-list-item">
                            <strong>Yes Votes:</strong> {item.yes} ({yesPercentage}%)
                        </li>
                        <li className="session-report__report-list-item">
                            <strong>No Votes:</strong> {item.no} ({noPercentage}%)
                        </li>
                        <li className="session-report__report-list-item">
                            <strong>Result:</strong>{" "}
                            {item.votingStyle === "all"
                                ? item.yes === item.votersNo
                                    ? "Approved ✅"
                                    : "Rejected ❌"
                                : item.votingStyle === "majority"
                                    ? item.yes > item.votersNo / 2
                                        ? "Approved ✅"
                                        : "Rejected ❌"
                                    : "Unknown voting style"}
                        </li>
                    </ul>
                </div>
            );
        });
    };

    return (
        <div className="session-report">
            <div className='button-group'>
                <button className='button-group__button button-group__button--pdf' onClick={() => {
                    navigate('/Print')
                }}>Preview As PDF</button>
                <button className='button-group__button button-group__button--print'>Print</button>
            </div>
            <GoBackBtn to={-1} />
            <HeroSection2 title={`${labels.join(', ')} Session Report`} />
            <hr className="session-report__divider" />
            <div className="session-report__charts">
                <div className="session-report__chart">
                    <Bar data={barData} options={options} height={300} />
                </div>
                <div className="session-report__chart">
                    <Pie data={pieData} options={pieOptions} height={300} />
                </div>
            </div>
            <hr className="session-report__divider" />
            <div className="session-report__written">
                <h2 className="session-report__written-title">Written Report</h2>
                {renderReportText()}
            </div>
            <div>
                {
                    user === "1" && (
                        <>
                            <div className="session-report__written text-center">
                                <h2 className="title">
                                    <span className="title-highlight">Voted Yes</span>
                                </h2>
                                <ul className="session-report__report-list">
                                    {filterData.map((item) => (
                                        <li key={item.id} className="session-report__report-list-item">
                                            {item.yespepole && item.yespepole.length > 0 ? (
                                                item.yespepole.map((person, index) => (
                                                    <span key={index} className="session-report__voter">
                                                        {typeof person === 'string' ? person : person.name}
                                                        {index < item.yespepole.length - 1 ? ', ' : ''}
                                                    </span>
                                                ))
                                            ) : (
                                                <span className="session-report__voter--empty">No voters</span>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <br />
                            <div className="session-report__written text-center">
                                <h2 className="title">
                                    <span className="title-highlight">Voted No</span>
                                </h2>
                                <ul className="session-report__report-list">
                                    {filterData.map((item) => (
                                        <li key={item.id} className="session-report__report-list-item">
                                            {item.nopepole && item.nopepole.length > 0 ? (
                                                item.nopepole.map((person, index) => (
                                                    <span key={index} className="session-report__voter">
                                                        {typeof person === 'string' ? person

                                                            : person.name}
                                                        {index < item.nopepole.length - 1 ? ', ' : ''}
                                                    </span>
                                                ))
                                            ) : (
                                                <span className="session-report__voter--empty">No voters</span>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    );
};

export default SessionReport;