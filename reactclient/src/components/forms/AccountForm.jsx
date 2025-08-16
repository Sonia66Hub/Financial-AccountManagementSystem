// src/components/forms/AccountForm.jsx

import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import api from '../../services/api';

const AccountForm = ({ accountData, onSave, onCancel }) => {
    const [account, setAccount] = useState({
        accountName: '',
        balance: 0,
        clientId: ''
    });
    const [clients, setClients] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const isEditMode = !!accountData;

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await api.get('/Clients');
                setClients(response.data);
            } catch (err) {
                console.error('Failed to fetch clients:', err);
                setError('Failed to load clients. Please try again.');
            }
        };

        fetchClients();

        if (isEditMode) {
            setAccount({
                ...accountData,
                // Ensure clientId is a string for the select input
                clientId: accountData.clientId ? accountData.clientId.toString() : ''
            });
        }
    }, [accountData, isEditMode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAccount(prevAccount => ({
            ...prevAccount,
            [name]: name === 'balance' ? parseFloat(value) : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            // Ensure clientId is an integer for the API call
            const accountToSubmit = {
                ...account,
                clientId: parseInt(account.clientId)
            };

            if (isEditMode) {
                await api.put(`/Accounts/${account.id}`, accountToSubmit);
                setSuccess('Account updated successfully!');
            } else {
                await api.post('/Accounts', accountToSubmit);
                setSuccess('Account created successfully!');
            }
            onSave();
        } catch (err) {
            // Handle validation errors from the backend more effectively
            if (err.response?.data?.errors) {
                const validationErrors = err.response.data.errors;
                const errorMessages = Object.values(validationErrors).flat();
                setError(
                    <div>
                        <p>One or more validation errors occurred:</p>
                        <ul>
                            {errorMessages.map((msg, index) => (
                                <li key={index}>{msg}</li>
                            ))}
                        </ul>
                    </div>
                );
            } else {
                setError(err.response?.data?.title || 'An error occurred.');
            }
            console.error('Form submission error:', err);
        }
    };

    return (
        <div>
            <h2>{isEditMode ? 'Edit Account' : 'Create Account'}</h2>
            {success && <Alert variant="success">{success}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Account Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="accountName"
                        value={account.accountName}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Balance</Form.Label>
                    <Form.Control
                        type="number"
                        name="balance"
                        value={account.balance}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Client</Form.Label>
                    <Form.Select
                        name="clientId"
                        value={account.clientId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a Client</option>
                        {clients.map(client => (
                            <option key={client.id} value={client.id}>
                                {client.name}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
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

export default AccountForm;
