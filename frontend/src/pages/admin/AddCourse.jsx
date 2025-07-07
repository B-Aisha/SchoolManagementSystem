import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AddCourse = () => {
  const [course, setCourse] = useState({
    title: '',
    credits: '',
    teacherId: ''
  });
  const navigate = useNavigate();

  const [teachers, setTeachers] = useState([]);

  const [message, setMessage] = useState('');

    useEffect(() => {
      const fetchTeachers = async () => {
        const token = localStorage.getItem('token');
        try {
          const response = await axios.get('https://localhost:7260/api/admin/all-teachers', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setTeachers(response.data);
        } catch (error) {
          console.error('Failed to fetch teachers:', error);
        }
      };
      fetchTeachers();
    }, []);

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      await axios.post('https://localhost:7260/api/course/create', course, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage('Course added successfully!');
      //setCourse({ title: '', credits: '', teacherId: '' }); // clear form
      setTimeout(() => navigate('/admin/courses'), 1500);  // Redirect after 1.5 seconds
    } catch (error) {
      console.error('Error adding course:', error);
      setMessage('Failed to add course.');
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '500px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Add Course</h2>
      <form onSubmit={handleSubmit}>
        <div style={formGroupStyle}>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={course.title}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </div>
        <div style={formGroupStyle}>
          <label>Credits</label>
          <input
            type="number"
            name="credits"
            value={course.credits}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </div>
        <div style={formGroupStyle}>
          <label>Teacher</label>
          <select
            name="teacherId"
            value={course.teacherId}
            onChange={handleChange}
            style={inputStyle}
            required
          >
            <option value="">Select Teacher</option>
            {teachers.map((teacher) => (
              <option key={teacher.teacherId} value={teacher.teacherId}>
                {teacher.fullName} ({teacher.email})
              </option>
            ))}
          </select>
        </div>
        <button type="submit" style={buttonStyle}>Add Course</button>
      </form>
      {message && <p style={{ marginTop: '20px' }}>{message}</p>}
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

export default AddCourse;
