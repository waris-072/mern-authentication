import { FaTimes } from "react-icons/fa";

const UserModal = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">

        <div className="modal-header">
            <h2>User Details</h2>
            <FaTimes className="close-icon" onClick={onClose} />
        </div>

        <p><strong>ID:</strong> {user._id}</p>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>Created:</strong>{" "}
          {new Date(user.createdAt).toLocaleDateString()}
        </p>
        <p><strong>Updated:</strong>{" "}
          {new Date(user.updatedAt).toLocaleString()}
        </p>

      </div>
    </div>
  );
};

export default UserModal;