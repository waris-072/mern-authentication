import UserCard from "./UserCard";

const UsersTable = ({ users, onView, onRoleToggle, onDelete }) => {
  return (
    <div className="users-table-container">
      <table className="users-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th className="actions-column">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user, index) => (
            <UserCard
              key={user._id}
              index={index}
              user={user}
              onView={onView}
              onRoleToggle={onRoleToggle}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;