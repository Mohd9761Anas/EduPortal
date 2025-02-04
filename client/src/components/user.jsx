import React from "react";

const UserDetails = ({ user }) => {
  return (
    <div>
      
      <p><strong>First Name:</strong> {user.first_name}</p>
      <p><strong>Last Name:</strong> {user.last_name}</p>
      <p><strong>Date of Birth:</strong> {user.date_of_birth}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
};

export default UserDetails;
