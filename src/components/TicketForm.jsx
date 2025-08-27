import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTicket } from "../features/ticketsSlice.js";

export default function TicketForm() {
  const dispatch = useDispatch();
  const projects = useSelector((s) => s.projects.items);
  const users = useSelector((s) => s.users.items);

  const [form, setForm] = useState({
    title: "",
    description: "",
    project: "",
    assignee: "",
    priority: "medium",
  });

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    dispatch(createTicket(form));
    setForm({
      title: "",
      description: "",
      project: "",
      assignee: "",
      priority: "medium",
    });
  };

  return (
    <form className="card p-4 shadow-sm" onSubmit={submit}>
      <h3 className="mb-3">Create Ticket</h3>

      <div className="row g-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={onChange}
            required
          />
        </div>

        <div className="col-md-6">
          <select
            className="form-select"
            name="project"
            value={form.project}
            onChange={onChange}
            required
          >
            <option value="">Select project</option>
            {projects.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name} ({p.key})
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6">
          <select
            className="form-select"
            name="assignee"
            value={form.assignee}
            onChange={onChange}
          >
            <option value="">Unassigned</option>
            {users.map((u) => (
              <option key={u._id} value={u._id}>
                {u.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6">
          <select
            className="form-select"
            name="priority"
            value={form.priority}
            onChange={onChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="col-12">
          <textarea
            className="form-control"
            rows="4"
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={onChange}
          ></textarea>
        </div>
      </div>

      <div className="mt-4">
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </div>
    </form>
  );
}
