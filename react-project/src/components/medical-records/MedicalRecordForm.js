import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Card, Container, Alert, Row, Col } from 'react-bootstrap';
import { getMedicalRecord, createMedicalRecord, updateMedicalRecord, getPatient } from '../../services/api';
import { useToast } from '../../contexts/ToastContext';

const MedicalRecordForm = () => {
  const { patientId, id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    visit_date: '',
    diagnosis: '',
    prescription: ''
  });
  
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    fetchInitialData();
  }, [patientId, id]);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      
      // Always fetch patient data
      const patientResponse = await getPatient(patientId);
      setPatient(patientResponse.data);
      
      // If editing, fetch the medical record
      if (isEditing) {
        const recordResponse = await getMedicalRecord(id);
        // Format date for input field (YYYY-MM-DD)
        const visitDate = new Date(recordResponse.data.visit_date)
          .toISOString().split('T')[0];
          
        setFormData({
          visit_date: visitDate,
          diagnosis: recordResponse.data.diagnosis,
          prescription: recordResponse.data.prescription
        });
      }
      
      setError(null);
    } catch (err) {
      setError('Failed to fetch data. Please try again later.');
      addToast('Failed to fetch data. Please try again later.', 'danger');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      setLoading(true);
      if (isEditing) {
        await updateMedicalRecord(id, formData);
        addToast('Medical record updated successfully!', 'success');
      } else {
        await createMedicalRecord(patientId, formData);
        addToast('Medical record created successfully!', 'success');
      }
      navigate(`/patients/${patientId}/medical-records`);
    } catch (err) {
      const errorMessage = `Failed to ${isEditing ? 'update' : 'create'} medical record. Please try again later.`;
      setError(errorMessage);
      addToast(errorMessage, 'danger');
      console.error(`Error ${isEditing ? 'updating' : 'creating'} medical record:`, err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-4">
      <Card className="shadow border-0 rounded-lg">
        <Card.Header className="bg-white border-0 pt-4 px-4">
          <h2 className="mb-0 text-start">
            <i className={`bi ${isEditing ? 'bi-clipboard-check' : 'bi-clipboard-plus'} me-2`}></i>
            {isEditing ? 'Edit' : 'Add New'} Medical Record
            {patient && (
              <span className="ms-2 fs-5 fw-normal text-muted">
                for <span className="fw-bold">{patient.first_name} {patient.last_name}</span>
              </span>
            )}
          </h2>
        </Card.Header>
        <Card.Body className="px-4 pb-4">
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
              <p className="mt-3">Loading data...</p>
            </div>
          ) : (
            <Form noValidate validated={validated} onSubmit={handleSubmit} className="pt-3">
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-4" controlId="visit_date">
                    <Form.Label>
                      <i className="bi bi-calendar-date me-2"></i>
                      Visit Date
                    </Form.Label>
                    <Form.Control
                      type="date"
                      name="visit_date"
                      value={formData.visit_date}
                      onChange={handleInputChange}
                      required
                      className="py-2"
                    />
                    <Form.Control.Feedback type="invalid">
                      Visit date is required.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-4" controlId="diagnosis">
                <Form.Label>
                  <i className="bi bi-journal-medical me-2"></i>
                  Diagnosis
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="diagnosis"
                  value={formData.diagnosis}
                  onChange={handleInputChange}
                  placeholder="Enter diagnosis"
                  required
                  className="py-2"
                />
                <Form.Control.Feedback type="invalid">
                  Diagnosis is required.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-4" controlId="prescription">
                <Form.Label>
                  <i className="bi bi-capsule me-2"></i>
                  Prescription
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="prescription"
                  value={formData.prescription}
                  onChange={handleInputChange}
                  placeholder="Enter prescription"
                  required
                  className="py-2"
                />
                <Form.Control.Feedback type="invalid">
                  Prescription is required.
                </Form.Control.Feedback>
              </Form.Group>

              <div className="d-flex gap-3 mt-4">
                <Button 
                  variant="primary" 
                  type="submit" 
                  disabled={loading}
                  className="px-4 py-2"
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-check-circle me-2"></i>
                      Save
                    </>
                  )}
                </Button>
                <Button 
                  variant="outline-secondary" 
                  onClick={() => navigate(`/patients/${patientId}/medical-records`)}
                  disabled={loading}
                  className="px-4 py-2"
                >
                  <i className="bi bi-x-circle me-2"></i>
                  Cancel
                </Button>
              </div>
            </Form>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default MedicalRecordForm; 