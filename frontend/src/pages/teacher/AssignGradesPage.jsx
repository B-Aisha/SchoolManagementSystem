import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const AssignGradesPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [successMessage, setSuccessMessage] = useState('');


  const initialCourseId = location.state?.courseId || '';
  const initialCourseTitle = location.state?.courseTitle || '';

  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(initialCourseId);
  const [selectedCourseTitle, setSelectedCourseTitle] = useState(initialCourseTitle);
  const [students, setStudents] = useState([]);
  const [grades, setGrades] = useState({});

  const [existingGrades, setExistingGrades] = useState({});


  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem('token');
      const teacherId = localStorage.getItem('teacherId');
      try {
        const response = await axios.get(
          `https://localhost:7260/api/teacher/courses/${teacherId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCourses(response.data);
      } catch (error) {
        console.error('Failed to fetch courses', error);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
  if (!selectedCourseId) return;

  const fetchStudentsAndGrades = async () => {
    const token = localStorage.getItem('token');

    const selected = courses.find((c) => c.courseId === selectedCourseId);
    if (selected) {
      setSelectedCourseTitle(selected.title);
    }

    try {
      const [studentsResponse, gradesResponse] = await Promise.all([
        axios.get(`https://localhost:7260/api/grade/course/${selectedCourseId}/students`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`https://localhost:7260/api/grade/course/${selectedCourseId}/grades`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      const studentList = studentsResponse.data;
      const gradeMap = {};

      gradesResponse.data.forEach(grade => {
        gradeMap[grade.studentId] = {
          catMarks: grade.catMarks.toString(),
          examMarks: grade.examMarks.toString()
        };
      });

      setStudents(studentList);
      setExistingGrades(gradeMap);
      setGrades(gradeMap); // Pre-fill the form with existing grades

    } catch (error) {
      console.error('Failed to fetch students or grades', error);
    }
  };

  fetchStudentsAndGrades();
}, [selectedCourseId, courses]);


  const handleInputChange = (studentId, field, value) => {
    setGrades((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async () => {
  const token = localStorage.getItem('token');
  const payload = Object.entries(grades).map(([studentId, values]) => ({
    studentId,
    courseId: selectedCourseId,
    catMarks: parseInt(values.catMarks),
    examMarks: parseInt(values.examMarks),
  }));

  try {
    await axios.post('https://localhost:7260/api/grade/assign', payload, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setSuccessMessage('Grades submitted successfully! Redirecting...');

    // Delay 2 seconds then redirect and pass course info back
    setTimeout(() => {
      setSuccessMessage('');
      navigate('/teacher/view-grades', {
        state: {
          courseId: selectedCourseId,
          courseTitle: selectedCourseTitle
        }
      });
    }, 2000);
    
  } catch (error) {
    console.error('Failed to submit grades', error);
    alert('Failed to submit grades.');
  }
};

  return (
    <div style={{ padding: '30px', maxWidth: '1000px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '28px', marginBottom: '20px', color: '#333' }}>📊 Assign Grades</h2>
        {successMessage && (
      <div style={{
        backgroundColor: '#d4edda',
        color: '#155724',
        padding: '10px 15px',
        borderRadius: '5px',
        marginBottom: '20px',
        border: '1px solid #c3e6cb'
      }}>
        {successMessage}
      </div>
    )}

      <div
        style={{
          marginBottom: '30px',
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9'
        }}
      >
        <label style={{ fontWeight: 'bold', fontSize: '16px' }}>
          Select Course:
        </label>
        <select
          value={selectedCourseId}
          onChange={(e) => setSelectedCourseId(e.target.value)}
          disabled={initialCourseId !== ''}
          style={{
            padding: '10px',
            width: '300px',
            marginLeft: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        >
          <option value=''>-- Select Course --</option>
          {courses.map((course) => (
            <option key={course.courseId} value={course.courseId}>
              {course.title}
            </option>
          ))}
        </select>
      </div>

      {selectedCourseId && (
        <>
          <h3 style={{ marginBottom: '15px', color: '#333' }}>
            Course: <span style={{ fontWeight: 'normal' }}>{selectedCourseTitle}</span>
          </h3>
          {students.length > 0 ? (
            <>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f5f5f5' }}>
                    <th style={thStyle}>Admission No</th>
                    <th style={thStyle}>Full Name</th>
                    <th style={thStyle}>CAT Marks</th>
                    <th style={thStyle}>Exam Marks</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.studentId}>
                      <td style={tdStyle}>{student.admNo}</td>
                      <td style={tdStyle}>{student.fullName}</td>
                      <td style={tdStyle}>
                        <input
                          type="number"
                          min={0}
                          max={30}
                          value={grades[student.studentId]?.catMarks || ''}
                          onChange={(e) =>
                            handleInputChange(student.studentId, 'catMarks', e.target.value)
                          }
                          style={inputStyle}
                        />
                      </td>
                      <td style={tdStyle}>
                        <input
                          type="number"
                          min={0}
                          max={70}
                          value={grades[student.studentId]?.examMarks || ''}
                          onChange={(e) =>
                            handleInputChange(student.studentId, 'examMarks', e.target.value)
                          }
                          style={inputStyle}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <button onClick={handleSubmit} style={submitBtnStyle}>
                Submit Grades
              </button>
            </>
          ) : (
            <p>No students enrolled in this course.</p>
          )}
          <button
            onClick={() => navigate('/teacher/view-grades')}
            style={backBtnStyle}
          >
            ← Back
          </button>
        </>
      )}
    </div>
  );
};

const thStyle = {
  padding: '10px',
  textAlign: 'left',
  borderBottom: '2px solid #ccc',
};

const tdStyle = {
  padding: '10px',
  borderBottom: '1px solid #ddd',
};

const inputStyle = {
  padding: '6px',
  width: '100px',
  borderRadius: '4px',
  border: '1px solid #ccc',
};

const submitBtnStyle = {
  marginTop: '20px',
  padding: '10px 20px',
  backgroundColor: '#28a745',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const backBtnStyle = {
  marginTop: '20px',
  marginLeft: '10px',
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default AssignGradesPage;
