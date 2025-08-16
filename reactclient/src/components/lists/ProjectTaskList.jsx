// src/components/lists/ProjectTaskList.jsx

import React from 'react';
import { Table, Button, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const ProjectTaskList = ({ tasks, setTasks, isAdmin }) => {
    const navigate = useNavigate();

    const handleDelete = async (taskId) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await api.delete(`/ProjectTasks/${taskId}`);
                setTasks(tasks.filter(task => task.id !== taskId));
            } catch (err) {
                console.error('Failed to delete task:', err);
            }
        }
    };

    const getStatusVariant = (status) => {
        switch (status) {
            case 0: // TaskStatus.Pending
                return 'secondary';
            case 1: // TaskStatus.InProgress
                return 'primary';
            case 2: // TaskStatus.Completed
                return 'success';
            default:
                return 'light';
        }
    };

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

    if (tasks.length === 0) {
        return <p>No tasks found for this project.</p>;
    }

    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Due Date</th>
                    {isAdmin && <th>Actions</th>}
                </tr>
            </thead>
            <tbody>
                {tasks.map(task => (
                    <tr key={task.id}>
                        <td>{task.id}</td>
                        <td>{task.title}</td>
                        <td>
                            <Badge bg={getStatusVariant(task.status)}>
                                {getStatusText(task.status)}
                            </Badge>
                        </td>
                        <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                        {isAdmin && (
                            <td>
                                <Button
                                    variant="info"
                                    size="sm"
                                    className="me-2"
                                    onClick={() => navigate(`/projects/${task.projectId}/tasks/edit/${task.id}`)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleDelete(task.id)}
                                >
                                    Delete
                                </Button>
                            </td>
                        )}
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default ProjectTaskList;
