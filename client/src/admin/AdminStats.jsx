const AdminStats = ({ users }) => {
  const adminCount = users.filter((user) => user.role === "admin").length;
  const userCount = users.filter((user) => user.role === "user").length;

  return (
    <section className="admin-stats">
      <div className="stats-container">

        <div className="stat-card">
          <h3 className="stat-title">Total Users</h3>
          <p className="stat-number">{users.length}</p>
        </div>

        <div className="stat-card">
          <h3 className="stat-title">Admins</h3>
          <p className="stat-number">{adminCount}</p>
        </div>

        <div className="stat-card">
          <h3 className="stat-title">Users</h3>
          <p className="stat-number">{userCount}</p>
        </div>

      </div>
    </section>
  );
};

export default AdminStats;