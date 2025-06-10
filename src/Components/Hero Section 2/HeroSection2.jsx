import styles from './HeroSection2.module.css';
import PropTypes from 'prop-types';

function HeroSection2({ title, text }) {
    return (
        <div className={`${styles.hero} ${styles['hero--fade-in']}`}>
            <div className={styles.hero__content}>
                <h1 className={`${styles.hero__title}`}><span className='title-highlight'>{title}</span></h1>
                <p className={`${styles.hero__text} subtitle`}>{text}</p>
            </div>
        </div>
    );
}

HeroSection2.propTypes = {
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
};

export default HeroSection2;