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

    fetchCourse();
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
      navigate('/admin/courses');
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '500px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Edit Course</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '16px' }}>
          <label>Title:</label>
          <input
            name="title"
            value={course.title}
            onChange={handleChange}
            placeholder="Course Title"
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label>Credits:</label>
          <input
            name="credits"
            value={course.credits}
            onChange={handleChange}
            placeholder="Credits"
            type="number"
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label>Teacher ID:</label>
          <input
            name="teacherId"
            value={course.teacherId}
            onChange={handleChange}
            placeholder="Teacher ID"
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc' }}
          />
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            padding: '10px 16px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Update Course
        </button>
      </form>
    </div>
  );
};

export default EditCourse;
