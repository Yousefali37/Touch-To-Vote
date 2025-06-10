import HeroSection2 from './../../Components/Hero Section 2/HeroSection2';
import Tabs from './../../Components/Tabs/Tabs';

function ManageCandidates() {

    return (
        <>
            <HeroSection2
                title="Manage Candidates"
                text="Add and manage Candidates"
            />
            <hr />

            <Tabs page={"candidate"} />
        </>
    );
}

export default ManageCandidates;