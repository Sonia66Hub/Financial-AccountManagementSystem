// src/pages/AccountsPage.jsx

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AccountList from '../components/lists/AccountList';
import AccountForm from '../components/forms/AccountForm';

const AccountsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [editingAccount, setEditingAccount] = useState(null);

    // অপ্রয়োজনীয় handleAddAccount ফাংশনটি সরিয়ে ফেলা হয়েছে

    const handleEditAccount = (account) => {
        setEditingAccount(account);
        navigate(`/accounts/edit/${account.id}`);
    };

    const handleSaveOrCancel = () => {
        setEditingAccount(null);
        navigate('/accounts');
    };

    const isCreateOrEdit = location.pathname.includes('/accounts/create') || location.pathname.includes('/accounts/edit');

    return (
        <div>
            <h1>Account Management</h1>
            {isCreateOrEdit ? (
                <AccountForm
                    accountData={editingAccount}
                    onSave={handleSaveOrCancel}
                    onCancel={handleSaveOrCancel}
                />
            ) : (
                <AccountList handleEditAccount={handleEditAccount} />
            )}
        </div>
    );
};

export default AccountsPage;