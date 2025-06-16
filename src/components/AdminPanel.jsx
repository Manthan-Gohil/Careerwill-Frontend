import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, ChevronDown, ChevronRight } from 'lucide-react';
import api from '../services/api';

const AdminPanel = () => {
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [newQuestion, setNewQuestion] = useState({ question: '', answer: '', category: '' });

  // Fetch all data on component mount
  useEffect(() => {
    fetchCategories();
    fetchQuestions();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.getCategories();
      setCategories(response.data.data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchQuestions = async () => {
    try {
      const response = await api.getQuestions();
      setQuestions(response.data.data.questions);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const handleCreateCategory = async () => {
    try {
      const response = await api.createCategory(newCategory);
      setCategories([...categories, response.data.data.category]);
      setNewCategory({ name: '', description: '' });
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  const handleUpdateCategory = async () => {
    try {
      const response = await api.updateCategory(editingCategory._id, editingCategory);
      setCategories(categories.map(cat => 
        cat._id === editingCategory._id ? response.data.data.category : cat
      ));
      setEditingCategory(null);
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await api.deleteCategory(categoryId);
      setCategories(categories.filter(cat => cat._id !== categoryId));
      setQuestions(questions.filter(q => q.category !== categoryId));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleCreateQuestion = async () => {
    try {
      const response = await api.createQuestion(newQuestion);
      setQuestions([...questions, response.data.data.question]);
      setNewQuestion({ question: '', answer: '', category: '' });
    } catch (error) {
      console.error('Error creating question:', error);
    }
  };

  const handleUpdateQuestion = async () => {
    try {
      const response = await api.updateQuestion(editingQuestion._id, editingQuestion);
      setQuestions(questions.map(q => 
        q._id === editingQuestion._id ? response.data.data.question : q
      ));
      setEditingQuestion(null);
    } catch (error) {
      console.error('Error updating question:', error);
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    try {
      await api.deleteQuestion(questionId);
      setQuestions(questions.filter(q => q._id !== questionId));
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      {/* Categories Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        
        {/* Create/Edit Category Form */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium mb-3">
            {editingCategory ? 'Edit Category' : 'Add New Category'}
          </h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Category Name"
              className="flex-1 p-2 border rounded"
              value={editingCategory ? editingCategory.name : newCategory.name}
              onChange={(e) => editingCategory 
                ? setEditingCategory({...editingCategory, name: e.target.value})
                : setNewCategory({...newCategory, name: e.target.value})
              }
            />
            <input
              type="text"
              placeholder="Description"
              className="flex-1 p-2 border rounded"
              value={editingCategory ? editingCategory.description : newCategory.description}
              onChange={(e) => editingCategory 
                ? setEditingCategory({...editingCategory, description: e.target.value})
                : setNewCategory({...newCategory, description: e.target.value})
              }
            />
            <button
              onClick={editingCategory ? handleUpdateCategory : handleCreateCategory}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              {editingCategory ? 'Update' : 'Add'}
            </button>
            {editingCategory && (
              <button
                onClick={() => setEditingCategory(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* Categories List */}
        <div className="space-y-2">
          {categories.map(category => (
            <div key={category._id} className="border rounded-lg overflow-hidden">
              <div className="flex justify-between items-center p-3 bg-gray-100">
                <div className="flex items-center">
                  <button 
                    onClick={() => toggleCategory(category._id)}
                    className="mr-2 text-gray-600"
                  >
                    {expandedCategories[category._id] ? <ChevronDown /> : <ChevronRight />}
                  </button>
                  <span className="font-medium">{category.name}</span>
                  {category.description && (
                    <span className="text-sm text-gray-500 ml-2">- {category.description}</span>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditingCategory(category)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(category._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              
              {expandedCategories[category._id] && (
                <div className="p-4 border-t">
                  {/* Questions in this category */}
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Questions in this category:</h4>
                    {questions.filter(q => q.category === category._id).length > 0 ? (
                      <ul className="space-y-2">
                        {questions
                          .filter(q => q.category === category._id)
                          .map(question => (
                            <li key={question._id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                              <div>
                                <p className="font-medium">{question.question}</p>
                                <p className="text-sm text-gray-600">{question.answer}</p>
                              </div>
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => setEditingQuestion(question)}
                                  className="text-blue-600 hover:text-blue-800"
                                >
                                  <Edit size={16} />
                                </button>
                                <button
                                  onClick={() => handleDeleteQuestion(question._id)}
                                  className="text-red-600 hover:text-red-800"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </li>
                          ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500">No questions in this category yet.</p>
                    )}
                  </div>
                  
                  {/* Add Question to this Category */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-2">Add New Question</h4>
                    <div className="flex flex-col gap-3">
                      <input
                        type="text"
                        placeholder="Question"
                        className="p-2 border rounded"
                        value={newQuestion.category === category._id ? newQuestion.question : ''}
                        onChange={(e) => setNewQuestion({
                          ...newQuestion,
                          question: e.target.value,
                          category: category._id
                        })}
                      />
                      <textarea
                        placeholder="Answer"
                        className="p-2 border rounded"
                        rows={3}
                        value={newQuestion.category === category._id ? newQuestion.answer : ''}
                        onChange={(e) => setNewQuestion({
                          ...newQuestion,
                          answer: e.target.value,
                          category: category._id
                        })}
                      />
                      <button
                        onClick={handleCreateQuestion}
                        disabled={!newQuestion.question || !newQuestion.answer || newQuestion.category !== category._id}
                        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:bg-indigo-300"
                      >
                        Add Question
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Edit Question Modal */}
      {editingQuestion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium mb-4">Edit Question</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Question"
                className="w-full p-2 border rounded"
                value={editingQuestion.question}
                onChange={(e) => setEditingQuestion({
                  ...editingQuestion,
                  question: e.target.value
                })}
              />
              <textarea
                placeholder="Answer"
                className="w-full p-2 border rounded"
                rows={4}
                value={editingQuestion.answer}
                onChange={(e) => setEditingQuestion({
                  ...editingQuestion,
                  answer: e.target.value
                })}
              />
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setEditingQuestion(null)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateQuestion}
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;