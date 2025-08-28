// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../features/authSlice.js";

// export default function Navbar() {
//   const dispatch = useDispatch();
//   const user = useSelector((s) => s.auth.user);

//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
//       <div className="container-fluid">
//         <Link className="navbar-brand" to="/">
//           BugTracker
//         </Link>

//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarNav"
//           aria-controls="navbarNav"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         {/* Collapsible Menu */}
//         <div className="collapse navbar-collapse" id="navbarNav">

//           <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//             <li className="nav-item">
//               <Link className="nav-link" to="/">
//                 Dashboard
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/tickets">
//                 Tickets
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/projects">
//                 Projects
//               </Link>
//             </li>
//           </ul>

//           <ul className="navbar-nav ms-auto">
//             {user ? (
//               <li className="nav-item">
//                 <button
//                   className="btn btn-outline-light"
//                   onClick={() => dispatch(logout())}
//                 >
//                   Logout
//                 </button>
//               </li>
//             ) : (
//               <li className="nav-item">
//                 <Link className="btn btn-outline-light" to="/login">
//                   Login
//                 </Link>
//               </li>
//             )}
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }



import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authSlice.js";

export default function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container-fluid">
        {/* Brand */}
        <Link className="navbar-brand fw-bold" to="/">
          BugTracker
        </Link>

        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Menu */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Left Nav Links */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tickets">
                Tickets
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/projects">
                Projects
              </Link>
            </li>
          </ul>

          {/* Right Auth Section */}
          <ul className="navbar-nav ms-auto">
            {user ? (
              <li className="nav-item">
                <button
                  className="btn btn-outline-light w-100 w-lg-auto mt-2 mt-lg-0"
                  onClick={() => dispatch(logout())}
                >
                  Logout
                </button>
              </li>
            ) : (
              <li className="nav-item">
                <Link
                  className="btn btn-outline-light w-100 w-lg-auto mt-2 mt-lg-0"
                  to="/login"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
