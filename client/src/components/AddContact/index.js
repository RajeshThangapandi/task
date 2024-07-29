import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import axios from 'axios';

const AddPost = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [imgItems, setImgItems] = useState([]);
  const [error, setError] = useState(null); // Define error state

  const history = useHistory();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('https://quadiro-se89.onrender.com/api/data');
  
        setImgItems(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
        setError('Error fetching data.'); // Set error state
      }
    };

    fetchImages();
  }, []);

  const addContact = async (data) => {
    try {
      const response = await fetch('https://quadiro-se89.onrender.com/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // Use the data passed to this function
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();

      setImgItems([...imgItems, result]); 
      // Update state with new item
      history.push("/admindasboard"); 
    } catch (error) {
      console.error('Error posting data:', error);
      setError(error.message); // Set error message in state
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const checkContactEmailExists = imgItems.some((contact) => contact.email === email);
    const checkContactPhoneExists = imgItems.some((contact) => contact.phone === phone);

    if (!email || !name || !phone) {
      return toast.warning("Please fill in all fields!!");
    }
    if (checkContactEmailExists) {
      return toast.error("This email already exists!!");
    }
    if (checkContactPhoneExists) {
      return toast.error("This phone number already exists!!");
    }

    const data = {
      id: imgItems.length > 0 ? imgItems[imgItems.length - 1].id + 1 : 1,
      email,
      name,
      phone,
    };

    addContact(data);
    toast.success("Contact added successfully!!");
    // Corrected typo from admindasboard to admindashboard
  };

  return (
    <div className="container-fluid">
      <h1 className="text-center text-dark py-3 display-2">Add Post</h1>
      <div className="row">
        <div className="col-md-6 p-5 mx-auto shadow">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="number"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                className="btn btn-block btn-dark"
                type="submit"
                value="Add Student"
              />
            </div>
            {error && <div className="alert alert-danger">{error}</div>} {/* Display error */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
