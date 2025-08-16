import React, { useState, useEffect } from 'react';
import { Button, Table, Spinner, Alert, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const ClientList = ({ handleEditClient }) => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('jwtToken') || localStorage.getItem('token');
        if (token) {
            fetchClients();
        } else {
            setLoading(false);
            setError('Authentication token not found. Please log in.');
        }
    }, []);

    const fetchClients = async () => {
        try {
            const response = await api.get('/Clients');
            setClients(response.data);
            setLoading(false);
        } catch (err) {
            if (err.response && err.response.status === 401) {
                setError('Session expired. Please log in again.');
                localStorage.removeItem('jwtToken');
                localStorage.removeItem('token');
            } else {
                setError('Failed to fetch clients.');
            }
            setLoading(false);
            console.error('Error fetching clients:', err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this client?')) {
            try {
                await api.delete(`/Clients/${id}`);
                fetchClients();
            } catch (err) {
                if (err.response && err.response.status === 401) {
                    setError('Session expired. Please log in again.');
                    localStorage.removeItem('jwtToken');
                    localStorage.removeItem('token');
                } else {
                    setError('Failed to delete client.');
                }
                console.error('Error deleting client:', err);
            }
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredClients = clients.filter(client =>
        (client.name ?? '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <Spinner animation="border" />;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <div>
            <h2>Clients</h2>
            <div className="d-flex justify-content-between mb-3">
                <Button onClick={() => navigate('/clients/create')} variant="primary">Add Client</Button>
                <Form.Control
                    type="text"
                    placeholder="Search clients by name"
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
                        <th>Email</th>
                        <th>Company</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredClients.map(client => (
                        <tr key={client.id}>
                            <td>{client.id}</td>
                            <td>{client.name}</td>
                            <td>{client.email}</td>
                            <td>{client.company}</td>
                            <td>{client.phone}</td>
                            <td>
                                {/* ✅ Navigate to correct details route */}
                                <Button
                                    variant="info"
                                    size="sm"
                                    onClick={() => navigate(`/clients/details/${client.id}`)}
                                    className="me-2"
                                >
                                    Details
                                </Button>
                                <Button
                                    variant="warning"
                                    size="sm"
                                    onClick={() => handleEditClient(client)}
                                    className="me-2"
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleDelete(client.id)}
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

export default ClientList;
