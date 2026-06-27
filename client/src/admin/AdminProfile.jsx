const AdminProfile = ({ user }) => {
  return (
    <div className="stat-card">
      <h3>Admin Profile</h3>

      <p>
        <strong>Name:</strong> {user.name}
      </p>

      <p>
        <strong>Email:</strong> {user.email}
      </p>

      <p>
        <strong>Role:</strong> {user.role}
      </p>
    </div>
  );
};

export default AdminProfile;