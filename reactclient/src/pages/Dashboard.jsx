// src/pages/Dashboard.jsx

import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, ProgressBar, Nav } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../hooks/useAuth';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ clients: 0, projects: 0, invoices: 0, accounts: 0, revenue: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [clientsRes, projectsRes, invoicesRes, accountsRes] = await Promise.all([
          api.get('/Clients'),
          api.get('/Projects'),
          api.get('/Invoices'),
          api.get('/Accounts')
        ]);

        const revenue = invoicesRes.data.reduce((sum, inv) => sum + (inv.amount || 0), 0);

        setStats({
          clients: clientsRes.data.length,
          projects: projectsRes.data.length,
          invoices: invoicesRes.data.length,
          accounts: accountsRes.data.length,
          revenue
        });
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    { title: 'Clients', value: stats.clients, color: 'primary', route: '/clients' },
    { title: 'Projects', value: stats.projects, color: 'success', route: '/projects' },
    { title: 'Invoices', value: stats.invoices, color: 'warning', route: '/invoices' },
    { title: 'Accounts', value: stats.accounts, color: 'info', route: '/accounts' },
    { title: 'Revenue', value: `$${stats.revenue.toFixed(2)}`, color: 'danger', route: '/reports' }
  ];

  return (
    <Container className="mt-4">
      <h1 className="mb-4 text-center">Welcome, {user.email}!</h1>

      {/* ড্যাশবোর্ডে নতুন নেভিগেশন হাব */}
      <Nav className="justify-content-center mb-5 gap-3" variant="pills" defaultActiveKey="/clients">
        <Nav.Item>
          <Nav.Link as={Link} to="/clients">Clients</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/projects">Projects</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/accounts">Accounts</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/invoices">Invoices</Nav.Link>
        </Nav.Item>
      </Nav>

      <Row className="mb-5">
        {cards.map((card, idx) => (
          <Col md={6} lg={3} key={idx} className="mb-4">
            <Card
              className={`text-center h-100 border-${card.color} border-2 shadow-sm`}
              style={{ borderRadius: '15px', cursor: 'pointer' }}
              onClick={() => navigate(card.route)}
            >
              <Card.Body>
                <Card.Title className={`text-${card.color} fw-bold`}>{card.title}</Card.Title>
                <Card.Text className="fs-2 fw-bold">{card.value}</Card.Text>
                <ProgressBar now={Math.min(typeof card.value === 'number' ? card.value : 100, 100)} variant={card.color} />
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Card className="shadow-sm p-4" style={{ borderRadius: '15px', backgroundColor: '#f8f9fa' }}>
        <Card.Body>
          <h4>Overview & Quick Actions</h4>
          <p>
            This page provides a quick snapshot of your system. Click any card above to view details or manage records.
          </p>
          <div className="d-flex flex-wrap gap-2">
            <Button variant="primary" onClick={() => navigate('/clients')}>Manage Clients</Button>
            <Button variant="success" onClick={() => navigate('/projects')}>Manage Projects</Button>
            <Button variant="warning" onClick={() => navigate('/invoices')}>Manage Invoices</Button>
            <Button variant="info" onClick={() => navigate('/accounts')}>Manage Accounts</Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Dashboard;
