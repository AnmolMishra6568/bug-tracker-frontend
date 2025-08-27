import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api.js";
import { useDispatch, useSelector } from "react-redux";
import { updateTicket } from "../features/ticketsSlice.js";

export default function TicketDetail() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const users = useSelector((s) => s.users.items);

  useEffect(() => {
    api.get(`/api/tickets/${id}`).then((r) => setTicket(r.data));
  }, [id]);

  if (!ticket)
    return (
      <div className="container my-4">
        <div className="text-center text-muted">Loading...</div>
      </div>
    );

  const onUpdate = (field, value) => {
    dispatch(updateTicket({ id, updates: { [field]: value } })).then(
      ({ payload }) => setTicket(payload)
    );
  };

  const addComment = (e) => {
    e.preventDefault();
    api
      .post(`/api/tickets/${id}/comments`, { body: comment })
      .then(() => {
        setComment("");
        return api.get(`/api/tickets/${id}`);
      })
      .then((r) => setTicket(r.data));
  };

  return (
    <div className="container my-4">
      <div className="row g-4">
        {/* Ticket details............. */}
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="card-title">{ticket.title}</h2>
              <p className="text-muted">
                {ticket.description || "No description"}
              </p>

              <div className="row gy-3">
                <div className="col-md-6">
                  <label className="form-label">Status</label>
                  <select
                    className="form-select"
                    value={ticket.status}
                    onChange={(e) => onUpdate("status", e.target.value)}
                  >
                    <option value="open">Open</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label">Priority</label>
                  <select
                    className="form-select"
                    value={ticket.priority}
                    onChange={(e) => onUpdate("priority", e.target.value)}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div className="col-12">
                  <label className="form-label">Assignee</label>
                  <select
                    className="form-select"
                    value={ticket.assignee?._id || ""}
                    onChange={(e) =>
                      onUpdate("assignee", e.target.value || null)
                    }
                  >
                    <option value="">Unassigned</option>
                    {users.map((u) => (
                      <option key={u._id} value={u._id}>
                        {u.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comments */}
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="card-title">Comments</h3>

              <form onSubmit={addComment} className="mb-3">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Add a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button type="submit" className="btn btn-primary w-100">
                  Post
                </button>
              </form>

              <div>
                {ticket.comments?.slice().reverse().map((c, i) => (
                  <div key={i} className="mb-3 p-2 border rounded bg-light">
                    <div className="text-muted small">
                      {new Date(c.createdAt).toLocaleString()}
                    </div>
                    <div>{c.body}</div>
                  </div>
                ))}
                {ticket.comments?.length === 0 && (
                  <p className="text-muted">No comments yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
