import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './component/nav';
import Department from "./component/department";
import Location from "./component/location";
import Employee from "./component/employee"
import Home from "./component/home"

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/department" element={<Department/>} />
        <Route path="/location" element={<Location/>}/>
        <Route path="/employee" element={<Employee/>}/>
      </Routes>
    </Router>
  )
}
 
export default App;
 