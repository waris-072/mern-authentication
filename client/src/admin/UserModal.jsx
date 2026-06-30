import { FaTimes, FaUserCircle } from "react-icons/fa";

const UserModal = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">

        <div className="modal-header">
          <h2>User Details</h2>

          <FaTimes
            className="close-icon"
            onClick={onClose}
          />
        </div>

        <div className="modal-body">

          <div className="modal-avatar">
            <FaUserCircle />
            <h3>{user.name}</h3>
          </div>

          <div className="modal-info">

            <div className="info-row">
              <span>ID</span>
              <p>{user._id}</p>
            </div>

            <div className="info-row">
              <span>Email</span>
              <p>{user.email}</p>
            </div>

            <div className="info-row">
              <span>Role</span>

              <span
                className={
                  user.role === "admin"
                    ? "role-badge admin"
                    : "role-badge user"
                }
              >
                {user.role}
              </span>
            </div>

            <div className="info-row">
              <span>Created</span>
              <p>
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="info-row">
              <span>Updated</span>
              <p>
                {new Date(user.updatedAt).toLocaleString()}
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default UserModal;