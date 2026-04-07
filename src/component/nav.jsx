import { Link } from "react-router-dom";
import './nav.css'
function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/department">Department</Link></li>
        <li><Link to="/location">Location</Link></li>
        <li><Link to="/employee">Employee</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
