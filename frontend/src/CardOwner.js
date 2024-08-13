import React, {useState} from 'react';
const cardStyle = {
  border: '1px solid #ddd',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  margin: '20px',
  transition: 'transform 0.3s, box-shadow 0.3s',
  cursor: 'pointer',
  width: '400px',
  maxWidth: '80%',
};

const imgStyle = (status) =>({
  width: '100%',
  borderBottom: '1px solid #ddd',
  maxHeight:'200px',
  display: status==='visible' ? 'block' : 'none',
})

const bodyStyle = {
  padding: '15px'
};

const titleStyle = {
  fontSize: '1.5rem',
  marginBottom: '10px',
  color: '#333'
};

const descriptionStyle = {
  fontSize: '1rem',
  marginBottom: '15px',
  color: '#666'
};

const statusStyle = (status) => ({
  display: 'inline-block',
  padding: '5px 10px',
  borderRadius: '4px',
  fontWeight: 'bold',
  backgroundColor: status === 'visible' ? '#dc3545' :  '#28a745',
  color: 'white'
});

const removeStyle = (status) => ({
    display: 'inline-block',
    padding: '5px 10px',
    borderRadius: '4px',
    fontWeight: 'bold',
    backgroundColor: '#dc3545',
    color: 'white'
  });
const handleStatusUpdate=(id, status, setStatus)=>{
    status = status ==="visible" ? "hidden" : "visible";
    fetch(`http://localhost:3001/workart/updatestatus/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "status" : status }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to update status: ${response.statusText} (Status Code: ${response.status})`);
        }
        return response.json();
    }).then(data =>{
        setStatus(data.status);
        console.log(data.status);
    })
    .catch(error =>{
        console.log(error);
    })
}
const handleRemove=(id, setIsDeleted)=>{
    fetch(`http://localhost:3001/workart/delete/${id}`, {
        method: 'DELETE',
    }).then(response => {
        if (!response.ok) {
            throw new Error(`${response.statusText} ${response.status})`);
        }
        return response;
    }).then(data =>{
        setIsDeleted(true);
    })
    .catch(error =>{
    })
}
function WorkCardOwner({artwork}) {
    const [status, setStatus] = useState(artwork.status);
    const [isDeleted, setIsDeleted] = useState(false);
    return isDeleted===false?(
    <div style={cardStyle} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} >
      <img src={`http://localhost:3001/uploads/${artwork.img}`} alt={artwork.title} style={imgStyle(status)} />
      <div style={bodyStyle}>
        <h3 style={titleStyle}>{artwork.title}</h3>
        <p style={descriptionStyle}>{artwork.desc}</p>
        <div className="d-flex justify-content-between align-items-center">
            <span onClick={() => handleStatusUpdate(artwork.id, status, setStatus)} style={statusStyle(status)}>
            {status === 'visible' ? 'Hide' : 'Show'}
            </span>
            <span onClick={() => handleRemove(artwork.id, setIsDeleted)} style={removeStyle(status)}>
                Remove
            </span>
        </div>
        
      </div>
    </div>
  ):null;
}

export default WorkCardOwner;