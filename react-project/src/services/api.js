import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

// Configure axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

// Patient API calls
export const getPatients = () => {
  return api.get('/patients');
};

export const getPatient = (id) => {
  return api.get(`/patients/${id}`);
};

export const createPatient = (patientData) => {
  return api.post('/patients', patientData);
};

export const updatePatient = (id, patientData) => {
  return api.put(`/patients/${id}`, patientData);
};

export const deletePatient = (id) => {
  return api.delete(`/patients/${id}`);
};

// Medical Record API calls
export const getMedicalRecords = (patientId) => {
  return api.get(`/patients/${patientId}/medical-records`);
};

export const getMedicalRecord = (id) => {
  return api.get(`/medical-records/${id}`);
};

export const createMedicalRecord = (patientId, recordData) => {
  return api.post(`/patients/${patientId}/medical-records`, recordData);
};

export const updateMedicalRecord = (id, recordData) => {
  return api.put(`/medical-records/${id}`, recordData);
};

export const deleteMedicalRecord = (id) => {
  return api.delete(`/medical-records/${id}`);
};
