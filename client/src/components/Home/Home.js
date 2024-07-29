import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import{ useEffect, useState } from "react";
import axios from 'axios';
import Navbar from "../Navbar";

const Home = () => {
  const [imgItems, setImgItems] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('https://quadiro-se89.onrender.com/api/data');
       // Log the API response
        setImgItems(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);


  
const deleteContact=async function(id){
  try {
    // Send DELETE request to the server
    await axios.delete(`https://quadiro-se89.onrender.com/api/data/${id}`);
    
    // Update state to remove the deleted contact
    setImgItems(imgItems.filter(contact => contact.id !== id));

    // Optionally dispatch delete action if using Redux
    deleteContact(id);
  } catch (error) {
    console.error('Error deleting contact:', error);
  }
}
  return (<div>
  <Navbar model="Admin"/>
<div className="container">
 
 <div className="row d-flex flex-column">
   <Link to="/add" className="btn btn-outline-dark my-5 ml-auto">
     Add Contact
   </Link>
   <div className="col-md-12 mx-auto my-4">
     <table className="table table-hover">
       <thead className="bg-dark text-white">
         <tr>
           <th scope="col">Id</th>
           <th scope="col">Name</th>
           <th scope="col">Email</th>
           <th scope="col">Phone</th>
           <th scope="col">Actions</th>
         </tr>
       </thead>
       <tbody>
         {imgItems.length > 0 ? (
           imgItems.map((contact) => (
             <tr key={contact.id}>
               <td>{contact.id}</td>
               <td>{contact.name}</td>
               <td>{contact.email}</td>
               <td>{contact.phone}</td>
               <td>
                 <Link
                   to={`/edit/${contact.id}`}
                   className="btn btn-sm btn-primary mr-1"
                 >
                   Edit
                 </Link>
                 <button
                   type="button"
                   onClick={() => deleteContact(contact.id)}
                   className="btn btn-sm btn-danger"
                 >
                   Delete
                 </button>
               </td>
             </tr>
           ))
         ) : (
           <tr>
             <td colSpan="5">No contacts found</td>
           </tr>
         )}
       </tbody>
     </table>
   </div>
 </div>
</div>
  </div>
    
  );
};

const mapStateToProps = (state) => ({
  contacts: state.contacts, // Adjust if state structure differs
});

const mapDispatchToProps = (dispatch) => ({
  deleteContact: (id) => {
    dispatch({ type: "DELETE_CONTACT", payload: id });
  },
});

export default Home;
