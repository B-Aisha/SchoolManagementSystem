import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AssignGradesPage = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [students, setStudents] = useState([]);
  const [grades, setGrades] = useState({});

  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem('token');
      const teacherId = localStorage.getItem('teacherId');
      try {
        const response = await axios.get(`https://localhost:7260/api/teacher/courses/${teacherId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCourses(response.data);
      } catch (error) {
        console.error('Failed to fetch courses', error);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    if (!selectedCourseId) return;

    const fetchStudents = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`https://localhost:7260/api/grade/course/${selectedCourseId}/students`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStudents(response.data);
      } catch (error) {
        console.error('Failed to fetch students', error);
      }
    };

    fetchStudents();
  }, [selectedCourseId]);

  const handleInputChange = (studentId, field, value) => {
    setGrades(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [field]: value
      }
    }));
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    const payload = Object.entries(grades).map(([studentId, values]) => ({
      studentId,
      courseId: selectedCourseId,
      catMarks: parseInt(values.catMarks),
      examMarks: parseInt(values.examMarks)
    }));

    try {
      await axios.post('https://localhost:7260/api/grade/assign', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Grades submitted successfully!');
    } catch (error) {
      console.error('Failed to submit grades', error);
      alert('Failed to submit grades.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Assign Grades</h2>

      <div style={{ marginBottom: '20px' }}>
        <label>Select Course: </label>
        <select
          value={selectedCourseId}
          onChange={e => setSelectedCourseId(e.target.value)}
          style={{ padding: '8px', width: '300px' }}
        >
          <option value=''>-- Select Course --</option>
          {courses.map(course => (
            <option key={course.courseId} value={course.courseId}>
              {course.title}
            </option>
          ))}
        </select>
      </div>

      {students.length > 0 && (
        <>
          <table className="custom-table">
            <thead>
              <tr>
                <th>Admission No</th>
                <th>Full Name</th>
                <th>CAT Marks</th>
                <th>Exam Marks</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student.studentId}>
                  <td>{student.admNo}</td>
                  <td>{student.fullName}</td>
                  <td>
                    <input
                      type="number"
                      min={0}
                      max={30}
                      value={grades[student.studentId]?.catMarks || ''}
                      onChange={e => handleInputChange(student.studentId, 'catMarks', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      min={0}
                      max={70}
                      value={grades[student.studentId]?.examMarks || ''}
                      onChange={e => handleInputChange(student.studentId, 'examMarks', e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            onClick={handleSubmit}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Submit Grades
          </button>
        </>
      )}
    </div>
  );
};

export default AssignGradesPage;
