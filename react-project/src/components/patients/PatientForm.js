import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Card, Container, Alert, Row, Col } from 'react-bootstrap';
import { getPatient, createPatient, updatePatient } from '../../services/api';
import { useToast } from '../../contexts/ToastContext';

const PatientForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: ''
  });
  
  const [loading, setLoading] = useState(isEditing);
  const [error, setError] = useState(null);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (isEditing) {
      fetchPatient();
    }
  }, [id]);

  const fetchPatient = async () => {
    try {
      setLoading(true);
      const response = await getPatient(id);
      setFormData({
        first_name: response.data.first_name,
        last_name: response.data.last_name
      });
      setError(null);
    } catch (err) {
      setError('Failed to fetch patient data. Please try again later.');
      addToast('Failed to fetch patient data. Please try again later.', 'danger');
      console.error('Error fetching patient:', err);
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
        await updatePatient(id, formData);
        addToast(`Patient ${formData.first_name} ${formData.last_name} updated successfully!`, 'success');
      } else {
        await createPatient(formData);
        addToast(`Patient ${formData.first_name} ${formData.last_name} created successfully!`, 'success');
      }
      navigate('/');
    } catch (err) {
      const errorMessage = `Failed to ${isEditing ? 'update' : 'create'} patient. Please try again later.`;
      setError(errorMessage);
      addToast(errorMessage, 'danger');
      console.error(`Error ${isEditing ? 'updating' : 'creating'} patient:`, err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-4">
      <Card className="shadow border-0 rounded-lg">
        <Card.Header className="bg-white border-0 pt-4 px-4">
          <h2 className="mb-0 text-start">
            <i className={`bi ${isEditing ? 'bi-pencil-square' : 'bi-person-plus'} me-2`}></i>
            {isEditing ? 'Edit Patient' : 'Add New Patient'}
          </h2>
        </Card.Header>
        <Card.Body className="px-4 pb-4">
          {error && (
            <Alert variant="danger" className="rounded-lg border-0 shadow-sm">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              {error}
            </Alert>
          )}
          
          {loading && isEditing ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading patient data...</p>
            </div>
          ) : (
            <Form noValidate validated={validated} onSubmit={handleSubmit} className="pt-3">
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-4" controlId="first_name">
                    <Form.Label>
                      <i className="bi bi-person me-2"></i>
                      First Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleInputChange}
                      placeholder="Enter first name"
                      required
                      className="py-2"
                    />
                    <Form.Control.Feedback type="invalid">
                      First name is required.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-4" controlId="last_name">
                    <Form.Label>
                      <i className="bi bi-person me-2"></i>
                      Last Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleInputChange}
                      placeholder="Enter last name"
                      required
                      className="py-2"
                    />
                    <Form.Control.Feedback type="invalid">
                      Last name is required.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

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
                  onClick={() => navigate('/')}
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

export default PatientForm;