import React from "react";

const StudentDetails = ({ students }) => {
  return (
    <div>
      <h3>Students:</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Subject Code</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.student_id}>
              <th scope="row">{student.student_id}</th>
              <td>{student.first_name}</td>
              <td>{student.last_name}</td>
              <td>{student.email}</td>
              <td>{student.subject_code}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentDetails;
