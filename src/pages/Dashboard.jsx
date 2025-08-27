import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTickets } from "../features/ticketsSlice.js";
import { fetchProjects } from "../features/projectsSlice.js";
import { fetchUsers } from "../features/usersSlice.js";
import TicketList from "../components/TicketList.jsx";
import TicketForm from "../components/TicketForm.jsx";

export default function Dashboard() {
  const dispatch = useDispatch();
  const tickets = useSelector((s) => s.tickets.items);

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchUsers());
    dispatch(fetchTickets());
  }, [dispatch]);

  return (
    <div className="container py-4">
      <h1 className="h3 fw-bold text-dark mb-4">Dashboard</h1>

      <div className="row g-4">
        <div className="col-12 col-lg-6">
          <div className="card shadow-sm border-0 rounded-3">
            <div className="card-body">
              <h2 className="h5 fw-semibold text-secondary mb-3">
                Create New Ticket
              </h2>
              <TicketForm />
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-6">
          <div className="card shadow-sm border-0 rounded-3">
            <div className="card-body">
              <h2 className="h5 fw-semibold text-secondary mb-3">
                Recent Tickets
              </h2>
              {tickets.length > 0 ? (
                <TicketList items={tickets.slice(0, 8)} />
              ) : (
                <p className="text-muted fst-italic">No tickets yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
