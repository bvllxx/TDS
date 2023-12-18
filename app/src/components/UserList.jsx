import React, { useState } from "react";

const UserList = ({ users, handleUserSelect }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);

  const toggleUserSelection = (userId) => {
    const updatedUsers = selectedUsers.includes(userId)
      ? selectedUsers.filter((id) => id !== userId)
      : [...selectedUsers, userId];

    setSelectedUsers(updatedUsers);
    handleUserSelect(updatedUsers); // Enviar los usuarios seleccionados al componente padre
  };

  return (
    <div>
      <p>Seleccionar Usuarios</p>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <label>
              <input
                type="checkbox"
                checked={selectedUsers.includes(user.id)}
                onChange={() => toggleUserSelection(user.id)}
              />
              {user.first_name}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
