import { useState } from 'react';
import './FAQ.css';
import data from '../../../Mockup Data/FAQ.json';
import GoBackBtn from '../../Go Back btn/GoBackBtn';

function FAQ({ from }) {
    const [active, setActive] = useState('general');
    const [opened, setOpened] = useState({});

    const dataFilter = data.filter((e) => e.type === active);

    const toggleQuestion = (id) => {
        setOpened((prev) => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    return (
        <>
            <GoBackBtn to={'/Voting-Preference'} />
            <div className="faq" style={{
                minHeight: from && "100vh"
            }}>
                <h2 className="title">
                    <span className="title-highlight">Help</span>
                </h2>
                <p className="subtitle">
                    Got questions? We’ve got answers! Browse below for more help.
                </p>
                <div className="faq__filter">
                    <button
                        className={`faq__filter-button ${active === 'general' ? 'faq__filter-button--active' : ''}`}
                        onClick={() => setActive('general')}
                        aria-current={active === 'general'}
                    >
                        General
                    </button>
                    <button
                        className={`faq__filter-button ${active === 'technical' ? 'faq__filter-button--active' : ''}`}
                        onClick={() => setActive('technical')}
                        aria-current={active === 'technical'}
                    >
                        Technical
                    </button>
                </div>
                <div className="faq__list">
                    {dataFilter.map((e) => (
                        <div key={e.id} className="faq__item">
                            <button
                                className={`faq__question ${opened[e.id] ? 'faq__question--expanded' : ''}`}
                                onClick={() => toggleQuestion(e.id)}
                                aria-expanded={opened[e.id] || false}
                                aria-controls={`answer-${e.id}`}
                            >
                                {e.ques}
                            </button>
                            {opened[e.id] && (
                                <p id={`answer-${e.id}`} className="faq__answer">
                                    {e.ans}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default FAQ;