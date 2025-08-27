import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTickets, setFilter } from "../features/ticketsSlice.js";
import SearchBar from "../components/SearchBar.jsx";
import TicketList from "../components/TicketList.jsx";

export default function TicketsPage(){
  const dispatch = useDispatch();
  const tickets = useSelector(s => s.tickets.items);
  const filter = useSelector(s => s.tickets.filter);

  useEffect(()=>{ dispatch(fetchTickets(filter)); }, [dispatch, filter]);

  return (
    <div className="container">
      <SearchBar onSearch={(q) => dispatch(setFilter({ q }))} />
      <div className="mt-3">
        <TicketList items={tickets} />
      </div>
    </div>
  );
}
