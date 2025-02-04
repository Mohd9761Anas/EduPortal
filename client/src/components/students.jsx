import React, { useState } from "react";
import axios from "axios";
import UserDetails from "./user";
import { Link } from "react-router-dom";

const Students = () => {
  const [studentId, setStudentId] = useState("");
  const [studentDetails, setStudentDetails] = useState(null);
  const [error, setError] = useState("");

  const fetchStudentDetails = async () => {
    try {
      const response = await axios.get(`https://eduportal-rjw1.onrender.com/students/${studentId}`);
      // const response = await axios.get(`http://localhost:5000/students/${studentId}`);
      setStudentDetails(response.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch student details. Please check the student ID and try again.");
      setStudentDetails(null);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Student Details</h1>

      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Enter Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
      </div>
      <button className="btn btn-primary mb-3" onClick={fetchStudentDetails}>
        Fetch Student Details
      </button>
      <p>
        Are you a teacher? <Link to="/teacher">Teacher</Link>
      </p>
      {error && <div className="alert alert-danger">{error}</div>}
      {studentDetails && (
        <div>
          <h2>Details:</h2>
          <p><strong>Student ID:</strong> {studentDetails.student_id}</p>
          <UserDetails user={studentDetails} />
          <h3>Enrolled Subjects:</h3>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Subject Code</th>
                <th>Subject Name</th>
              </tr>
            </thead>
            <tbody>
              {studentDetails.subjects.map(subject => (
                <tr key={subject.subject_code}>
                  <td>{subject.subject_code}</td>
                  <td>{subject.subject_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Students;
