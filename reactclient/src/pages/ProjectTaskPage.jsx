// src/pages/ProjectTaskPage.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button, Alert } from 'react-bootstrap';
import ProjectTaskList from '../components/lists/ProjectTaskList';
import api from '../services/api';
import { useAuth } from '../hooks/useAuth';

const ProjectTasksPage = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();
    const isAdmin = user && user.role === 'Admin';

    useEffect(() => {
        const fetchProjectAndTasks = async () => {
            try {
                // Fetch the project details
                const projectResponse = await api.get(`/Projects/${projectId}`);
                setProject(projectResponse.data);

                // Fetch tasks for the specific project
                const tasksResponse = await api.get(`/ProjectTasks/byproject/${projectId}`);
                setTasks(tasksResponse.data);
            } catch (err) {
                setError('Failed to load project tasks.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (projectId) {
            fetchProjectAndTasks();
        }
    }, [projectId]);

    if (loading) return <Container className="mt-5 text-center">Loading...</Container>;
    if (error) return <Container className="mt-5"><Alert variant="danger">{error}</Alert></Container>;
    if (!project) return <Container className="mt-5"><Alert variant="info">Project not found.</Alert></Container>;

    return (
        <Container className="mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0">{project.name} Tasks</h2>
                {isAdmin && (
                    <Button variant="primary" onClick={() => navigate(`/projects/${projectId}/tasks/create`)}>
                        Create New Task
                    </Button>
                )}
            </div>
            <ProjectTaskList tasks={tasks} setTasks={setTasks} isAdmin={isAdmin} />
        </Container>
    );
};

export default ProjectTasksPage;
