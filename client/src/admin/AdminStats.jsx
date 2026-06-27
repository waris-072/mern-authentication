const AdminStats = ({ users }) => {
  const adminCount = users.filter((user) => user.role === "admin").length;
  const userCount = users.filter((user) => user.role === "user").length;

  return (
    <>
      <div className="stat-card">
        <h3>Total Users</h3>
        <p>{users.length}</p>
      </div>

      <div className="stat-card">
        <h3>Admins</h3>
        <p>{adminCount}</p>
      </div>

      <div className="stat-card">
        <h3>Users</h3>
        <p>{userCount}</p>
      </div>
    </>
  );
};

export default AdminStats;