// src/components/forms/ProjectTaskForm.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import api from '../../services/api';

const ProjectTaskForm = () => {
    const { projectId, taskId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        projectId: parseInt(projectId),
        title: '',
        status: 0, // Assuming 0 for Pending
        dueDate: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        if (taskId) {
            setIsEditMode(true);
            const fetchTask = async () => {
                try {
                    const response = await api.get(`/ProjectTasks/${taskId}`);
                    const task = response.data;
                    setFormData({
                        projectId: task.projectId,
                        title: task.title,
                        status: task.status,
                        dueDate: task.dueDate.split('T')[0] // Format date for input
                    });
                } catch (err) {
                    setError('Failed to load task for editing.');
                    console.error(err);
                }
            };
            fetchTask();
        }
    }, [taskId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'status' ? parseInt(value) : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (isEditMode) {
                // For Update
                await api.put(`/ProjectTasks/${taskId}`, { ...formData, id: parseInt(taskId) });
            } else {
                // For Create
                await api.post('/ProjectTasks', formData);
            }
            navigate(`/projects/${projectId}/tasks`);
        } catch (err) {
            setError(`Failed to ${isEditMode ? 'update' : 'create'} task.`);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="mt-4">
            <h2 className="mb-4">{isEditMode ? 'Edit Task' : 'Create New Task'}</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Status</Form.Label>
                    <Form.Select name="status" value={formData.status} onChange={handleChange} required>
                        <option value={0}>Pending</option>
                        <option value={1}>In Progress</option>
                        <option value={2}>Completed</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Due Date</Form.Label>
                    <Form.Control
                        type="date"
                        name="dueDate"
                        value={formData.dueDate}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? 'Submitting...' : isEditMode ? 'Update Task' : 'Create Task'}
                </Button>
            </Form>
        </Container>
    );
};

export default ProjectTaskForm;
