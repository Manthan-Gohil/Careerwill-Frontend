import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BlogPage from "./pages/BlogPage";
import BlogDetail from "./pages/BlogDetail";
import StudentProgressDashboard from "./pages/StudentProgressDashboard";
import studentsData from "./data/students-data.json";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Apps from "./pages/Apps";
import Courses from "./pages/Courses";
import Layout from "./components/Layout";

function App() {
  const [selectedStudentId, setSelectedStudentId] = useState(1);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const student = studentsData.students.find(
      (s) => s.id === selectedStudentId
    );
    if (student) {
      setSelectedStudent(student);
    }
  }, [selectedStudentId]);

  const handleStudentChange = (studentId) => {
    setSelectedStudentId(studentId);
  };

  if (!selectedStudent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading student data...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home/>}/>
          <Route path="app" element={<Apps />} />
          <Route path="courses" element={<Courses />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:id" element={<BlogDetail />} />
          <Route
            path="dashboard"
            element={
              <StudentProgressDashboard
                studentData={selectedStudent}
                students={studentsData.students}
                selectedStudentId={selectedStudentId}
                onStudentChange={handleStudentChange}
              />
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
