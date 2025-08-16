// import React, { useState, useEffect } from 'react';
// import { Form, Button, Alert } from 'react-bootstrap';
// import api from '../../services/api';

// const ProjectForm = ({ projectData, onSave, onCancel }) => {
//     const statusMap = {
//         'NotStarted': 0,
//         'InProgress': 1,
//         'Completed': 2,
//         'Cancelled': 3
//     };

//     const [project, setProject] = useState({
//         name: '',
//         status: 0,
//         startDate: '',
//         endDate: '',
//         clientId: '',
//         assignedTeam: ''
//     });

//     const [clients, setClients] = useState([]);
//     const [error, setError] = useState(null);
//     const isEditMode = !!projectData;

//     useEffect(() => {
//         const fetchClients = async () => {
//             try {
//                 const response = await api.get('/Clients');
//                 setClients(response.data);
//             } catch (err) {
//                 console.error('Failed to fetch clients:', err);
//                 setError('Failed to load clients. Please try again.');
//             }
//         };

//         if (isEditMode) {
//             setProject({
//                 ...projectData,
//                 clientId: projectData.clientId?.toString() || '',
//                 status: statusMap[projectData.status],
//                 startDate: projectData.startDate
//                     ? new Date(projectData.startDate).toISOString().split('T')[0]
//                     : '',
//                 endDate: projectData.endDate
//                     ? new Date(projectData.endDate).toISOString().split('T')[0]
//                     : ''
//             });
//         } else {
//             setProject(prev => ({
//                 ...prev,
//                 startDate: new Date().toISOString().split('T')[0]
//             }));
//         }

//         fetchClients();
//     }, [projectData, isEditMode]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setProject(prev => ({
//             ...prev,
//             [name]: name === 'status' ? parseInt(value) : value
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError(null);

//         try {
//             const projectToSubmit = {
//                 ...project,
//                 clientId: parseInt(project.clientId)
//             };

//             if (isEditMode) {
//                 if (!projectToSubmit.id) {
//                     setError('Error: Project ID is missing.');
//                     return;
//                 }
//                 await api.put(`/Projects/${projectToSubmit.id}`, projectToSubmit);
//             } else {
//                 await api.post('/Projects', projectToSubmit);
//             }
//             onSave();
//         } catch (err) {
//             if (err.response?.data?.errors) {
//                 const messages = Object.values(err.response.data.errors).flat();
//                 setError(
//                     <ul>{messages.map((msg, i) => <li key={i}>{msg}</li>)}</ul>
//                 );
//             } else {
//                 setError(err.response?.data?.title || 'An unexpected error occurred.');
//             }
//         }
//     };

//     return (
//         <div>
//             <h2>{isEditMode ? 'Edit Project' : 'Create Project'}</h2>
//             {error && <Alert variant="danger">{error}</Alert>}
//             <Form onSubmit={handleSubmit}>
//                 <Form.Group className="mb-3">
//                     <Form.Label>Project Name</Form.Label>
//                     <Form.Control
//                         type="text"
//                         name="name"
//                         value={project.name}
//                         onChange={handleChange}
//                         required
//                     />
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                     <Form.Label>Client</Form.Label>
//                     <Form.Select
//                         name="clientId"
//                         value={project.clientId}
//                         onChange={handleChange}
//                         required
//                     >
//                         <option value="">Select a Client</option>
//                         {clients.map(client => (
//                             <option key={client.id} value={client.id}>
//                                 {client.name}
//                             </option>
//                         ))}
//                     </Form.Select>
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                     <Form.Label>Status</Form.Label>
//                     <Form.Select
//                         name="status"
//                         value={project.status}
//                         onChange={handleChange}
//                         required
//                     >
//                         <option value={0}>Not Started</option>
//                         <option value={1}>In Progress</option>
//                         <option value={2}>Completed</option>
//                         <option value={3}>Cancelled</option>
//                     </Form.Select>
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                     <Form.Label>Assigned Team</Form.Label>
//                     <Form.Control
//                         type="text"
//                         name="assignedTeam"
//                         value={project.assignedTeam}
//                         onChange={handleChange}
//                     />
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                     <Form.Label>Start Date</Form.Label>
//                     <Form.Control
//                         type="date"
//                         name="startDate"
//                         value={project.startDate}
//                         onChange={handleChange}
//                         required
//                     />
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                     <Form.Label>End Date</Form.Label>
//                     <Form.Control
//                         type="date"
//                         name="endDate"
//                         value={project.endDate}
//                         onChange={handleChange}
//                     />
//                 </Form.Group>
//                 <Button variant="primary" type="submit">
//                     {isEditMode ? 'Update' : 'Create'}
//                 </Button>
//                 <Button variant="secondary" onClick={onCancel} className="ms-2">
//                     Cancel
//                 </Button>
//             </Form>
//         </div>
//     );
// };

// export default ProjectForm;


import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import api from '../../services/api';

const ProjectForm = ({ projectData, onSave, onCancel }) => {
    // এই 'statusMap' অবজেক্টটি মুছে ফেলা হয়েছে কারণ এটি আর ব্যবহার করা হচ্ছে না।
    
    const [project, setProject] = useState({
        name: '',
        status: 0, // Default value is 0 (NotStarted)
        startDate: '',
        endDate: '',
        clientId: '',
        assignedTeam: ''
    });

    const [clients, setClients] = useState([]);
    const [error, setError] = useState(null);
    const isEditMode = !!projectData;

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await api.get('/Clients');
                setClients(response.data);
            } catch (err) {
                console.error('Failed to fetch clients:', err);
                setError('Failed to load clients. Please try again.');
            }
        };

        if (isEditMode && projectData) {
            setProject({
                ...projectData,
                clientId: projectData.clientId?.toString() || '',
                status: projectData.status,
                startDate: projectData.startDate
                    ? new Date(projectData.startDate).toISOString().split('T')[0]
                    : '',
                endDate: projectData.endDate
                    ? new Date(projectData.endDate).toISOString().split('T')[0]
                    : ''
            });
        } else {
            setProject(prev => ({
                ...prev,
                startDate: new Date().toISOString().split('T')[0]
            }));
        }

        fetchClients();
    }, [projectData, isEditMode]); // নির্ভরশীলতা অ্যারেকে পরিষ্কার রাখা হয়েছে

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProject(prev => ({
            ...prev,
            [name]: name === 'status' ? parseInt(value) : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const projectToSubmit = {
                ...project,
                clientId: parseInt(project.clientId)
            };

            if (isEditMode) {
                if (!projectToSubmit.id) {
                    setError('Error: Project ID is missing.');
                    return;
                }
                await api.put(`/Projects/${projectToSubmit.id}`, projectToSubmit);
            } else {
                await api.post('/Projects', projectToSubmit);
            }
            onSave();
        } catch (err) {
            if (err.response?.data?.errors) {
                const messages = Object.values(err.response.data.errors).flat();
                setError(
                    <ul>{messages.map((msg, i) => <li key={i}>{msg}</li>)}</ul>
                );
            } else {
                setError(err.response?.data?.title || 'An unexpected error occurred.');
            }
        }
    };

    return (
        <div>
            <h2>{isEditMode ? 'Edit Project' : 'Create Project'}</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Project Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={project.name}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Client</Form.Label>
                    <Form.Select
                        name="clientId"
                        value={project.clientId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a Client</option>
                        {clients.map(client => (
                            <option key={client.id} value={client.id}>
                                {client.name}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Status</Form.Label>
                    <Form.Select
                        name="status"
                        value={project.status}
                        onChange={handleChange}
                        required
                    >
                        <option value={0}>Not Started</option>
                        <option value={1}>In Progress</option>
                        <option value={2}>Completed</option>
                        <option value={3}>Cancelled</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Assigned Team</Form.Label>
                    <Form.Control
                        type="text"
                        name="assignedTeam"
                        value={project.assignedTeam}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control
                        type="date"
                        name="startDate"
                        value={project.startDate}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>End Date</Form.Label>
                    <Form.Control
                        type="date"
                        name="endDate"
                        value={project.endDate}
                        onChange={handleChange}
                    />
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

export default ProjectForm;