import { FaEye, FaTrash, FaUserCog } from "react-icons/fa";

const UserCard = ({
  index,
  user,
  onView,
  onRoleToggle,
  onDelete,
}) => {
  return (
    <tr>

      <td>{index + 1}</td>

      <td>
        <div className="user-info">
          <div className="user-avatar">
            {user.name.charAt(0).toUpperCase()}
          </div>

          <span>{user.name}</span>
        </div>
      </td>

      <td>{user.email}</td>

      <td>
        <span
          className={
            user.role === "admin"
              ? "role-badge admin"
              : "role-badge user"
          }
        >
          {user.role}
        </span>
      </td>

      <td>
        <div className="action-icons">

          <FaEye
            className="view-icon"
            onClick={() => onView(user)}
          />

          <FaUserCog
            className="edit-icon"
            onClick={() => onRoleToggle(user._id)}
          />

          <FaTrash
            className="delete-icon"
            onClick={() => onDelete(user._id)}
          />

        </div>
      </td>
    </tr>
  );
};

export default UserCard;