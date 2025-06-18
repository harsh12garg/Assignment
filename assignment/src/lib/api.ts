import axios from 'axios';

const BASE_URL = 'https://assessments-xhy0.onrender.com';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface SubmissionData {
  // Add your form fields here based on your requirements
  basicDetails?: any;
  documents?: any;
  interviewAvailability?: any;
  statementOfPurpose?: any;
}

export interface FileUploadResponse {
  url: string;
  fileId: string;
}

export const submitApplication = async (data: SubmissionData) => {
  try {
    const response = await api.post('/submit', data);
    return response.data;
  } catch (error) {
    console.error('Error submitting application:', error);
    throw error;
  }
};

export const uploadFile = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    // Override the content-type header for file upload
    const response = await api.post('/upload-file', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data as FileUploadResponse;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

export default api;
