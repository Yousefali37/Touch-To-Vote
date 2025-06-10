import HeroSection2 from '../../Components/Hero Section 2/HeroSection2';
import Tabs from '../../Components/Tabs/Tabs';

function ManageElection() {

    return (
        <>
            <HeroSection2
                title="Manage Elections"
                text="Add and manage Session to vote on"
            />
            <hr />

            <Tabs page={"election"} />
        </>
    );
}

export default ManageElection;