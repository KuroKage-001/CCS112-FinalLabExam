import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import PatientList from './components/patients/PatientList';
import PatientForm from './components/patients/PatientForm';
import MedicalRecordList from './components/medical-records/MedicalRecordList';
import MedicalRecordForm from './components/medical-records/MedicalRecordForm';
import { ToastProvider } from './contexts/ToastContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.min.css';
import './App.css';

function App() {
  return (
    <ToastProvider>
      <Router>
        <div className="App">
          <Navbar bg="primary" variant="dark" expand="lg" className="custom-navbar">
            <Container>
              <Navbar.Brand as={Link} to="/" className="fw-bold">
                <i className="bi bi-hospital me-2"></i>
                Patient Management System
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
            </Container>
          </Navbar>

          <Container className="mt-4 mb-5">
            <Routes>
              <Route path="/" element={<PatientList />} />
              <Route path="/patients/add" element={<PatientForm />} />
              <Route path="/patients/edit/:id" element={<PatientForm />} />
              <Route path="/patients/:patientId/medical-records" element={<MedicalRecordList />} />
              <Route path="/patients/:patientId/medical-records/add" element={<MedicalRecordForm />} />
              <Route path="/patients/:patientId/medical-records/edit/:id" element={<MedicalRecordForm />} />
            </Routes>
          </Container>
        </div>
      </Router>
    </ToastProvider>
  );
}

export default App;
