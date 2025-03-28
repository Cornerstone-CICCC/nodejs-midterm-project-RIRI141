import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Edit.css";

function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [favorite, setFavorite] = useState("");
  const [formData, setFormData] = useState<{
    username: string;
    favorite: string;
  } | null>(null);

  const genreMapping: { [key: string]: string } = {
    "9": "General knowledge",
    "27": "Animal",
    "10": "Entertainment: Book",
    "31": "Japanese Manga",
    "11": "Movie",
    "12": "Music",
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`http://localhost:4000/users`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch user data");

        const data = await res.json();
        setFormData({
          username: data.username,
          favorite: data.favorite, 
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    try {
      const res = await fetch(`http://localhost:4000/edit/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to update user data");

      alert("Profile updated successfully!");
      navigate("/profile");
    } catch (error) {
      console.error(error);
    }
  };

  if (!formData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="editsection">
      <div className="editform">
        <h1>Edit Profile</h1>
        <form onSubmit={handleSubmit}>
          <label>
            <p>Username:</p>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            <p>Favorite Genre:</p>
            <select
              name="favorite"
              value={formData.favorite}
              onChange={handleChange}
            >
              {Object.entries(genreMapping).map(([id, genre]) => (
                <option key={id} value={id}>
                  {genre}
                </option>
              ))}
            </select>
          </label>
          <button type="submit">Save</button>
          <button onClick={() => navigate("/profile")}>Cancel</button>
        </form>
     
      </div>
      <div className="imgsection"></div>
    </div>
  );
}

export default Edit;
