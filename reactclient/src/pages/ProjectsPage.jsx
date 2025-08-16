// src/pages/ProjectsPage.jsx

import React, { useState, useEffect } from 'react';
import { Container, Button, Alert, Table, Spinner } from 'react-bootstrap';
import ProjectForm from '../components/forms/ProjectForm';
import ProjectList from '../components/lists/ProjectList'; // Import the ProjectList component
import api from '../services/api';

const ProjectsPage = () => {
    const [projects, setProjects] = useState([]);
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [statusMap, setStatusMap] = useState({});

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const projectsResponse = await api.get('/Projects');
            const clientsResponse = await api.get('/Clients');

            // C# enum value to string mapping
            const projectStatusMap = {
                0: 'Not Started',
                1: 'In Progress',
                2: 'Completed',
                3: 'Cancelled'
            };
            setStatusMap(projectStatusMap);

            setProjects(projectsResponse.data);
            setClients(clientsResponse.data);
        } catch (err) {
            setError('Failed to fetch data: ' + err.message);
            console.error('Failed to fetch data:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateClick = () => {
        setSelectedProject(null);
        setShowForm(true);
    };

    const handleEditClick = (project) => {
        // Adjust the project data to match form's expected format
        const projectWithAdjustedStatus = {
            ...project,
            status: statusMap[project.status] || project.status
        };
        setSelectedProject(projectWithAdjustedStatus);
        setShowForm(true);
    };

    const handleDeleteClick = async (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await api.delete(`/Projects/${id}`);
                fetchData();
            } catch (err) {
                setError('Failed to delete project: ' + err.message);
                console.error('Failed to delete project:', err);
            }
        }
    };

    const handleSave = () => {
        setShowForm(false);
        fetchData();
    };

    const handleCancel = () => {
        setShowForm(false);
        setSelectedProject(null);
    };

    if (loading) {
        return <Spinner animation="border" className="m-3" />;
    }

    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    return (
        <Container>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Project Management</h2>
                <Button onClick={handleCreateClick}>Create New Project</Button>
            </div>

            {/* Conditional Rendering: Show either the form or the list */}
            {showForm ? (
                <ProjectForm
                    projectData={selectedProject}
                    onSave={handleSave}
                    onCancel={handleCancel}
                />
            ) : (
                <ProjectList
                    projects={projects}
                    clients={clients}
                    statusMap={statusMap}
                    handleEditProject={handleEditClick}
                    handleDeleteProject={handleDeleteClick}
                />
            )}
        </Container>
    );
};

export default ProjectsPage;