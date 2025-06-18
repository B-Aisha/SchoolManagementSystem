import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DeleteStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://localhost:7260/api/admin/user/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStudent(response.data);
      } catch (error) {
        console.error('Error fetching student:', error);
      }
    };

    fetchStudent();
  }, [id]);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://localhost:7260/api/admin/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/admin/student-list');
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const handleCancel = () => navigate('/admin/student-list');

  return (
    <div style={{ padding: '40px', maxWidth: '500px', margin: '0 auto' }}>
      {student && (
        <>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
            Confirm Deletion
          </h2>
          <p>Are you sure you want to delete the student <strong>{student.userName}</strong>?</p>
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

export default DeleteStudent;
