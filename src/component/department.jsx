import { useState } from "react";

const Department= ()=>{
    const[data,setData] = useState();
    const[dept,setDept] = useState([]);
    async function handleSubmit(e){
        e.preventDefault();
        const formData = new FormData(e.target);
        const payload = {
            deptName : formData.get('deptName'),
            budget : formData.get('budget'),
            location : {
                locationId : Number(formData.get('locationId'))
            }
        }

        const res = await fetch("http://localhost:8081/api/departments",{
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const result = await res.json();

        setData(result);
        console.log(result);
        console.log(data);
    }

    async function handleGetDepartments(e){
        e.preventDefault();
        const res = await fetch("http://localhost:8081/api/departments");
        if (!res.ok) {
            throw new Error(`Server error: ${res.status}`);
        }

        const result = await res.json();
        console.log(result)
        setDept(result);
    }
    async function handleDelete(id) {
        try {
            const res = await fetch(`http://localhost:8081/api/departments/${id}`, {
            method: "DELETE",
            });
            if (!res.ok) {
            throw new Error(`Server error: ${res.status}`);
            }
            // Update local state
            setDept(prev => prev.filter(loc => loc.deptId !== id));
        } catch (err) {
            console.error("Error deleting location:", err);
        }
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <p>Enter Department Name: </p>
                <input type="text" name="deptName" placeholder="deptName"/>
                <p>Enter Department Budget: </p>
                <input type="text" name="budget" placeholder="budget"/>
                <p>Enter Department Location ID: </p>
                <input type="text" name="locationId" placeholder="location id" />
                <br /><br /><button type="submit">Submit</button>
            </form>
            <button onClick={handleGetDepartments} className="btn">Get Departments</button>
            {dept.length > 0 && (
                <div className="location-container">
                    <h3>All Departments:</h3>
                    <ul>
                    {dept.map((key, index) => (
                        <li key={index}>
                        {key.deptId},{key.deptName}, {key.budget}, Location : {key.location?.city}, {key.location?.state}, {key.location?.country} <button className="deleteBtn" onClick={() => handleDelete(key.deptId)}>Delete</button>
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

export default Department;