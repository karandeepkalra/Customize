import { useState } from "react";

export function ImageUploader({ onImageUpload, meshOptions }) {
  const [selectedMesh, setSelectedMesh] = useState(meshOptions[0] || "");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (!file.type.match('image.*')) {
      alert('Please select an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (selectedMesh && onImageUpload) {
        onImageUpload(selectedMesh, event.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="image-uploader" style={styles.container}>
      <h3 style={styles.title}>Upload Custom Image</h3>
      
      <div style={styles.controls}>
        <select 
          value={selectedMesh} 
          onChange={(e) => setSelectedMesh(e.target.value)}
          style={styles.select}
        >
          {meshOptions.map(mesh => (
            <option key={mesh} value={mesh}>
              {mesh === "Main003" ? "Front" : mesh === "Main004" ? "Back" : "Sleeves"}
            </option>
          ))}
        </select>
        
        <label style={styles.fileLabel}>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange}
            style={styles.fileInput}
          />
          <span style={styles.button}>Choose Image</span>
        </label>
      </div>
      
      <div style={styles.help}>
        <p>Select a part of the hoodie and upload your image to apply it as a decal.</p>
        <ul style={styles.helpList}>
          <li>Front - Applies to the front of the hoodie</li>
          <li>Back - Applies to the back of the hoodie</li>
          <li>Sleeves - Applies to the arms of the hoodie</li>
        </ul>
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    background: 'rgba(255, 255, 255, 0.9)',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
    maxWidth: '300px'
  },
  title: {
    margin: '0 0 15px 0',
    fontSize: '18px',
    color: '#333'
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '15px'
  },
  select: {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    backgroundColor: 'white'
  },
  fileLabel: {
    display: 'inline-block'
  },
  fileInput: {
    position: 'absolute',
    left: '-9999px'
  },
  button: {
    display: 'inline-block',
    padding: '8px 12px',
    backgroundColor: '#4285f4',
    color: 'white',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    textAlign: 'center',
    width: '100%'
  },
  help: {
    fontSize: '12px',
    color: '#666'
  },
  helpList: {
    paddingLeft: '20px',
    margin: '5px 0 0 0'
  }
};