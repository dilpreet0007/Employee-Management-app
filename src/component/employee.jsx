import { useState } from "react";

const Employee = ()=>{
    const[data,setData] = useState();
    const[emp,setEmp] = useState([]);
    async function handleSubmit(e){
        e.preventDefault();
        const formData = new FormData(e.target);
        const payload = {
            empName: formData.get("empName"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            salary: Number(formData.get("salary")),
            hireDate: formData.get("hireDate"), // must be YYYY-MM-DD for LocalDate
            status: formData.get("status"),
            department: {
                deptId: Number(formData.get("deptId"))
            }
        };

        const res = await fetch("http://localhost:8081/api/employees",{
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        
        if (!res.ok) {
            throw new Error(`Server error: ${res.status}`);
        }
        const result = await res.json();
        setData(result);
    }

    async function handleGetEmployees(e){
        e.preventDefault();
        const res = await fetch("http://localhost:8081/api/employees");
        if (!res.ok) {
            throw new Error(`Server error: ${res.status}`);
        }

        const result = await res.json();
        setEmp(result);
        console.log(result)
    }

    async function handleDelete(id) {
        try {
            const res = await fetch(`http://localhost:8081/api/employees/${id}`, {
            method: "DELETE",
            });
            if (!res.ok) {
            throw new Error(`Server error: ${res.status}`);
            }
            // Update local state
            setEmp(prev => prev.filter(loc => loc.empId !== id));
        } catch (err) {
            console.error("Error deleting location:", err);
        }
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <p>Enter Employee Name: </p>
                <input type="text" name="empName" placeholder="Name" />
                
                <p>Enter Employee Email: </p>
                <input type="text" name="email" placeholder="Email" />
                
                <p>Enter Employee Phone Number: </p>
                <input type="text" name="phone" placeholder="Phone Number" />
                
                <p>Enter Employee Salary: </p>
                <input type="text" name="salary" placeholder="Salary" />
                
                <p>Enter Employee HireDate: </p>
                <input type="text" name="hireDate" placeholder="HireDate" />
                
                <p>Enter Employee Status: </p>
                <input type="text" name="status" placeholder="Status" />

                <p>Enter Employee Department Id: </p>
                <input type="text" name="deptId" placeholder="Department Id" />
                
                <br /><br />
                <button type="submit">Submit</button>
            </form>

            
            <button className="btn" onClick={handleGetEmployees}>Get Employess</button>
            {emp.length > 0 && (
                <div className="location-container">
                    <h3>All Employees:</h3>
                    <ul>
                    {emp.map((key, index) => (
                        <li key={index}>
                        {key.empId}, {key.empName},{key.email}, {key.salary},{key.hireDate},{key.status} <br />
                        Department: {key.department?.deptName} <br />
                        Location : {key.department?.location?.city}, {key.department?.location?.state}, {key.department?.location?.country} <br />
                        <button className="deleteBtn" onClick={() => handleDelete(key.empId)}>Delete</button>
                        </li>
                    ))}
                    </ul>
                </div>
            )}
            {data && (
                <div className="location-container">
                <h3>Server Response:</h3>
                <pre>{JSON.stringify(data, null, 2)}</pre>
                </div>
            )}
        </div>
    )
}

export default Employee;