import { useDispatch, useSelector } from "react-redux";
import { setFilter, fetchTickets } from "../features/ticketsSlice.js";

export default function SearchBar() {
  const dispatch = useDispatch();
  const filter = useSelector((s) => s.tickets.filter);

  const onChange = (e) =>
    dispatch(setFilter({ [e.target.name]: e.target.value }));

  const run = () => dispatch(fetchTickets(filter));

  return (
    <div className="card p-3 shadow-sm mb-3">
      <div className="row g-2 align-items-center">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search title..."
            name="q"
            value={filter.q}
            onChange={onChange}
          />
        </div>

        <div className="col-md-2">
          <select
            className="form-select"
            name="status"
            value={filter.status}
            onChange={onChange}
          >
            <option value="">Status (any)</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <div className="col-md-2">
          <select
            className="form-select"
            name="priority"
            value={filter.priority}
            onChange={onChange}
          >
            <option value="">Priority (any)</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="col-md-2">
          <button className="btn btn-primary w-100" onClick={run}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
