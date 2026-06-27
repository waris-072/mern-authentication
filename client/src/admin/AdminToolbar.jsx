import { FaBroom } from "react-icons/fa";

const AdminToolbar = ({
  searchTerm,
  setSearchTerm,
  roleFilter,
  setRoleFilter,
  sortOrder,
  setSortOrder,
  clearFilters,
}) => {
  return (
    <div className="admin-toolbar">
        {/* search bar */}
      <input
        type="text"
        placeholder="Search by name or email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

        {/* users  filter */}
      <select
        value={roleFilter}
        onChange={(e) => setRoleFilter(e.target.value)}
      >
        <option value="all">All Users</option>
        <option value="admin">Admins</option>
        <option value="user">Users</option>
      </select>

      {/* sort filter */}
      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
      </select>

      {/* clear filters */}

      <button onClick={clearFilters} className="clear-btn">
        <FaBroom />
        <span>Clear Filters</span>
      </button>
    </div>
  );
};

export default AdminToolbar;