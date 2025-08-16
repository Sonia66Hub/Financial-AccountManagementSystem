// src/components/Details/ProjectDetails.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Spinner, Alert, Button, ListGroup, Badge } from 'react-bootstrap';
import api from '../../services/api';


const ProjectDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    // const { user } = useAuth(); // এই লাইনটি সরিয়ে দেওয়া হয়েছে

    const [project, setProject] = useState(null);
    const [clientName, setClientName] = useState('Loading...');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const statusMap = {
        0: 'Not Started',
        1: 'In Progress',
        2: 'Completed',
        3: 'Cancelled'
    };

    const statusColorMap = {
        0: 'secondary',
        1: 'warning',
        2: 'success',
        3: 'danger'
    };

    useEffect(() => {
        const fetchProjectDetails = async () => {
            try {
                const projectRes = await api.get(`/Projects/${id}`);
                setProject(projectRes.data);

                const clientRes = await api.get(`/Clients/${projectRes.data.clientId}`);
                setClientName(clientRes.data.name);

            } catch (err) {
                console.error('Failed to fetch project details:', err);
                setError('Failed to load project details. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProjectDetails();
        }
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await api.delete(`/Projects/${id}`);
                navigate('/projects');
            } catch (err) {
                console.error('Failed to delete project:', err);
                setError('Failed to delete project. Please try again.');
            }
        }
    };

    if (loading) {
        return <Spinner animation="border" variant="primary" className="d-block mx-auto mt-5" />;
    }

    if (error) {
        return <Alert variant="danger" className="mt-3 text-center">{error}</Alert>;
    }

    if (!project) {
        return <Alert variant="warning" className="mt-3 text-center">Project not found.</Alert>;
    }

    return (
        <div className="d-flex justify-content-center">
            <Card className="shadow-lg p-3" style={{
                width: '30rem',
                borderRadius: '20px',
                border: '3px solid #17a2b8',
                background: 'linear-gradient(145deg, #e3f2fd, #ffffff)'
            }}>
                <Card.Header as="h5" className="text-center text-white" style={{
                    backgroundColor: '#17a2b8',
                    borderRadius: '15px 15px 0 0',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}>
                    Project Details
                </Card.Header>

                <Card.Body style={{ padding: '20px' }}>
                    <Card.Title className="text-dark fw-bold pb-2 mb-2">{project.name}</Card.Title>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <strong style={{ color: '#007bff' }}>ID:</strong> <span style={{ color: '#0056b3' }}>{project.id}</span>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong style={{ color: '#007bff' }}>Client:</strong> <span style={{ color: '#28a745' }}>{clientName}</span>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong style={{ color: '#007bff' }}>Status:</strong>
                            <Badge bg={statusColorMap[project.status] || 'secondary'} className="fw-bold">
                                {statusMap[project.status] || 'N/A'}
                            </Badge>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong style={{ color: '#007bff' }}>Start Date:</strong> <span style={{ color: '#d63384' }}>{new Date(project.startDate).toLocaleDateString()}</span>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong style={{ color: '#007bff' }}>End Date:</strong> <span style={{ color: '#d63384' }}>{project.endDate ? new Date(project.endDate).toLocaleDateString() : 'N/A'}</span>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong style={{ color: '#007bff' }}>Assigned Team:</strong> <span style={{ color: '#6f42c1' }}>{project.assignedTeam || 'N/A'}</span>
                        </ListGroup.Item>
                    </ListGroup>

                    <div className="text-center mt-4 d-flex justify-content-center gap-2">
                        {/* The View Tasks button is now always visible */}
                        <Button
                            variant="info"
                            onClick={() => navigate(`/projects/${project.id}/tasks`)}
                            style={{ minWidth: '120px' }}
                        >
                            View Tasks
                        </Button>
                        <Button
                            variant="danger"
                            onClick={handleDelete}
                            style={{ minWidth: '120px' }}
                        >
                            Delete
                        </Button>
                        <Button
                            variant="primary"
                            onClick={() => navigate('/projects')}
                            style={{ minWidth: '120px' }}
                        >
                            Back to Projects
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default ProjectDetails;
