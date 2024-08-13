import React from 'react';
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

const linkStyle = {
  display: 'inline-block',
  marginBottom: '10px',
  color: '#007bff',
  textDecoration: 'none',
  fontWeight: 'bold'
};

function WorkCard({artwork}) {
    return (
    <div style={cardStyle} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} >
      <img src={`http://localhost:3001/uploads/${artwork.img}`} alt={artwork.title} style={imgStyle(artwork.status)} />
      <div style={bodyStyle}>
        <h3 style={titleStyle}>{artwork.title}</h3>
        <p style={descriptionStyle}>{artwork.desc}</p>
        <div className="d-flex justify-content-between align-items-center">
        <a href={`/profile/${artwork.owner}`} rel="noopener noreferrer" style={linkStyle}>
          Visit {artwork.owner} Site
        </a>
        </div>
        
      </div>
    </div>
  );
}

export default WorkCard;