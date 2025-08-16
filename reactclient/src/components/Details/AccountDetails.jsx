// src/components/Details/AccountDetails.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Spinner, Alert, Button, ListGroup } from 'react-bootstrap';
import api from '../../services/api';

const AccountDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [account, setAccount] = useState(null);
    const [clientName, setClientName] = useState('Loading...');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAccountDetails = async () => {
            try {
                const accountRes = await api.get(`/Accounts/${id}`);
                setAccount(accountRes.data);

                if (accountRes.data.clientId) {
                    const clientRes = await api.get(`/Clients/${accountRes.data.clientId}`);
                    setClientName(clientRes.data.name);
                } else {
                    setClientName('N/A');
                }

            } catch (err) {
                console.error('Failed to fetch account details:', err);
                setError('Failed to load account details. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchAccountDetails();
        }
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this account?')) {
            try {
                await api.delete(`/Accounts/${id}`);
                navigate('/accounts');
            } catch (err) {
                console.error('Failed to delete account:', err);
                setError('Failed to delete account. Please try again.');
            }
        }
    };

    if (loading) {
        return <Spinner animation="border" variant="primary" className="d-block mx-auto mt-5" />;
    }

    if (error) {
        return <Alert variant="danger" className="mt-3 text-center">{error}</Alert>;
    }

    if (!account) {
        return <Alert variant="warning" className="mt-3 text-center">Account not found.</Alert>;
    }

    return (
        <div className="d-flex justify-content-center">
            <Card className="shadow-lg p-3" style={{
                width: '30rem',
                borderRadius: '20px',
                border: '3px solid #17a2b8',
                background: 'linear-gradient(145deg, #e3f2fd, #ffffff)'
            }}>
                <Card.Header as="h5" className="text-center text-white" style={{
                    backgroundColor: '#17a2b8',
                    borderRadius: '15px 15px 0 0',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}>
                    Account Details
                </Card.Header>

                <Card.Body style={{ padding: '20px' }}>
                    <Card.Title className="text-dark fw-bold pb-2 mb-2">Account ID: {account.id}</Card.Title>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <strong style={{ color: '#007bff' }}>Account Name:</strong> <span style={{ color: '#28a745' }}>{account.accountName}</span>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong style={{ color: '#007bff' }}>Balance:</strong> <span style={{ color: '#d63384' }}>${account.balance ? account.balance.toFixed(2) : '0.00'}</span>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong style={{ color: '#007bff' }}>Client:</strong> <span style={{ color: '#28a745' }}>{clientName}</span>
                        </ListGroup.Item>
                    </ListGroup>

                    <div className="text-center mt-4 d-flex justify-content-center gap-2">
                        
                        <Button
                            variant="danger"
                            onClick={handleDelete}
                            style={{ minWidth: '120px' }}
                        >
                            Delete
                        </Button>
                        <Button
                            variant="primary"
                            onClick={() => navigate('/accounts')}
                            style={{ minWidth: '120px' }}
                        >
                            Back to Accounts
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default AccountDetails;