/**
 * Student Service
 * Handles API calls to the Student Management Backend using fetch.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

/**
 * Handle API responses and throw errors for non-2xx status codes
 */
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    // If validation errors exist, include them in the error message
    if (errorData.errors && errorData.errors.length > 0) {
      const errorMessage = errorData.errors.join(', ');
      throw new Error(errorMessage);
    }
    const errorMessage = errorData.message || `API Error: ${response.status} ${response.statusText}`;
    throw new Error(errorMessage);
  }
  return response.json();
};

export const studentService = {
  /**
   * Fetch all students from the database
   */
  getAll: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/students`);
      return await handleResponse(response);
    } catch (error) {
      console.error('Error in getAll:', error);
      throw error;
    }
  },

  /**
   * Fetch a single student by ID
   */
  getById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/students/${id}`);
      return await handleResponse(response);
    } catch (error) {
      console.error(`Error in getById(${id}):`, error);
      throw error;
    }
  },

  /**
   * Create a new student registration
   */
  create: async (studentData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/students`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });
      return await handleResponse(response);
    } catch (error) {
      console.error('Error in create:', error);
      throw error;
    }
  },

  /**
   * Update an existing student's data
   */
  update: async (id, studentData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/students/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });
      return await handleResponse(response);
    } catch (error) {
      console.error(`Error in update(${id}):`, error);
      throw error;
    }
  },

  /**
   * Delete a student by ID
   */
  delete: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/students/${id}`, {
        method: 'DELETE',
      });
      return await handleResponse(response);
    } catch (error) {
      console.error(`Error in delete(${id}):`, error);
      throw error;
    }
  },
};
