import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRole } from "../../Redux/selectors";
import { changeRole } from "../../Redux/reducers/rootReducer";

import "./RoleSwitch.css";

const RoleSwitch = memo(() => {
  const role = useSelector(getRole);
  const dispatch = useDispatch();

  const handleRoleChange = (event) => {
    dispatch(changeRole(event));
  };

  return (
    <div className="role-switch">
      <input
        key="admin"
        type="radio"
        id="adminRole"
        name="role"
        onChange={() => handleRoleChange("admin")}
        checked={role === "admin"}
      />
      <label htmlFor="adminRole">Admin</label>
      <input
        key="user"
        type="radio"
        id="userRole"
        name="role"
        onChange={() => handleRoleChange("user")}
        checked={role === "user"}
      />
      <label htmlFor="userRole">User</label>
    </div>
  );
});

export default RoleSwitch;
