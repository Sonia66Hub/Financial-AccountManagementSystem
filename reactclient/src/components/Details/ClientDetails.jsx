

// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Card, Spinner, Alert, Button, ListGroup } from 'react-bootstrap';
// // 'api' ফাইলটির সঠিক পাথ ব্যবহার করা হয়েছে
// import api from '../../services/api';

// const ClientDetails = () => {
//     // URL থেকে ':id' প্যারামিটারটি নেওয়া হচ্ছে
//     const { id } = useParams();
//     const navigate = useNavigate();

//     const [client, setClient] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchClientDetails = async () => {
//             try {
//                 const response = await api.get(`/Clients/${id}`);
//                 setClient(response.data);
//             } catch (err) {
//                 console.error('Failed to fetch client details:', err);
//                 setError('Failed to load client details. Please try again.');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         if (id) {
//             fetchClientDetails();
//         }
//     }, [id]);

//     if (loading) {
//         return <Spinner animation="border" variant="primary" className="d-block mx-auto mt-5" />;
//     }

//     if (error) {
//         return <Alert variant="danger" className="mt-3 text-center">{error}</Alert>;
//     }

//     if (!client) {
//         return <Alert variant="warning" className="mt-3 text-center">Client not found.</Alert>;
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
//                     Client Details
//                 </Card.Header>

//                 <Card.Body style={{ padding: '20px' }}>
//                     <Card.Title className="text-dark fw-bold pb-2 mb-2">{client.name}</Card.Title>
//                     <ListGroup variant="flush">
//                         <ListGroup.Item>
//                             <strong style={{ color: '#007bff' }}>ID:</strong> <span style={{ color: '#0056b3' }}>{client.id}</span>
//                         </ListGroup.Item>
//                         <ListGroup.Item>
//                             <strong style={{ color: '#007bff' }}>Email:</strong> <span style={{ color: '#28a745' }}>{client.email}</span>
//                         </ListGroup.Item>
//                         <ListGroup.Item>
//                             <strong style={{ color: '#007bff' }}>Company:</strong> <span style={{ color: '#6f42c1' }}>{client.company}</span>
//                         </ListGroup.Item>
//                         <ListGroup.Item>
//                             <strong style={{ color: '#007bff' }}>Phone:</strong> <span style={{ color: '#d63384' }}>{client.phone}</span>
//                         </ListGroup.Item>
//                     </ListGroup>

//                     <div className="text-center mt-4">
//                         <Button
//                             variant="primary"
//                             onClick={() => navigate('/clients')}
//                             style={{ minWidth: '120px' }}
//                         >
//                             Back to Clients
//                         </Button>
//                     </div>
//                 </Card.Body>
//             </Card>
//         </div>
//     );
// };

// export default ClientDetails;


// src/components/Details/ClientDetails.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Spinner, Alert, Button, ListGroup } from 'react-bootstrap';
import api from '../../services/api';

const ClientDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [client, setClient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClientDetails = async () => {
            try {
                const response = await api.get(`/Clients/${id}`);
                setClient(response.data);
            } catch (err) {
                console.error('Failed to fetch client details:', err);
                setError('Failed to load client details. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchClientDetails();
        }
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this client?')) {
            try {
                await api.delete(`/Clients/${id}`);
                navigate('/clients');
            } catch (err) {
                console.error('Failed to delete client:', err);
                setError('Failed to delete client. Please try again.');
            }
        }
    };

    if (loading) {
        return <Spinner animation="border" variant="primary" className="d-block mx-auto mt-5" />;
    }

    if (error) {
        return <Alert variant="danger" className="mt-3 text-center">{error}</Alert>;
    }

    if (!client) {
        return <Alert variant="warning" className="mt-3 text-center">Client not found.</Alert>;
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
                    Client Details
                </Card.Header>

                <Card.Body style={{ padding: '20px' }}>
                    <Card.Title className="text-dark fw-bold pb-2 mb-2">{client.name}</Card.Title>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <strong style={{ color: '#007bff' }}>ID:</strong> <span style={{ color: '#0056b3' }}>{client.id}</span>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong style={{ color: '#007bff' }}>Email:</strong> <span style={{ color: '#28a745' }}>{client.email}</span>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong style={{ color: '#007bff' }}>Company:</strong> <span style={{ color: '#6f42c1' }}>{client.company}</span>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong style={{ color: '#007bff' }}>Phone:</strong> <span style={{ color: '#d63384' }}>{client.phone}</span>
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
                            onClick={() => navigate('/clients')}
                            style={{ minWidth: '120px' }}
                        >
                            Back to Clients
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default ClientDetails;
