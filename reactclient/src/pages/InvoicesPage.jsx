// src/pages/InvoicesPage.jsx

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import InvoiceList from '../components/lists/InvoiceList';
import InvoiceForm from '../components/forms/InvoiceForm';
import api from '../services/api';

const InvoicesPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    const [editingInvoice, setEditingInvoice] = useState(null);

    useEffect(() => {
        const fetchInvoice = async (invoiceId) => {
            try {
                const response = await api.get(`/Invoices/${invoiceId}`);
                setEditingInvoice(response.data);
            } catch (error) {
                console.error("ইনভয়েস আনতে ব্যর্থ হয়েছে:", error);
                navigate('/invoices');
            }
        };

        if (location.pathname.includes('/invoices/edit/') && id) {
            fetchInvoice(id);
        } else {
            setEditingInvoice(null);
        }
    }, [id, navigate, location.pathname]);

    const handleEditInvoice = (invoice) => {
        setEditingInvoice(invoice);
        navigate(`/invoices/edit/${invoice.id}`);
    };

    const handleSaveOrCancel = () => {
        setEditingInvoice(null);
        navigate('/invoices');
    };

    const isCreateOrEdit = location.pathname.includes('/invoices/create') || location.pathname.includes('/invoices/edit');

    return (
        <div>
            <h1>Invoice Management</h1>
            {isCreateOrEdit ? (
                <InvoiceForm
                    invoiceData={editingInvoice}
                    onSave={handleSaveOrCancel}
                    onCancel={handleSaveOrCancel}
                />
            ) : (
                <InvoiceList handleEditInvoice={handleEditInvoice} />
            )}
        </div>
    );
};

export default InvoicesPage;