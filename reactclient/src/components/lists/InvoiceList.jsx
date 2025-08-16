// src/components/lists/InvoiceList.jsx

import React, { useState, useEffect } from 'react';
import { Button, Table, Spinner, Alert, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const InvoiceList = ({ handleEditInvoice }) => {
    const [invoices, setInvoices] = useState([]);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [invoicesResponse, projectsResponse] = await Promise.all([
                api.get('/Invoices'),
                api.get('/Projects')
            ]);
            setInvoices(invoicesResponse.data);
            setProjects(projectsResponse.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch data.');
            setLoading(false);
            console.error('Error fetching data:', err);
        }
    };

    const handleDelete = async (id) => {
        // window.confirm() Canvas-এ কাজ করে না, তাই এটিকে সরিয়ে দেওয়া হয়েছে।
        // এর পরিবর্তে একটি কাস্টম Modal UI ব্যবহার করা উচিত।
        console.log(`Attempting to delete invoice with ID: ${id}`);
        try {
            await api.delete(`/Invoices/${id}`);
            fetchData();
        } catch (err) {
            setError('Failed to delete invoice.');
            console.error('Error deleting invoice:', err);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const getProjectName = (projectId) => {
        const project = projects.find(p => p.id === projectId);
        return project ? project.name : 'N/A';
    };

    const filteredInvoices = invoices.filter(invoice => {
        const projectName = getProjectName(invoice.projectId);
        const searchableString = `${(invoice.invoiceFile || '')} ${projectName} ${(invoice.status || '')}`.toLowerCase();

        // searchTerm-কে শব্দে ভাগ করে প্রতিটি শব্দের জন্য খোঁজ করা হচ্ছে
        const searchWords = searchTerm.toLowerCase().split(' ').filter(Boolean);

        return searchWords.every(word => searchableString.includes(word));
    });

    if (loading) return <Spinner animation="border" />;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <div>
            <h2>Invoices</h2>
            <div className="d-flex justify-content-between mb-3">
                <Button onClick={() => navigate('/invoices/create')} variant="primary">Add Invoice</Button>
                <Form.Control
                    type="text"
                    placeholder="Search by invoice file, project, or status"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    style={{ width: '200px' }}
                />
            </div>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Project</th>
                        <th>Invoice File</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Issue Date</th>
                        <th>Due Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredInvoices.map(invoice => (
                        <tr key={invoice.id}>
                            <td>{invoice.id}</td>
                            <td>{getProjectName(invoice.projectId)}</td>
                            <td>
                                {invoice.invoiceFile ? (
                                    <a href={invoice.invoiceFile} target="_blank" rel="noopener noreferrer">
                                        <img src={invoice.invoiceFile} alt="Invoice" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                                    </a>
                                ) : (
                                    'N/A'
                                )}
                            </td>
                            <td>${invoice.amount ? invoice.amount.toFixed(2) : '0.00'}</td>
                            <td>{invoice.status || 'N/A'}</td>
                            <td>{invoice.issueDate ? new Date(invoice.issueDate).toLocaleDateString() : 'N/A'}</td>
                            <td>{invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : 'N/A'}</td>
                            <td>
                                <Button variant="info" size="sm" onClick={() => navigate(`/invoices/details/${invoice.id}`)} className="me-2">Details</Button>
                                <Button variant="warning" size="sm" onClick={() => handleEditInvoice(invoice)}>Edit</Button>
                                <Button variant="danger" size="sm" onClick={() => handleDelete(invoice.id)} className="ms-2">Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default InvoiceList;
