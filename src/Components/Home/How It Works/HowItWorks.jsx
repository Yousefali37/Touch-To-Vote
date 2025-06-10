import { Col, Row } from 'react-bootstrap';
import './HowItWorks.css';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import HowToVoteOutlinedIcon from '@mui/icons-material/HowToVoteOutlined';
import FingerprintOutlinedIcon from '@mui/icons-material/FingerprintOutlined';

const steps = [
    {
        id: 1,
        icon: <FingerprintOutlinedIcon fontSize="large" />,
        title: "Login",
        desc: "Register with your fingerprint and ID for secure identification"
    },
    {
        id: 2,
        icon: <HowToVoteOutlinedIcon fontSize="large" />,
        title: "Cast Your Vote",
        desc: "Cast your vote securely through our intuitive digital interface"
    },
    {
        id: 3,
        icon: <HowToRegOutlinedIcon fontSize="large" />,
        title: "Verify Identity",
        desc: "Verify your identity at the voting station using biometric scanning"
    },
    {
        id: 4,
        icon: <TaskAltOutlinedIcon fontSize="large" />,
        title: "Get Confirmation",
        desc: "Receive instant confirmation that your vote has been recorded successfully"
    },
];

function HowItWorks() {
    return (
        <section className="how-it-works" id="howitworks">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">
                        <span className="title-highlight">How It Works</span>
                    </h2>
                    <p className="section-subtitle">
                        Simple, secure, and straightforward. Follow these easy steps to participate in the democratic process.
                    </p>
                </div>

                <Row className="steps-container g-4">
                    {steps.map((step) => (
                        <Col key={step.id} xs={12} md={6} lg={3} className="step-col">
                            <div className="step-card">
                                <div className="step-number">
                                    <span>{step.id}</span>
                                </div>
                                <div className="step-icon">
                                    {step.icon}
                                </div>
                                <h3 className="step-title">{step.title}</h3>
                                <p className="step-desc">{step.desc}</p>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>
        </section>
    )
}

export default HowItWorks;