// src/pages/ClientsPage.jsx

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ClientList from '../components/lists/ClientList';
import ClientForm from '../components/forms/ClientForm';

const ClientsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [editingClient, setEditingClient] = useState(null);
    const [validationErrors, setValidationErrors] = useState({}); // ভ্যালিডেশন error সংরক্ষণের জন্য নতুন state

    const handleEditClient = (client) => {
        setEditingClient(client);
        setValidationErrors({}); // এডিট করার সময় error পরিষ্কার করা
        navigate(`/clients/edit/${client.clientId}`); // রাউটে clientId ব্যবহার করা
    };

    const handleSaveOrCancel = () => {
        setEditingClient(null);
        setValidationErrors({}); // সেভ বা বাতিল করার সময় error পরিষ্কার করা
        navigate('/clients');
    };

    const isCreateOrEdit = location.pathname.includes('/clients/create') || location.pathname.includes('/clients/edit');

    return (
        <div>
            <h1>Client Management</h1>
            {isCreateOrEdit ? (
                <ClientForm
                    clientData={editingClient}
                    onSave={handleSaveOrCancel}
                    onCancel={handleSaveOrCancel}
                    setValidationErrors={setValidationErrors}
                    validationErrors={validationErrors}
                />
            ) : (
                <ClientList handleEditClient={handleEditClient} />
            )}
        </div>
    );
};

export default ClientsPage;
