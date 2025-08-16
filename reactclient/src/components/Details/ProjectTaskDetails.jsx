// src/components/Details/ProjectTaskDetails.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Alert } from 'react-bootstrap';
import api from '../../services/api';

const ProjectTaskDetails = () => {
    const { taskId } = useParams();
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await api.get(`/ProjectTasks/${taskId}`);
                setTask(response.data);
            } catch (err) {
                setError('Failed to load task details.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (taskId) {
            fetchTask();
        }
    }, [taskId]);

    if (loading) return <Container className="mt-5 text-center">Loading...</Container>;
    if (error) return <Container className="mt-5"><Alert variant="danger">{error}</Alert></Container>;
    if (!task) return <Container className="mt-5"><Alert variant="info">Task not found.</Alert></Container>;

    const getStatusText = (status) => {
        switch (status) {
            case 0:
                return 'Pending';
            case 1:
                return 'In Progress';
            case 2:
                return 'Completed';
            default:
                return 'Unknown';
        }
    };

    return (
        <Container className="mt-4">
            <h2 className="mb-4">Task Details</h2>
            <Card>
                <Card.Body>
                    <Card.Title>{task.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">ID: {task.id}</Card.Subtitle>
                    <Card.Text>
                        <strong>Project ID:</strong> {task.projectId}<br />
                        <strong>Status:</strong> {getStatusText(task.status)}<br />
                        <strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}<br />
                        <strong>Created Date:</strong> {new Date(task.createdDate).toLocaleString()}<br />
                        {task.lastUpdatedDate && (
                            <span><strong>Last Updated:</strong> {new Date(task.lastUpdatedDate).toLocaleString()}</span>
                        )}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ProjectTaskDetails;
