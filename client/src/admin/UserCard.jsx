import { FaEye, FaTrash, FaUserCog } from "react-icons/fa";

const UserCard = ({ user, onView, onRoleToggle, onDelete }) => {
  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>

      <td>
        <div className="action-icons">
          <FaEye className="view-icon" style={{ cursor: "pointer" }} 
            onClick={() => onView(user)}/>
          <FaUserCog className="edit-icon" style={{cursor: "pointer"}}
            onClick={() => {onRoleToggle(user._id)}}  />
          <FaTrash className="delete-icon" style={{cursor: "pointer"}}
          onClick={() =>{onDelete(user._id)}}/>
        </div>
      </td>
    </tr>
  );
};

export default UserCard;

