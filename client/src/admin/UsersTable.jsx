import UserCard from "./UserCard";

const UsersTable = ({ users, onView, onRoleToggle, onDelete }) => {
  return (
    <table
      border="1"
      cellPadding="10"
      style={{
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "20px",
      }}
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user) => (
          <UserCard key={user._id} user={user} onView={onView} onRoleToggle={onRoleToggle} onDelete={onDelete}/>
        ))}
      </tbody>
    </table>
  );
};

export default UsersTable;