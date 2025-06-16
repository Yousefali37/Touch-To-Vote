import './PositionSessions.css';
import PositionCard from './../../../../Components/Cards/Session-cards/Position-Card/PositionCard';
import { useEffect, useState } from 'react';
import FilterBar from './../../../../Components/Search/FilterBar/FilterBar';
import HeroSection2 from '../../../../Components/Hero Section 2/HeroSection2';
import toast from 'react-hot-toast';
import axios from 'axios';
import Loading from './../../../../Components/Loading/Loading';
import GoBackBtn from '../../../../Components/Go Back btn/GoBackBtn';

function PositionSessions() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filters, setFilters] = useState({
        position: '',
        status: 'active'
    });
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchPositions = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/election-positions");
                setData(response.data);
                setFilteredData(response.data);
            } catch (error) {
                console.error('Error fetching positions:', error);
                toast.error('Failed to load position sessions');
            } finally {
                setIsLoading(false);
            }
        };

        fetchPositions();
    }, []);

    useEffect(() => {
        const filtered = data.filter(item => {
            const matchesPosition = !filters.position ||
                item.position.toLowerCase().includes(filters.position.toLowerCase());
            const matchesStatus = !filters.status ||
                item.election?.status.toLowerCase() === filters.status.toLowerCase();
            const matchesSearch = !searchQuery ||
                item.election.election_id === Number(searchQuery);

            return matchesPosition && matchesStatus && matchesSearch;
        });
        setFilteredData(filtered);
    }, [data, filters, searchQuery]);

    const handleFilterChange = (type, value) => {
        setFilters(prev => ({
            ...prev,
            [type]: value
        }));
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    if (isLoading) {
        return <Loading />;
    }

    console.log(filteredData)

    return (
        <div className="position-sessions">
            <GoBackBtn to={'/Voting-Preference'} />
            <HeroSection2
                title={"Position Sessions"} 
                text={"Vote On the Position You Want"} 
                page={'position'} 
            />
            
            <FilterBar
                onFilterChange={handleFilterChange}
                onSearchChange={handleSearch}
                page={"position"} 
            />
            
            <div className="position-sessions__container">
                <div className="position-sessions__grid">
                    {filteredData.map((data, index) => (
                        <div className="position-sessions__grid-item" key={index}>
                            <PositionCard
                                id={data.election_id}
                                position={data.position}
                                desc={data.description}
                                status={data.election.status}
                                startDate={data.election.start_date}
                                endDate={data.election.end_date}
                                />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PositionSessions;