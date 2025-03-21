import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css"

function Profile() {
    const navigate = useNavigate();
    const toEdit = () => {
        if (userData && userData[0]) {
            navigate("/edit/" + userData[0].id);
        }
    }
    const [userData, setUserData] = useState<{ id: string; username: string; rate: number; favorite: string }[] | null>(null);
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const res = await fetch("http://localhost:4000/users", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });
                if (res.ok) {
                    const data = await res.json();
                    setUserData(data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchdata();
    }, [])
  return (
      <div className="userinfosection">
        <h1>Your Information</h1>
        <div id="userinfo">
        {userData ? (
                    <>
                        <p>UserName:<br /> {userData[0].username}</p>
                        <p>Correct Answer Rate:<br /> {userData[0].rate}%</p>
                        <p>Favorite Genre:<br /> {userData[0].favorite}</p>
                    </>
                ) : (
                    <p>Loading...</p>
                )}
        </div>
        <button id="edit" onClick={toEdit}>Edit</button>
      </div>
  );
}

export default Profile;
