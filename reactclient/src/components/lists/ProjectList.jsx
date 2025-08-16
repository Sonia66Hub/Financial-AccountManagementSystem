// src/components/lists/ProjectList.jsx

import React, { useState } from 'react';
import { Button, Table, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Link import করা হয়েছে

const ProjectList = ({ projects, clients, statusMap, handleEditProject, handleDeleteProject }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const getClientName = (clientId) => {
        const client = clients.find(c => c.id === clientId);
        return client ? client.name : 'Unknown Client';
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredProjects = projects.filter(project =>
        (project.name ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (statusMap[project.status] ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (project.assignedTeam ?? '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="d-flex justify-content-end mb-3">
                <Form.Control
                    type="text"
                    placeholder="Search by name, status or team"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    style={{ width: '200px' }}
                />
            </div>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Client</th>
                        <th>Status</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Assigned Team</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProjects.map(project => (
                        <tr key={project.id}>
                            <td>{project.id}</td>
                            <td>{project.name}</td>
                            <td>{getClientName(project.clientId)}</td>
                            <td>{statusMap[project.status] || 'N/A'}</td>
                            <td>{new Date(project.startDate).toLocaleDateString()}</td>
                            <td>{project.endDate ? new Date(project.endDate).toLocaleDateString() : 'N/A'}</td>
                            <td>{project.assignedTeam || 'N/A'}</td>
                            <td>
                                {/* Details button যোগ করা হয়েছে */}
                                <Link to={`/projects/details/${project.id}`} className="btn btn-info btn-sm me-2">
                                    Details
                                </Link>
                                <Button
                                    variant="warning"
                                    size="sm"
                                    className="me-2"
                                    onClick={() => handleEditProject(project)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleDeleteProject(project.id)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default ProjectList;
