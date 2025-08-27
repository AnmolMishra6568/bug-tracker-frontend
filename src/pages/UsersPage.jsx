import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../features/usersSlice.js";

export default function UsersPage(){
  const dispatch = useDispatch();
  const users = useSelector(s => s.users.items);
  useEffect(()=>{ dispatch(fetchUsers()); }, [dispatch]);

  return (
    <div className="container">
      <div className="card">
        <h3>Users</h3>
        <table className="table">
          <thead><tr><th>Name</th><th>Email</th><th>Role</th></tr></thead>
          <tbody>{users.map(u => <tr key={u._id}><td>{u.name}</td><td>{u.email}</td><td>{u.role}</td></tr>)}</tbody>
        </table>
      </div>
    </div>
  );
}
