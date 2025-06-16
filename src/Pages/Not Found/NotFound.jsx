import './NotFound.css';
import GoBackBtn from './../../Components/Go Back btn/GoBackBtn';

function NotFound()
{
    return (
        <div className='NotFound'>
            <GoBackBtn to={-1} />
            <img src="/404-concept-illustration.png" className='img-fluid' width={800} alt="" loading='lazy' />
        </div>
    )
}

export default NotFound;