import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects, createProject, updateProject, deleteProject } from "../features/projectsSlice.js";

export default function ProjectsPage() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((s) => s.projects);
  const user = useSelector((s) => s.auth.user);
  const [form, setForm] = useState({ name: "", key: "", description: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => { dispatch(fetchProjects()); }, [dispatch]);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (editingId) {
      dispatch(updateProject({ id: editingId, updates: form }));
      setEditingId(null);
    } else {
      dispatch(createProject(form));
    }
    setForm({ name: "", key: "", description: "" });
  };

  const startEdit = (p) => { setEditingId(p._id); setForm({ name: p.name, key: p.key, description: p.description || "" }); };
  const remove = (id) => { if (confirm("Delete project?")) dispatch(deleteProject(id)); };

  const canAdmin = user?.role === "admin" || user?.role === "manager";

  return (
    <div className="container">
      <div className="d-flex align-items-center justify-content-between my-3">
        <h3 className="m-0">Projects</h3>
      </div>

      {canAdmin && (
        <div className="card mb-4 p-3">
          <form onSubmit={submit}>
            <div className="row g-2">
              <div className="col-md-3">
                <input className="form-control" name="name" placeholder="Name" value={form.name} onChange={onChange} required />
              </div>
              <div className="col-md-2">
                <input className="form-control" name="key" placeholder="KEY" value={form.key} onChange={onChange} required />
              </div>
              <div className="col-md-5">
                <input className="form-control" name="description" placeholder="Description" value={form.description} onChange={onChange} />
              </div>
              <div className="col-md-2 d-grid">
                <button className="btn btn-primary" type="submit">{editingId ? "Update" : "Create"}</button>
              </div>
            </div>
          </form>
        </div>
      )}

      {status === "loading" && <div className="alert alert-info">Loading projects...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card">
        <table className="table mb-0">
          <thead>
            <tr><th>Name</th><th>Key</th><th>Description</th>{canAdmin && <th style={{width:160}}>Actions</th>}</tr>
          </thead>
          <tbody>
            {items.map(p => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td><span className="badge bg-secondary">{p.key}</span></td>
                <td>{p.description}</td>
                {canAdmin && (
                  <td>
                    <div className="btn-group btn-group-sm">
                      <button className="btn btn-outline-primary" onClick={() => startEdit(p)}>Edit</button>
                      <button className="btn btn-outline-danger" onClick={() => remove(p._id)}>Delete</button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {items.length === 0 && status === "succeeded" && <div className="p-3 text-muted">No projects yet.</div>}
      </div>
    </div>
  );
}
