import PriorityBadge from "./PriorityBadge.jsx";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteTicket, updateTicket } from "../features/ticketsSlice.js";

export default function TicketList({ items }) {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user);

  const onDelete = (id) => {
    if (confirm("Delete ticket?")) dispatch(deleteTicket(id));
  };

  const changeStatus = (t, status) => {
    dispatch(updateTicket({ id: t._id, updates: { status } }));
  };

  const canModify = (t) =>
    user &&
    (String(user._id) === String(t.assignee?._id) ||
      String(user._id) === String(t.reporter?._id) ||
      user.role === "admin" ||
      user.role === "manager");

  return (
    <div className="card">
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Project</th>
            <th>Assignee</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((t) => (
            <tr key={t._id}>
              <td>
                <Link to={"/tickets/" + t._id}>{t.title}</Link>
              </td>
              <td>{t.project?.key}</td>
              <td>{t.assignee?.name || "—"}</td>
              <td>
                <span className={"status " + t.status}>
                  {t.status.replace("", " ")}
                </span>
              </td>
              <td>
                <PriorityBadge p={t.priority} />
              </td>
              <td>
                <div className="btn-group btn-group-sm flex-wrap">
                  {user &&
                    (user.role === "admin" || user.role === "manager") && (
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => onDelete(t._id)}
                      >
                        Delete
                      </button>
                    )}

                  {/* {canModify(t) && (
                    <>
                      {t.status !== "resolved" && (
                        <button
                          className="btn btn-outline-success"
                          onClick={() => changeStatus(t, "resolved")}
                        >
                          Resolve
                        </button>
                      )}
                      {t.status !== "closed" && (
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() => changeStatus(t, "closed")}
                        >
                          Close
                        </button>
                      )}
                      {t.status !== "fixed" && (
                        <button
                          className="btn btn-outline-primary"
                          onClick={() => changeStatus(t, "fixed")}
                        >
                          Fixed
                        </button>
                      )}
                      {t.status === "open" && (
                        <button
                          className="btn btn-outline-warning"
                          onClick={() => changeStatus(t, "in_progress")}
                        >
                          Start
                        </button>
                      )}
                    </>
                  )} */}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
