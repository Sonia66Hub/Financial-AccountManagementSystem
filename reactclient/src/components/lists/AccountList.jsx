// src/components/lists/AccountList.jsx

import React, { useState, useEffect } from 'react';
import { Button, Table, Spinner, Alert, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const AccountList = ({ handleEditAccount }) => {
    const [accounts, setAccounts] = useState([]);
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [accountsResponse, clientsResponse] = await Promise.all([
                api.get('/Accounts'),
                api.get('/Clients')
            ]);
            setAccounts(accountsResponse.data);
            setClients(clientsResponse.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch data.');
            setLoading(false);
            console.error('Error fetching data:', err);
        }
    };

    const handleDelete = async (id) => {
        // window.confirm() Canvas-e kaj kore na, tai e-ta remove kora hoyeche.
        // Er poriborte ekta custom modal UI use kora uchit.
        console.log(`Attempting to delete account with ID: ${id}`);
        try {
            await api.delete(`/Accounts/${id}`);
            fetchData(); // Refresh the list after deletion
        } catch (err) {
            setError('Failed to delete account.');
            console.error('Error deleting account:', err);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const getClientName = (clientId) => {
        const client = clients.find(c => c.id === clientId);
        return client ? client.name : 'N/A';
    };

    const filteredAccounts = accounts.filter(account => {
        const clientName = getClientName(account.clientId);
        return (
            (account.accountName && account.accountName.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (clientName && clientName.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    });

    if (loading) return <Spinner animation="border" />;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <div>
            <h2>Accounts</h2>
            <div className="d-flex justify-content-between mb-3">
                <Button onClick={() => navigate('/accounts/create')} variant="primary">Add Account</Button>
                <Form.Control
                    type="text"
                    placeholder="Search by account name or client"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    style={{ width: '200px' }}
                />
            </div>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Account Name</th>
                        <th>Balance</th>
                        <th>Client</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAccounts.map(account => (
                        <tr key={account.id}>
                            <td>{account.id}</td>
                            <td>{account.accountName}</td>
                            <td>${account.balance.toFixed(2)}</td>
                            <td>{getClientName(account.clientId)}</td>
                            <td>
                                <Button variant="info" size="sm" onClick={() => navigate(`/accounts/details/${account.id}`)} className="me-2">Details</Button>
                                <Button variant="warning" size="sm" onClick={() => handleEditAccount(account)}>Edit</Button>
                                <Button variant="danger" size="sm" onClick={() => handleDelete(account.id)} className="ms-2">Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default AccountList;
