import { useState } from "react";
import './style.css'

const Location = ()=>{
    const [data,setData] = useState();
    const [location,setLocation] = useState([]);
    async function handleSubmit(e){
        e.preventDefault();
        const formData = new FormData(e.target);
        const payload = {
            city: formData.get("city"),
            state: formData.get("state"),
            country: formData.get("country")
        }

        try{
            const res = await fetch("http://localhost:8081/api/locations",{
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
        catch(err){
            console.error("Error submitting location:", err);
            setData({ error: err.message });
        }
    }

    async function handleGetLocations(e){
        e.preventDefault();
        const res = await fetch("http://localhost:8081/api/locations");
        if (!res.ok) {
            throw new Error(`Server error: ${res.status}`);
        }

        const result = await res.json();
        setLocation(result);
    }

    async function handleDelete(id) {
        try {
            const res = await fetch(`http://localhost:8081/api/locations/${id}`, {
            method: "DELETE",
            });
            if (!res.ok) {
            throw new Error(`Server error: ${res.status}`);
            }
            // Update local state
            setLocation(prev => prev.filter(loc => loc.locationId !== id));
        } catch (err) {
            console.error("Error deleting location:", err);
        }
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <p>Enter City: </p>
                <input type="text" name="city" placeholder="city"/>
                <p>Enter State: </p>
                <input type="text" name="state" placeholder="state"/>
                <p>Enter Country: </p>
                <input type="text" name="country" placeholder="country"/>
                <br /><br /><button type="submit">Submit</button>
            </form>

            <button onClick={handleGetLocations} className="btn">Get Locations</button>
            {location.length > 0 && (
            <div className="location-container">
                <h3>All Locations:</h3>
                <ul>
                {location.map((key, index) => (
                    <li key={index}>
                    {key.locationId}, {key.city}, {key.state}, {key.country} <button className="deleteBtn" onClick={() => handleDelete(key.locationId)}>Delete</button>
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

export default Location;