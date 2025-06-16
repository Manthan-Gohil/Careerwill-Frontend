import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/chatbot';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default {
  // Categories
  getCategories() {
    return api.get('/categories');
  },
  createCategory(categoryData) {
    return api.post('/categories', categoryData);
  },
  updateCategory(id, updateData) {
    return api.patch(`/categories/${id}`, updateData);
  },
  deleteCategory(id) {
    return api.delete(`/categories/${id}`);
  },

  // Questions
  getQuestions() {
    return api.get('/questions');
  },
  getQuestionsByCategory(categoryId) {
    return api.get(`/categories/${categoryId}/questions`);
  },
  createQuestion(questionData) {
    return api.post('/questions', questionData);
  },
  updateQuestion(id, updateData) {
    return api.patch(`/questions/${id}`, updateData);
  },
  deleteQuestion(id) {
    return api.delete(`/questions/${id}`);
  },

  // Chat
  sendQuery(query) {
    return api.post('/query', { query });
  },

  // Auth
  login(credentials) {
    return api.post('/auth/login', credentials);
  }
};