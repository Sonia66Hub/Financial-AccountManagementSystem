// src/components/forms/InvoiceForm.jsx

import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import api from '../../services/api';

const InvoiceForm = ({ invoiceData, onSave, onCancel }) => {
    const [invoice, setInvoice] = useState({
        projectId: '',
        amount: '',
        status: 'Unpaid',
        issueDate: '',
        dueDate: '',
        invoiceFile: null
    });
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});
    const [imagePreview, setImagePreview] = useState(null);
    const isEditMode = !!invoiceData;

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await api.get('/Projects');
                setProjects(res.data);
                setLoading(false);
            } catch (err) {
                console.error('Failed to fetch projects:', err);
                setError('Failed to fetch projects.');
                setLoading(false);
            }
        };

        fetchProjects();

        if (isEditMode && invoiceData) {
            setInvoice({
                ...invoiceData,
                issueDate: invoiceData.issueDate ? new Date(invoiceData.issueDate).toISOString().split('T')[0] : '',
                dueDate: invoiceData.dueDate ? new Date(invoiceData.dueDate).toISOString().split('T')[0] : '',
                invoiceFile: null
            });
            // Set image preview if a file URL exists from the backend
            if (invoiceData.invoiceFile) {
                setImagePreview(invoiceData.invoiceFile);
            } else {
                setImagePreview(null);
            }
        } else {
            setInvoice({
                projectId: '',
                amount: '',
                status: 'Unpaid',
                issueDate: new Date().toISOString().split('T')[0],
                dueDate: '',
                invoiceFile: null
            });
            setImagePreview(null);
        }
    }, [invoiceData, isEditMode]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'invoiceFile') {
            const file = files.length > 0 ? files[0] : null;
            setInvoice(prev => ({ ...prev, [name]: file }));

            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImagePreview(reader.result);
                };
                reader.readAsDataURL(file);
            } else {
                setImagePreview(null);
            }
        } else {
            setInvoice(prev => ({ ...prev, [name]: value }));
        }
        setValidationErrors({});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setValidationErrors({});

        try {
            const formData = new FormData();
            formData.append('ProjectId', invoice.projectId);
            formData.append('Amount', invoice.amount);
            formData.append('Status', invoice.status);
            formData.append('IssueDate', invoice.issueDate);
            formData.append('DueDate', invoice.dueDate);

            if (invoice.invoiceFile instanceof File) {
                formData.append('InvoiceFile', invoice.invoiceFile);
            }
            
            if (isEditMode) {
                await api.put(`/Invoices/${invoiceData.id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                await api.post('/Invoices', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }

            onSave();
        } catch (err) {
            if (err.response?.data?.errors) {
                setValidationErrors(err.response.data.errors);
            } else {
                setError(err.response?.data?.title || 'An error occurred.');
            }
            console.error('Form submission error:', err);
        }
    };

    if (loading) return <Spinner animation="border" />;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <div>
            <h2>{isEditMode ? 'Edit Invoice' : 'Create Invoice'}</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Project</Form.Label>
                    <Form.Select
                        name="projectId"
                        value={invoice.projectId}
                        onChange={handleChange}
                        isInvalid={!!validationErrors.projectId}
                        required
                    >
                        <option value="">Select a Project</option>
                        {projects.map(project => (
                            <option key={project.id} value={project.id}>
                                {project.name}
                            </option>
                        ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                        {validationErrors.projectId && validationErrors.projectId[0]}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control
                        type="number"
                        name="amount"
                        value={invoice.amount}
                        onChange={handleChange}
                        isInvalid={!!validationErrors.amount}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        {validationErrors.amount && validationErrors.amount[0]}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Status</Form.Label>
                    <Form.Select
                        name="status"
                        value={invoice.status}
                        onChange={handleChange}
                        isInvalid={!!validationErrors.status}
                        required
                    >
                        <option value="Unpaid">Unpaid</option>
                        <option value="Paid">Paid</option>
                        <option value="Partial">Partial</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                        {validationErrors.status && validationErrors.status[0]}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Issue Date</Form.Label>
                    <Form.Control
                        type="date"
                        name="issueDate"
                        value={invoice.issueDate}
                        onChange={handleChange}
                        isInvalid={!!validationErrors.issueDate}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        {validationErrors.issueDate && validationErrors.issueDate[0]}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Due Date</Form.Label>
                    <Form.Control
                        type="date"
                        name="dueDate"
                        value={invoice.dueDate}
                        onChange={handleChange}
                        isInvalid={!!validationErrors.dueDate}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        {validationErrors.dueDate && validationErrors.dueDate[0]}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Invoice File</Form.Label>
                    <Form.Control
                        type="file"
                        name="invoiceFile"
                        onChange={handleChange}
                        isInvalid={!!validationErrors.invoiceFile}
                    />
                    <Form.Control.Feedback type="invalid">
                        {validationErrors.invoiceFile && validationErrors.invoiceFile[0]}
                    </Form.Control.Feedback>
                    
                    {imagePreview && (
                        <div className="mt-2">
                            <p>Preview:</p>
                            <img src={imagePreview} alt="Invoice Preview" style={{ maxWidth: '200px', maxHeight: '200px', border: '1px solid #ccc' }} /> 
                        </div>
                    )}
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

export default InvoiceForm;