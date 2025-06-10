import { useEffect, useState } from 'react';
import './DecisionSessions.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loading from '../../../../Components/Loading/Loading';
import HeroSection2 from '../../../../Components/Hero Section 2/HeroSection2';
import FilterBar from '../../../../Components/Search/FilterBar/FilterBar';
import DecisionCard from './../../../../Components/Cards/Session-cards/Decision-card/DecisionCard';
import GoBackBtn from '../../../../Components/Go Back btn/GoBackBtn';

function DecisionSessions() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filters, setFilters] = useState({
        status: 'active'
    });
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchPositions = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/election-decisions");
                setData(response.data);
                setFilteredData(response.data);
            } catch (error) {
                console.error('Error fetching decision:', error);
                toast.error('Failed to load position sessions');
            } finally {
                setIsLoading(false);
            }
        };

        fetchPositions();
    }, []);

    console.log(data);

    useEffect(() => {
        const filtered = data.filter(item => {
            const matchesStatus = !filters.status ||
                item.election?.status.toLowerCase() === filters.status.toLowerCase();
            const matchesSearch = !searchQuery ||
                item.description.toLowerCase().includes(searchQuery.toLowerCase());

            return matchesStatus && matchesSearch;
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

    return (
        <div className="sessions">
            <GoBackBtn to={'/Voting-Preference'} />
            <HeroSection2
                title={"Decision Sessions"}
                text={"Vote on important company decisions"}
            />

            <FilterBar
                onFilterChange={handleFilterChange}
                onSearchChange={handleSearch}
                page={"decision"}
                className="sessions__filter"
            />

            <div className="sessions__container">
                <div className="sessions__grid">
                    {filteredData.map((item, index) => (
                        <div className="sessions__item" key={index}>
                            <DecisionCard
                                id={item.election_id}
                                position={item.position}
                                desc={item.description}
                                duration={item.duration}
                                status={item.election.status}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default DecisionSessions;