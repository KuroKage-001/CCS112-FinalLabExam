import React, { createContext, useContext, useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

// Create Toast context
const ToastContext = createContext();

// Custom hook to use the Toast context
export const useToast = () => useContext(ToastContext);

// Toast provider component
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  // Add a toast
  const addToast = (message, type = 'success', delay = 3000) => {
    // Generate a unique ID for each toast
    const id = new Date().getTime();
    setToasts([...toasts, { id, message, type, delay }]);

    // Remove the toast after the delay
    if (delay !== false) {
      setTimeout(() => removeToast(id), delay);
    }

    return id;
  };

  // Remove a toast by ID
  const removeToast = (id) => {
    setToasts(toasts.filter(toast => toast.id !== id));
  };

  // Get the background color based on toast type
  const getToastBg = (type) => {
    switch (type) {
      case 'success': return 'success';
      case 'danger': return 'danger';
      case 'warning': return 'warning';
      case 'info': return 'info';
      default: return 'light';
    }
  };

  // Get the icon based on toast type
  const getToastIcon = (type) => {
    switch (type) {
      case 'success': return 'bi-check-circle-fill';
      case 'danger': return 'bi-x-circle-fill';
      case 'warning': return 'bi-exclamation-triangle-fill';
      case 'info': return 'bi-info-circle-fill';
      default: return 'bi-bell-fill';
    }
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer 
        position="top-end" 
        className="p-3" 
        style={{ zIndex: 1060 }}
      >
        {toasts.map(toast => (
          <Toast 
            key={toast.id} 
            onClose={() => removeToast(toast.id)}
            bg={getToastBg(toast.type)}
            delay={toast.delay}
            autohide={!!toast.delay}
            className="animate__animated animate__fadeInRight animate__faster shadow-sm border-0"
          >
            <Toast.Header className={`bg-${getToastBg(toast.type)} text-white border-0`}>
              <i className={`bi ${getToastIcon(toast.type)} me-2`}></i>
              <strong className="me-auto">Notification</strong>
              <small>just now</small>
            </Toast.Header>
            <Toast.Body className={toast.type === 'light' ? 'text-dark' : 'text-white'}>
              {toast.message}
            </Toast.Body>
          </Toast>
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  );
}; 