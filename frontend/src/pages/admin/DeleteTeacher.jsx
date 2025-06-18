import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DeleteTeacher = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://localhost:7260/api/admin/user/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTeacher(response.data);
      } catch (error) {
        console.error('Error fetching teacher:', error);
      }
    };

    fetchTeacher();
  }, [id]);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://localhost:7260/api/admin/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/admin/teacher-list');
    } catch (error) {
      console.error('Error deleting teacher:', error);
    }
  };

  const handleCancel = () => navigate('/admin/teacher-list');

  return (
    <div style={{ padding: '40px', maxWidth: '500px', margin: '0 auto' }}>
      {teacher && (
        <>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
            Confirm Deletion
          </h2>
          <p>Are you sure you want to delete the teacher <strong>{teacher.userName}</strong>?</p>
          <div style={{ marginTop: '20px' }}>
            <button
              onClick={handleDelete}
              style={{ padding: '10px 20px', backgroundColor: 'red', color: 'white', border: 'none', marginRight: '10px' }}
            >
              Delete
            </button>
            <button
              onClick={handleCancel}
              style={{ padding: '10px 20px', backgroundColor: 'gray', color: 'white', border: 'none' }}
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default DeleteTeacher;
