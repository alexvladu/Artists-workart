import React from 'react';

const FileUpload = ({setSelectedFile, selectedFileName, setSelectedFileName}) => {

  const handleFileChange = (event) => {
    if(event.target.files.length > 0)
    {
        setSelectedFile(event.target.files[0]);
        console.log(event.target.files[0].name);
        setSelectedFileName(event.target.files[0].name);
    }
    else{
        setSelectedFile(null);
        setSelectedFileName("No file selected");
    }
  };

  return (
    <div style={styles.fileUploadWrapper}>
      <label style={styles.customFileUpload}>
        <input type="file" onChange={handleFileChange} style={styles.fileInput} />
        Select file
      </label>
      <span style={styles.fileName}>{selectedFileName}</span>
    </div>
  );
};

const styles = {
  fileUploadWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginTop:"10px"
  },
  customFileUpload: {
    display: 'inline-block',
    padding: '10px 20px',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: 'white',
    borderRadius: '5px',
    fontSize: '16px',
    marginRight: '15px',
    transition: 'background-color 0.3s ease',
  },
  fileInput: {
    display: 'none',
  },
  fileName: {
    fontSize: '16px',
    color: '#555',
  },
};

export default FileUpload;
