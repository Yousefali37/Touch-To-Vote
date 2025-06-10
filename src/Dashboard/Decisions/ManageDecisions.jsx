import Tabs from '../../Components/Tabs/Tabs';
import HeroSection2 from './../../Components/Hero Section 2/HeroSection2';


function ManageDecisions() {

    return (
        <>
            <HeroSection2
                title="Manage Decisions"
                text="Add and manage Decisions"
            />
            <hr />

            <Tabs page={"decision"} />
        </>
    );
}

export default ManageDecisions;