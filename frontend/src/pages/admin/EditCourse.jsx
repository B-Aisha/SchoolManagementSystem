import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState({
    title: '',
    credits: '',
    teacherId: ''
  });

  const [teachers, setTeachers] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://localhost:7260/api/course/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCourse(response.data);
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    };

    const fetchTeachers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://localhost:7260/api/admin/all-teachers', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTeachers(response.data);
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };

    fetchCourse();
    fetchTeachers();
  }, [id]);

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`https://localhost:7260/api/course/update/${id}`, course, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

       setMessage('Course updated successfully!');
      setTimeout(() => navigate('/admin/courses'), 1500);  // Redirect after 1.5 seconds
    
    } catch (error) {
      console.error('Error updating course:', error);
      setMessage('Failed to update course.');
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '500px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Edit Course</h2>

      <form onSubmit={handleSubmit}>
        <div style={formGroupStyle}>
          <label>Title:</label>
          <input
            name="title"
            value={course.title}
            onChange={handleChange}
            placeholder="Course Title"
            style={inputStyle}
            required
          />
        </div>

        <div style={formGroupStyle}>
          <label>Credits:</label>
          <input
            name="credits"
            value={course.credits}
            onChange={handleChange}
            placeholder="Credits"
            type="number"
            style={inputStyle}
            required
          />
        </div>

        <div style={formGroupStyle}>
          <label>Teacher:</label>
          <select
            name="teacherId"
            value={course.teacherId}
            onChange={handleChange}
            style={inputStyle}
            required
          >
            <option value="">-- Select Teacher --</option>
            {teachers.map(teacher => (
              <option key={teacher.teacherId} value={teacher.teacherId}>
                {teacher.fullName}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" style={buttonStyle}>Update Course</button>

        {message && <p style={{ marginTop: '15px' }}>{message}</p>}
      </form>
    </div>
  );
};

const formGroupStyle = {
  marginBottom: '15px',
  display: 'flex',
  flexDirection: 'column',
};

const inputStyle = {
  padding: '10px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  marginTop: '5px'
};

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};
  
export default EditCourse;
