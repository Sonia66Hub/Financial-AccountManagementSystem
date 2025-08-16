//  //src/components/Details/InvoiceDetails.jsx

// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Card, Spinner, Alert, Button, ListGroup, Badge } from 'react-bootstrap';
// // 'api' ফাইলটির সঠিক পাথ ব্যবহার করা হয়েছে
// import api from '../../services/api';

// const InvoiceDetails = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();

//     const [invoice, setInvoice] = useState(null);
//     const [projectName, setProjectName] = useState('Loading...');
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchInvoiceDetails = async () => {
//             try {
//                 const invoiceRes = await api.get(`/Invoices/${id}`);
//                 setInvoice(invoiceRes.data);

//                 if (invoiceRes.data.projectId) {
//                     const projectRes = await api.get(`/Projects/${invoiceRes.data.projectId}`);
//                     setProjectName(projectRes.data.name);
//                 } else {
//                     setProjectName('N/A');
//                 }

//             } catch (err) {
//                 console.error('Failed to fetch invoice details:', err);
//                 setError('Failed to load invoice details. Please try again.');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         if (id) {
//             fetchInvoiceDetails();
//         }
//     }, [id]);

//     if (loading) {
//         return <Spinner animation="border" variant="primary" className="d-block mx-auto mt-5" />;
//     }

//     if (error) {
//         return <Alert variant="danger" className="mt-3 text-center">{error}</Alert>;
//     }

//     if (!invoice) {
//         return <Alert variant="warning" className="mt-3 text-center">Invoice not found.</Alert>;
//     }

//     return (
//         <div className="d-flex justify-content-center">
//             <Card className="shadow-lg p-3" style={{
//                 width: '30rem',
//                 borderRadius: '20px',
//                 border: '3px solid #17a2b8',
//                 background: 'linear-gradient(145deg, #e3f2fd, #ffffff)'
//             }}>
//                 <Card.Header as="h5" className="text-center text-white" style={{
//                     backgroundColor: '#17a2b8',
//                     borderRadius: '15px 15px 0 0',
//                     boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
//                 }}>
//                     Invoice Details
//                 </Card.Header>

//                 <Card.Body style={{ padding: '20px' }}>
//                     <Card.Title className="text-dark fw-bold pb-2 mb-2">Invoice ID: {invoice.id}</Card.Title>
//                     <ListGroup variant="flush">
//                         <ListGroup.Item>
//                             <strong style={{ color: '#007bff' }}>Project:</strong> <span style={{ color: '#28a745' }}>{projectName}</span>
//                         </ListGroup.Item>
//                         <ListGroup.Item>
//                             <strong style={{ color: '#007bff' }}>Amount:</strong> <span style={{ color: '#d63384' }}>${invoice.amount ? invoice.amount.toFixed(2) : '0.00'}</span>
//                         </ListGroup.Item>
//                         <ListGroup.Item>
//                             <strong style={{ color: '#007bff' }}>Status:</strong>
//                             <Badge bg="info" className="fw-bold">
//                                 {invoice.status || 'N/A'}
//                             </Badge>
//                         </ListGroup.Item>
//                         <ListGroup.Item>
//                             <strong style={{ color: '#007bff' }}>Issue Date:</strong> <span style={{ color: '#d63384' }}>{invoice.issueDate ? new Date(invoice.issueDate).toLocaleDateString() : 'N/A'}</span>
//                         </ListGroup.Item>
//                         <ListGroup.Item>
//                             <strong style={{ color: '#007bff' }}>Due Date:</strong> <span style={{ color: '#d63384' }}>{invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : 'N/A'}</span>
//                         </ListGroup.Item>
//                         <ListGroup.Item>
//                             <strong style={{ color: '#007bff' }}>Invoice File:</strong>
//                             {invoice.invoiceFile ? (
//                                 <a href={invoice.invoiceFile} target="_blank" rel="noopener noreferrer">
//                                     <Button variant="outline-primary" size="sm" className="ms-2">View File</Button>
//                                 </a>
//                             ) : (
//                                 ' N/A'
//                             )}
//                         </ListGroup.Item>
//                     </ListGroup>

//                     <div className="text-center mt-4">
//                         <Button
//                             variant="primary"
//                             onClick={() => navigate('/invoices')}
//                             style={{ minWidth: '120px' }}
//                         >
//                             Back to Invoices
//                         </Button>
//                     </div>
//                 </Card.Body>
//             </Card>
//         </div>
//     );
// };

// export default InvoiceDetails;



 // src/components/Details/InvoiceDetails.jsx

// src/components/Details/InvoiceDetails.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Spinner, Alert, Button, ListGroup, Badge } from 'react-bootstrap';
import api from '../../services/api';

const InvoiceDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [invoice, setInvoice] = useState(null);
    const [projectName, setProjectName] = useState('Loading...');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInvoiceDetails = async () => {
            try {
                const invoiceRes = await api.get(`/Invoices/${id}`);
                setInvoice(invoiceRes.data);

                if (invoiceRes.data.projectId) {
                    const projectRes = await api.get(`/Projects/${invoiceRes.data.projectId}`);
                    setProjectName(projectRes.data.name);
                } else {
                    setProjectName('N/A');
                }

            } catch (err) {
                console.error('Failed to fetch invoice details:', err);
                setError('Failed to load invoice details. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchInvoiceDetails();
        }
    }, [id]);

    // Deletes an invoice
    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this invoice?')) {
            try {
                await api.delete(`/Invoices/${id}`);
                navigate('/invoices');
            } catch (err) {
                console.error('Failed to delete invoice:', err);
                setError('Failed to delete invoice. Please try again.');
            }
        }
    };

    if (loading) {
        return <Spinner animation="border" variant="primary" className="d-block mx-auto mt-5" />;
    }

    if (error) {
        return <Alert variant="danger" className="mt-3 text-center">{error}</Alert>;
    }

    if (!invoice) {
        return <Alert variant="warning" className="mt-3 text-center">Invoice not found.</Alert>;
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
                    Invoice Details
                </Card.Header>

                <Card.Body style={{ padding: '20px' }}>
                    <Card.Title className="text-dark fw-bold pb-2 mb-2">Invoice ID: {invoice.id}</Card.Title>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <strong style={{ color: '#007bff' }}>Project:</strong> <span style={{ color: '#28a745' }}>{projectName}</span>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong style={{ color: '#007bff' }}>Amount:</strong> <span style={{ color: '#d63384' }}>${invoice.amount ? invoice.amount.toFixed(2) : '0.00'}</span>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong style={{ color: '#007bff' }}>Status:</strong>
                            <Badge bg="info" className="fw-bold">
                                {invoice.status || 'N/A'}
                            </Badge>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong style={{ color: '#007bff' }}>Issue Date:</strong> <span style={{ color: '#d63384' }}>{invoice.issueDate ? new Date(invoice.issueDate).toLocaleDateString() : 'N/A'}</span>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong style={{ color: '#007bff' }}>Due Date:</strong> <span style={{ color: '#d63384' }}>{invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : 'N/A'}</span>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong style={{ color: '#007bff' }}>Invoice File:</strong>
                            {invoice.invoiceFile ? (
                                <div className="mt-2 text-center">
                                    <a href={invoice.invoiceFile} target="_blank" rel="noopener noreferrer">
                                        <img src={invoice.invoiceFile} alt={`Invoice ID: ${invoice.id}`} className="img-fluid rounded" style={{ maxWidth: '100%' }} />
                                    </a>
                                </div>
                            ) : (
                                ' N/A'
                            )}
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
                            onClick={() => navigate('/invoices')}
                            style={{ minWidth: '120px' }}
                        >
                            Back to Invoices
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default InvoiceDetails;

