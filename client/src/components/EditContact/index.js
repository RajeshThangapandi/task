import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { toast } from "react-toastify";
import axios from 'axios';

const EditContact = () => {
  const [imgItems, setImgItems] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(null);

  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('https://quadiro-se89.onrender.com/api/data');
      
        setImgItems(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
        setError('Error fetching data.');
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    const currentContact = imgItems.find(
      (contact) => contact.id === parseInt(id)
    );

    if (currentContact) {
      setName(currentContact.name);
      setEmail(currentContact.email);
      setPhone(currentContact.phone);
    }
  }, [imgItems, id]);

  const updateContact = async (data) => {
    try {
      const response = await fetch(`https://quadiro-se89.onrender.com/api/data/${data.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
   
      history.push("/admindasboard");
      setImgItems((prevItems) =>
        prevItems.map((item) =>
          item.id === data.id ? result : item
        )
      );
    } catch (error) {
      console.error('Error updating data:', error);
      setError(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const checkContactEmailExists = imgItems.some(
      (contact) => contact.email === email && contact.id !== parseInt(id)
    );
    const checkContactPhoneExists = imgItems.some(
      (contact) => contact.phone === phone && contact.id !== parseInt(id)
    );

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
      id: parseInt(id),
      email,
      name,
      phone,
    };

    updateContact(data);
    toast.success("Contact updated successfully!!");
   
  };

  return (
    <div className="container">
      <div className="row d-flex flex-column">
        <button
          className="btn btn-dark ml-auto my-5"
          onClick={() => history.push("/")}
        >
          Go back
        </button>
        <div className="col-md-6 mx-auto shadow p-5">
          {imgItems.length > 0 ? (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  className="form-control"
                  value={name}
                  placeholder={"Name"}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  value={email}
                  placeholder={"Email"}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  value={phone}
                  placeholder={"Phone"}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="form-group d-flex align-items-center justify-content-between my-2">
                <button type="submit" className="btn btn-primary">
                  Update Contact
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => history.push("/")}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <h1 className="text-center">No Contact Found</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditContact;
