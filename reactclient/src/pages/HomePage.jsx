// src/pages/HomePage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Card, Row, Col } from 'react-bootstrap';
import './HomePage.css'; // Styling for the page

const HomePage = () => {
    return (
        <div className="home-container">
            <Container className="text-center text-white">
                <div className="home-jumbotron"> {/* Jumbotron has been replaced by a div */}
                    <h1 className="display-4 fw-bold">Financial Management System</h1>
                    <p className="lead">
                        A powerful platform to make your financial management easy and effective.
                    </p>
                    <hr className="my-4" />
                    <p>
                        This application helps you to easily manage your clients, projects, invoices and accounts.
                    </p>
                    <Link to="/dashboard">
                        <Button variant="primary" size="lg" className="mt-3 dashboard-btn">
                            Go to Dashboard
                        </Button>
                    </Link>
                </div>

                <div className="mt-5">
                    <h2 className="text-white fw-bold">Technologies and Features Used</h2>
                    <Row className="mt-4 justify-content-center">
                        <Col md={4} className="mb-4">
                            <Card className="tech-card bg-dark text-white">
                                <Card.Body>
                                    <h4 className="card-title">Frontend</h4>
                                    <p className="card-text">React.js, React-Bootstrap, React Router</p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4} className="mb-4">
                            <Card className="tech-card bg-dark text-white">
                                <Card.Body>
                                    <h4 className="card-title">Backend</h4>
                                    <p className="card-text">ASP.NET Core Web API, Entity Framework</p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4} className="mb-4">
                            <Card className="tech-card bg-dark text-white">
                                <Card.Body>
                                    <h4 className="card-title">Database</h4>
                                    <p className="card-text">SQL Server</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    );
};

export default HomePage;
