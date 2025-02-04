import React, { useState } from "react";
import axios from "axios";
import UserDetails from "./user";
import { Link } from "react-router-dom";
import StudentDetails from "./studentDetails";
const Teachers = () => {
  const [teacherId, setTeacherId] = useState("");
  const [teacherDetails, setTeacherDetails] = useState(null);
  const [studentId, setStudentId] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const fetchTeacherDetails = async () => {
    try {
      const response = await axios.get(`https://eduportal-rjw1.onrender.com/teachers/${teacherId}`);
      setTeacherDetails(response.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch teacher details. Please check the teacher ID and try again.");
      setTeacherDetails(null);
    }
  };

  const assignSubject = async () => {
    try {
      const response = await axios.post("https://eduportal-rjw1.onrender.com/assign-subject", {
        teacher_id: teacherId,
        student_id: studentId,
        subject_code: subjectCode
      });
      setMessage(response.data.message);
      setError("");
    } catch (err) {
      setError("Failed to assign subject. Please check the inputs and try again.");
      setMessage("");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Teacher Details</h1>

      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Enter Teacher ID"
          value={teacherId}
          onChange={(e) => setTeacherId(e.target.value)}
        />
      </div>
      <button className="btn btn-primary mb-3 butt" onClick={fetchTeacherDetails}>
        Fetch Teacher Details
      </button>
      {error && <div className="alert alert-danger">{error}</div>}
      <p>
        Are you student? <Link to="/">Student</Link>
      </p>
      {teacherDetails && (
        <div>
          <h2>Details:</h2>
          <p><strong>Teacher ID:</strong> {teacherDetails.teacher_id}</p>
          <UserDetails user={teacherDetails} />
          <h3>Subjects Taught:</h3>
          <ul className="list-group mb-3">
            {teacherDetails.subjects.map(subject => (
              <li className="list-group-item" key={subject.subject_code}>
                {subject.subject_code}: {subject.subject_name}
              </li>
            ))}
          </ul>
          <StudentDetails students={teacherDetails.students} />
          <h3>Assign Subject to Student</h3>
          <div className="form-group">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Enter Student ID"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Enter Subject Code"
              value={subjectCode}
              onChange={(e) => setSubjectCode(e.target.value)}
            />
          </div>
          <button className="btn btn-success mb-3" onClick={assignSubject}>
            Assign Subject
          </button>
          {message && <div className="alert alert-success">{message}</div>}
        </div>
      )}
    </div>
  );
};

export default Teachers;
