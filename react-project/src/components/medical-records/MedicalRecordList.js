import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Table, Button, Container, Row, Col, Card, Alert, Badge } from 'react-bootstrap';
import { getMedicalRecords, deleteMedicalRecord, getPatient } from '../../services/api';
import { useToast } from '../../contexts/ToastContext';

const MedicalRecordList = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();
  
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPatientAndRecords();
  }, [patientId]);

  const fetchPatientAndRecords = async () => {
    try {
      setLoading(true);
      const [patientResponse, recordsResponse] = await Promise.all([
        getPatient(patientId),
        getMedicalRecords(patientId)
      ]);
      
      setPatient(patientResponse.data);
      setMedicalRecords(recordsResponse.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch data. Please try again later.');
      addToast('Failed to fetch medical records. Please try again later.', 'danger');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this medical record?')) {
      try {
        await deleteMedicalRecord(id);
        setMedicalRecords(medicalRecords.filter(record => record.id !== id));
        setError(null);
        addToast('Medical record deleted successfully!', 'success');
      } catch (err) {
        setError('Failed to delete medical record. Please try again later.');
        addToast('Failed to delete medical record. Please try again later.', 'danger');
        console.error('Error deleting medical record:', err);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Container className="py-4">
      <Card className="shadow border-0 rounded-lg">
        <Card.Header className="bg-white border-0 pt-4 px-4">
          <Row className="align-items-center">
            <Col>
              <h2 className="mb-0 text-start">
                <i className="bi bi-clipboard2-pulse me-2"></i>
                Medical Records
                {patient && (
                  <span className="ms-2 fs-5 fw-normal text-muted">
                    for <span className="fw-bold">{patient.first_name} {patient.last_name}</span>
                  </span>
                )}
              </h2>
            </Col>
            <Col className="text-end">
              <div className="d-flex gap-2 justify-content-end">
                <Button 
                  as={Link} 
                  to={`/patients/${patientId}/medical-records/add`} 
                  variant="primary"
                  className="rounded-pill shadow-sm"
                >
                  <i className="bi bi-plus-circle me-2"></i>
                  Add New Record
                </Button>
                <Button 
                  variant="outline-secondary"
                  onClick={() => navigate('/')}
                  className="rounded-pill"
                >
                  <i className="bi bi-arrow-left me-2"></i>
                  Back to Patients
                </Button>
              </div>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body className="px-4">
          {error && (
            <Alert variant="danger" className="rounded-lg border-0 shadow-sm">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              {error}
            </Alert>
          )}

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading medical records...</p>
            </div>
          ) : medicalRecords.length === 0 ? (
            <Alert variant="info" className="rounded-lg border-0 shadow-sm">
              <div className="text-center py-5">
                <i className="bi bi-info-circle display-4"></i>
                <h4 className="mt-3">No medical records found</h4>
                <p className="text-muted">Add the first medical record for this patient</p>
                <Button 
                  as={Link} 
                  to={`/patients/${patientId}/medical-records/add`} 
                  variant="primary"
                  className="mt-3 rounded-pill"
                >
                  <i className="bi bi-plus-circle me-2"></i>
                  Add Medical Record
                </Button>
              </div>
            </Alert>
          ) : (
            <div className="table-responsive rounded-lg">
              <Table hover className="align-middle mb-0">
                <thead className="bg-light text-uppercase">
                  <tr>
                    <th className="py-3">ID</th>
                    <th className="py-3">Visit Date</th>
                    <th className="py-3">Diagnosis</th>
                    <th className="py-3">Prescription</th>
                    <th className="py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {medicalRecords.map(record => (
                    <tr key={record.id} className="border-top">
                      <td>
                        <Badge bg="light" text="dark" pill className="px-3 py-2">
                          {record.id}
                        </Badge>
                      </td>
                      <td className="fw-medium">
                        <i className="bi bi-calendar-event me-2 text-primary"></i>
                        {formatDate(record.visit_date)}
                      </td>
                      <td>
                        <div className="text-truncate" style={{ maxWidth: '200px' }}>
                          {record.diagnosis}
                        </div>
                      </td>
                      <td>
                        <div className="text-truncate" style={{ maxWidth: '200px' }}>
                          {record.prescription}
                        </div>
                      </td>
                      <td>
                        <div className="d-flex gap-2 justify-content-center">
                          <Button 
                            as={Link} 
                            to={`/patients/${patientId}/medical-records/edit/${record.id}`} 
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
                            onClick={() => handleDelete(record.id)}
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

export default MedicalRecordList;