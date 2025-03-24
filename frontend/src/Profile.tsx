import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const genreMapping: { [key: string]: string } = {
  "9": "General knowledge",
  "27": "Animal",
  "10": "Entertainment: Book",
  "31": "Japanese Manga",
  "11": "Movie",
  "12": "Music",
};

function Profile() {
  const navigate = useNavigate();
  const toEdit = () => {
    if (userData && userData[0]) {
      navigate("/edit/" + userData[0].id);
    }
  };
  const [userData, setUserData] = useState<
    { id: string; username: string; rate: number; favorite: string }[] | null
  >(null);
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
    };
    fetchdata();
  }, []);

  const getGenreName = (id: string) => {
    return genreMapping[id] || "Unknown Genre"; 
  };

  return (
    <>
      <div className="userinfosection">
        <div id="userinfo">
        <h1>Your Information</h1>
          {userData ? (
            <>
              <p>
                UserName:
                <br /> {userData[0].username}
              </p>
              <p>
                Correct Answer Rate:
                <br /> {userData[0].rate}%
              </p>
              <p>
                Favorite Genre:
                <br /> {getGenreName(userData[0].favorite)} 
              </p>
            </>
          ) : (
            <p>Loading...</p>
          )}
          <button id="edit" onClick={toEdit}>
            Edit
          </button>
        </div>
        <div className="imgsection"></div>
      </div>
    </>
  );
}

export default Profile;
