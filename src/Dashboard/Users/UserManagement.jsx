import Tabs from '../../Components/Tabs/Tabs';
import HeroSection2 from '../../Components/Hero Section 2/HeroSection2';

function UserManagement() {




    return (
        <>
            <HeroSection2
                title="User Management"
                text="Add and manage users who can access the voting system"
            />

            <Tabs page={"user"} />
        </>
    );
}

export default UserManagement;