// src/App.jsx

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import AuthProvider from './hooks/AuthProvider';
import Navbar from './components/common/Navbar';
import HomePage from './pages/HomePage';

// Page Imports
import Dashboard from './pages/Dashboard';
import ClientsPage from './pages/ClientsPage';
import ProjectsPage from './pages/ProjectsPage';
import AccountsPage from './pages/AccountsPage';
import InvoicesPage from './pages/InvoicesPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Component Imports
import PrivateRoute from './components/common/PrivateRoute';
import ClientDetails from './components/Details/ClientDetails';
import ProjectDetails from './components/Details/ProjectDetails';
import InvoiceDetails from './components/Details/InvoiceDetails'; 
import AccountDetails from './components/Details/AccountDetails';

// New Project Task Imports
import ProjectTaskPage from './pages/ProjectTaskPage';
import ProjectTaskForm from './components/forms/ProjectTaskForm';
import ProjectTaskDetails from './components/Details/ProjectTaskDetails';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <div className="App">
                    <Navbar />
                    <Container className="mt-4">
                        <Routes>
                            {/* Public Routes */}
                            <Route path="/" element={<HomePage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<RegisterPage />} />
                            
                            {/* Protected Routes */}
                            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                            
                            {/* Client Routes */}
                            <Route path="/clients" element={<PrivateRoute><ClientsPage /></PrivateRoute>} />
                            <Route path="/clients/create" element={<PrivateRoute><ClientsPage /></PrivateRoute>} />
                            <Route path="/clients/edit/:id" element={<PrivateRoute><ClientsPage /></PrivateRoute>} />
                            <Route path="/clients/details/:id" element={<PrivateRoute><ClientDetails /></PrivateRoute>} />
                            
                            {/* Project Routes */}
                            <Route path="/projects" element={<PrivateRoute><ProjectsPage /></PrivateRoute>} />
                            <Route path="/projects/create" element={<PrivateRoute><ProjectsPage /></PrivateRoute>} />
                            <Route path="/projects/edit/:id" element={<PrivateRoute><ProjectsPage /></PrivateRoute>} />
                            <Route path="/projects/details/:id" element={<PrivateRoute><ProjectDetails /></PrivateRoute>} />
                            
                            {/* Project Task Routes */}
                            <Route path="/projects/:projectId/tasks" element={<PrivateRoute><ProjectTaskPage /></PrivateRoute>} />
                            <Route path="/projects/:projectId/tasks/create" element={<PrivateRoute><ProjectTaskForm /></PrivateRoute>} />
                            <Route path="/projects/:projectId/tasks/edit/:taskId" element={<PrivateRoute><ProjectTaskForm /></PrivateRoute>} />
                            <Route path="/projects/:projectId/tasks/details/:taskId" element={<PrivateRoute><ProjectTaskDetails /></PrivateRoute>} />

                            {/* Account Routes */}
                            <Route path="/accounts" element={<PrivateRoute><AccountsPage /></PrivateRoute>} />
                            <Route path="/accounts/create" element={<PrivateRoute><AccountsPage /></PrivateRoute>} />
                            <Route path="/accounts/edit/:id" element={<PrivateRoute><AccountsPage /></PrivateRoute>} />
                            <Route path="/accounts/details/:id" element={<PrivateRoute><AccountDetails /></PrivateRoute>} />
                            
                            {/* Invoice Routes (New) */}
                            <Route path="/invoices" element={<PrivateRoute><InvoicesPage /></PrivateRoute>} />
                            <Route path="/invoices/create" element={<PrivateRoute><InvoicesPage /></PrivateRoute>} />
                            <Route path="/invoices/edit/:id" element={<PrivateRoute><InvoicesPage /></PrivateRoute>} />
                            <Route path="/invoices/details/:id" element={<PrivateRoute><InvoiceDetails /></PrivateRoute>} /> 
                        </Routes>
                    </Container>
                </div>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
