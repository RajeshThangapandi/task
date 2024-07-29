import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
import Navbar from '../Navbar';

const UserDash = () => {
  const [imgItems, setImgItems] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('https://quadiro-se89.onrender.com/api/data');
        setImgItems(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  const handleDownload = (id) => {
    const data= imgItems[id-1];
    // Define the text content you want to download
    const textContent = `name : ${data.name} \n email : ${data.email} phone : ${data.phone}`;
  
    // Create a Blob from the text content
    const blob = new Blob([textContent], { type: 'text/plain' });

    // Create a link element
    const link = document.createElement('a');

    // Set the download attribute with a filename
    link.download = `${data.name}_data.txt`;

    // Create an object URL for the Blob and set it as the href attribute
    link.href = URL.createObjectURL(blob);

    // Append the link to the document
    document.body.appendChild(link);

    // Programmatically click the link to trigger the download
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);
  };

  return (
    <div>
      <Navbar model="User" />
      <div className="container my-4">
        <div className="row">
          {imgItems.map(item => (
            <div className="col-md-4 mb-4" key={item.id}>
              <Card>
                {/* <Card.Img variant="top" src={item.urls.regular} alt={item.alt_description} /> */}
                <Card.Body>
                  <Card.Title>{item.name || 'Untitled'}</Card.Title>
                  <Card.Text>
                    {item.email || 'No description available'}
                  </Card.Text>
                  <Card.Text>
                    {item.phone || 'No description available'}
                  </Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => handleDownload(item.id)} // Pass a function reference
                  >
                    Download
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDash;
