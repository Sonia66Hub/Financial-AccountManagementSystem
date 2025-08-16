// src/components/forms/ClientForm.jsx

import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import api from '../../services/api';

const ClientForm = ({ clientData, onSave, onCancel }) => {
    const [client, setClient] = useState({
        name: '',
        email: '',
        company: '',
        phone: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const isEditMode = !!clientData;

    useEffect(() => {
        if (isEditMode) {
            setClient(clientData);
        }
    }, [clientData, isEditMode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setClient(prevClient => ({
            ...prevClient,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            if (isEditMode) {
                // For editing, we don't need to send the password back to the server in most cases
                const updatedClient = { ...client };
                delete updatedClient.password;
                await api.put(`/Clients/${client.id}`, updatedClient);
                setSuccess('Client updated successfully!');
            } else {
                await api.post('/Clients', client);
                setSuccess('Client created successfully!');
            }
            onSave(); // Call the parent function to refresh the list
        } catch (err) {
            setError(err.response?.data?.title || 'An error occurred.');
            console.error('Form submission error:', err);
        }
    };

    return (
        <div>
            <h2>{isEditMode ? 'Edit Client' : 'Create Client'}</h2>
            {success && <Alert variant="success">{success}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={client.name}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={client.email}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Company</Form.Label>
                    <Form.Control
                        type="text"
                        name="company"
                        value={client.company}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                        type="text"
                        name="phone"
                        value={client.phone}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                {!isEditMode && (
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={client.password}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                )}
                <Button variant="primary" type="submit">
                    {isEditMode ? 'Update' : 'Create'}
                </Button>
                <Button variant="secondary" onClick={onCancel} className="ms-2">
                    Cancel
                </Button>
            </Form>
        </div>
    );
};

export default ClientForm;