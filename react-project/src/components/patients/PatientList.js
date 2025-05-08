import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Table, Button, Container, Row, Col, Card, Alert, Badge } from 'react-bootstrap';
import { getPatients, deletePatient } from '../../services/api';
import { useToast } from '../../contexts/ToastContext';

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { addToast } = useToast();

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const response = await getPatients();
      setPatients(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch patients. Please try again later.');
      addToast('Failed to fetch patients. Please try again later.', 'danger');
      console.error('Error fetching patients:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      try {
        await deletePatient(id);
        setPatients(patients.filter(patient => patient.id !== id));
        setError(null);
        addToast('Patient deleted successfully!', 'success');
      } catch (err) {
        setError('Failed to delete patient. Please try again later.');
        addToast('Failed to delete patient. Please try again later.', 'danger');
        console.error('Error deleting patient:', err);
      }
    }
  };

  const handleViewMedicalRecords = (patientId) => {
    navigate(`/patients/${patientId}/medical-records`);
  };

  return (
    <Container className="py-4">
      <Card className="shadow border-0 rounded-lg">
        <Card.Header className="bg-white border-0 pt-4 px-4">
          <Row className="align-items-center">
            <Col>
              <h2 className="mb-0 text-start">
                <i className="bi bi-people-fill me-2"></i>
                Patient Management
              </h2>
            </Col>
            <Col className="text-end">
              <Button 
                as={Link} 
                to="/patients/add" 
                variant="primary"
                className="rounded-pill shadow-sm"
              >
                <i className="bi bi-plus-circle me-2"></i>
                Add New Patient
              </Button>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body className="px-4">
          {error && <Alert variant="danger" className="rounded-lg border-0 shadow-sm">{error}</Alert>}

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading patients...</p>
            </div>
          ) : patients.length === 0 ? (
            <Alert variant="info" className="rounded-lg border-0 shadow-sm">
              <div className="text-center py-5">
                <i className="bi bi-info-circle display-4"></i>
                <h4 className="mt-3">No patients found</h4>
                <p className="text-muted">Add your first patient to get started</p>
                <Button 
                  as={Link} 
                  to="/patients/add" 
                  variant="primary"
                  className="mt-3 rounded-pill"
                >
                  <i className="bi bi-plus-circle me-2"></i>
                  Add New Patient
                </Button>
              </div>
            </Alert>
          ) : (
            <div className="table-responsive rounded-lg">
              <Table hover className="align-middle mb-0">
                <thead className="bg-light text-uppercase">
                  <tr>
                    <th className="py-3">ID</th>
                    <th className="py-3">First Name</th>
                    <th className="py-3">Last Name</th>
                    <th className="py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map(patient => (
                    <tr key={patient.id} className="border-top">
                      <td>
                        <Badge bg="light" text="dark" pill className="px-3 py-2">
                          {patient.id}
                        </Badge>
                      </td>
                      <td className="fw-medium">{patient.first_name}</td>
                      <td className="fw-medium">{patient.last_name}</td>
                      <td>
                        <div className="d-flex gap-2 justify-content-center">
                          <Button 
                            variant="outline-primary" 
                            size="sm"
                            className="rounded-pill"
                            onClick={() => handleViewMedicalRecords(patient.id)}
                          >
                            <i className="bi bi-clipboard2-pulse me-1"></i>
                            Records
                          </Button>
                          <Button 
                            as={Link} 
                            to={`/patients/edit/${patient.id}`} 
                            variant="outline-secondary" 
                            size="sm"
                            className="rounded-pill"
                          >
                            <i className="bi bi-pencil me-1"></i>
                            Edit
                          </Button>
                          <Button 
                            variant="outline-danger" 
                            size="sm"
                            className="rounded-pill"
                            onClick={() => handleDelete(patient.id)}
                          >
                            <i className="bi bi-trash me-1"></i>
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PatientList; 