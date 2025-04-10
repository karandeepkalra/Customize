// // // import { useState } from "react";

// // // export function ImageUploader({ onImageUpload, meshOptions }) {
// // //   const [selectedMesh, setSelectedMesh] = useState(meshOptions[0] || "");

// // //   const handleFileChange = (e) => {
// // //     const file = e.target.files[0];
// // //     if (!file) return;
    
// // //     if (!file.type.match('image.*')) {
// // //       alert('Please select an image file');
// // //       return;
// // //     }

// // //     const reader = new FileReader();
// // //     reader.onload = (event) => {
// // //       if (selectedMesh && onImageUpload) {
// // //         onImageUpload(selectedMesh, event.target.result);
// // //       }
// // //     };
// // //     reader.readAsDataURL(file);
// // //   };

// // //   return (
// // //     <div className="image-uploader" style={styles.container}>
// // //       <h3 style={styles.title}>Upload Custom Image</h3>
      
// // //       <div style={styles.controls}>
// // //         <select 
// // //           value={selectedMesh} 
// // //           onChange={(e) => setSelectedMesh(e.target.value)}
// // //           style={styles.select}
// // //         >
// // //           {meshOptions.map(mesh => (
// // //             <option key={mesh} value={mesh}>
// // //               {mesh === "Main003" ? "Front" : mesh === "Main004" ? "Back" : "Sleeves"}
// // //             </option>
// // //           ))}
// // //         </select>
        
// // //         <label style={styles.fileLabel}>
// // //           <input 
// // //             type="file" 
// // //             accept="image/*" 
// // //             onChange={handleFileChange}
// // //             style={styles.fileInput}
// // //           />
// // //           <span style={styles.button}>Choose Image</span>
// // //         </label>
// // //       </div>
      
// // //       <div style={styles.help}>
// // //         <p>Select a part of the hoodie and upload your image to apply it as a decal.</p>
// // //         <ul style={styles.helpList}>
// // //           <li>Front - Applies to the front of the hoodie</li>
// // //           <li>Back - Applies to the back of the hoodie</li>
// // //           <li>Sleeves - Applies to the arms of the hoodie</li>
// // //         </ul>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // const styles = {
// // //   container: {
// // //     position: 'absolute',
// // //     top: '20px',
// // //     left: '20px',
// // //     background: 'rgba(255, 255, 255, 0.9)',
// // //     padding: '15px',
// // //     borderRadius: '8px',
// // //     boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
// // //     zIndex: 1000,
// // //     maxWidth: '300px'
// // //   },
// // //   title: {
// // //     margin: '0 0 15px 0',
// // //     fontSize: '18px',
// // //     color: '#333'
// // //   },
// // //   controls: {
// // //     display: 'flex',
// // //     flexDirection: 'column',
// // //     gap: '10px',
// // //     marginBottom: '15px'
// // //   },
// // //   select: {
// // //     padding: '8px',
// // //     borderRadius: '4px',
// // //     border: '1px solid #ccc',
// // //     backgroundColor: 'white'
// // //   },
// // //   fileLabel: {
// // //     display: 'inline-block'
// // //   },
// // //   fileInput: {
// // //     position: 'absolute',
// // //     left: '-9999px'
// // //   },
// // //   button: {
// // //     display: 'inline-block',
// // //     padding: '8px 12px',
// // //     backgroundColor: '#4285f4',
// // //     color: 'white',
// // //     borderRadius: '4px',
// // //     cursor: 'pointer',
// // //     fontSize: '14px',
// // //     textAlign: 'center',
// // //     width: '100%'
// // //   },
// // //   help: {
// // //     fontSize: '12px',
// // //     color: '#666'
// // //   },
// // //   helpList: {
// // //     paddingLeft: '20px',
// // //     margin: '5px 0 0 0'
// // //   }
// // // };



// // import { useState } from "react";

// // export function ImageUploader({ onImageUpload, meshOptions }) {
// //   const [selectedMesh, setSelectedMesh] = useState(meshOptions[0] || "");
// //   const [previewImage, setPreviewImage] = useState(null);
// //   const [hoveredButton, setHoveredButton] = useState(false);
// //   const [hoveredSelect, setHoveredSelect] = useState(false);
// //   const [dragActive, setDragActive] = useState(false);

// //   const handleFileChange = (e) => {
// //     const file = e.target.files[0];
// //     processFile(file);
// //   };

// //   const handleDrag = (e) => {
// //     e.preventDefault();
// //     e.stopPropagation();
    
// //     if (e.type === "dragenter" || e.type === "dragover") {
// //       setDragActive(true);
// //     } else if (e.type === "dragleave") {
// //       setDragActive(false);
// //     }
// //   };

// //   const handleDrop = (e) => {
// //     e.preventDefault();
// //     e.stopPropagation();
// //     setDragActive(false);
    
// //     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
// //       processFile(e.dataTransfer.files[0]);
// //     }
// //   };

// //   const processFile = (file) => {
// //     if (!file) return;
    
// //     if (!file.type.match('image.*')) {
// //       alert('Please select an image file');
// //       return;
// //     }

// //     const reader = new FileReader();
// //     reader.onload = (event) => {
// //       setPreviewImage(event.target.result);
      
// //       if (selectedMesh && onImageUpload) {
// //         onImageUpload(selectedMesh, event.target.result);
// //       }
// //     };
// //     reader.readAsDataURL(file);
// //   };

// //   const getMeshDisplayName = (meshName) => {
// //     switch(meshName) {
// //       case "Main003": return "Back";
// //       case "Main004": return "Front";
// //       case "Arms002": return "Sleeves";
// //       default: return meshName;
// //     }
// //   };

// //   return (
// //     <div className="image-uploader" style={styles.container}>
// //       <div style={styles.header}>
// //         <h2 style={styles.title}>Customize Your Hoodie</h2>
// //         <div style={styles.divider}></div>
// //       </div>
      
// //       <div style={styles.body}>
// //         <div style={styles.instructions}>
// //           <p style={styles.subtitle}>Choose where to apply your design:</p>
// //           <select
// //             value={selectedMesh}
// //             onChange={(e) => setSelectedMesh(e.target.value)}
// //             style={{
// //               ...styles.select,
// //               ...(hoveredSelect ? styles.selectHover : {})
// //             }}
// //             onMouseEnter={() => setHoveredSelect(true)}
// //             onMouseLeave={() => setHoveredSelect(false)}
// //           >
// //             {meshOptions.map(mesh => (
// //               <option key={mesh} value={mesh}>
// //                 {getMeshDisplayName(mesh)}
// //               </option>
// //             ))}
// //           </select>
// //         </div>
        
// //         <div 
// //           style={{
// //             ...styles.dropzone,
// //             ...(dragActive ? styles.dropzoneActive : {})
// //           }}
// //           onDragEnter={handleDrag}
// //           onDragLeave={handleDrag}
// //           onDragOver={handleDrag}
// //           onDrop={handleDrop}
// //         >
// //           {previewImage ? (
// //             <div style={styles.previewContainer}>
// //               <img 
// //                 src={previewImage} 
// //                 alt="Preview" 
// //                 style={styles.previewImage}
// //               />
// //               <p style={styles.previewText}>
// //                 Applied to {getMeshDisplayName(selectedMesh)}
// //               </p>
// //             </div>
// //           ) : (
// //             <div style={styles.placeholderContent}>
// //               <svg style={styles.uploadIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
// //                 <path d="M12 16L12 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
// //                 <path d="M9 11L12 8L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
// //                 <path d="M8 16H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
// //                 <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
// //               </svg>
// //               <p style={styles.dropText}>Drag & drop an image here</p>
// //               <p style={styles.orText}>- or -</p>
// //             </div>
// //           )}
          
// //           <label style={{
// //             ...styles.uploadButton,
// //             ...(hoveredButton ? styles.uploadButtonHover : {})
// //           }}>
// //             <input
// //               type="file"
// //               accept="image/*"
// //               onChange={handleFileChange}
// //               style={styles.fileInput}
// //             />
// //             <span 
// //               onMouseEnter={() => setHoveredButton(true)}
// //               onMouseLeave={() => setHoveredButton(false)}
// //             >
// //               {previewImage ? 'Change Image' : 'Browse Files'}
// //             </span>
// //           </label>
// //         </div>
// //       </div>
      
// //       <div style={styles.footer}>
// //         <div style={styles.infoBox}>
// //           <div style={styles.infoHeader}>
// //             <svg style={styles.infoIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
// //               <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
// //               <path d="M12 8L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
// //               <circle cx="12" cy="15" r="1" fill="currentColor"/>
// //             </svg>
// //             <span style={styles.infoTitle}>Application Guide</span>
// //           </div>
// //           <ul style={styles.infoList}>
// //             <li><strong>Front:</strong> Center chest area of the hoodie</li>
// //             <li><strong>Back:</strong> Center back area of the hoodie</li>
// //             <li><strong>Sleeves:</strong> Appears on both arms</li>
// //           </ul>
// //           <p style={styles.tipText}>💡 Tip: Use transparent PNG files for best results</p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // const styles = {
// //   container: {
// //     position: 'absolute',
// //     top: '20px',
// //     left: '20px',
// //     background: 'rgba(255, 255, 255, 0.95)',
// //     padding: '0',
// //     borderRadius: '12px',
// //     boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1), 0 1px 8px rgba(0, 0, 0, 0.07)',
// //     zIndex: 1000,
// //     width: '320px',
// //     overflow: 'hidden',
// //     fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
// //   },
// //   header: {
// //     padding: '20px 25px',
// //     background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
// //     color: 'white',
// //   },
// //   title: {
// //     margin: '0',
// //     fontSize: '22px',
// //     fontWeight: '600',
// //     letterSpacing: '0.5px',
// //   },
// //   divider: {
// //     height: '4px',
// //     width: '40px',
// //     background: 'rgba(255, 255, 255, 0.3)',
// //     borderRadius: '2px',
// //     marginTop: '15px',
// //   },
// //   body: {
// //     padding: '20px 25px',
// //   },
// //   instructions: {
// //     marginBottom: '15px',
// //   },
// //   subtitle: {
// //     margin: '0 0 8px 0',
// //     fontSize: '15px',
// //     fontWeight: '500',
// //     color: '#4B5563',
// //   },
// //   select: {
// //     width: '100%',
// //     padding: '12px 15px',
// //     borderRadius: '8px',
// //     border: '1px solid #E5E7EB',
// //     backgroundColor: 'white',
// //     fontSize: '15px',
// //     color: '#374151',
// //     appearance: 'none',
// //     backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
// //     backgroundRepeat: 'no-repeat',
// //     backgroundPosition: 'right 15px center',
// //     backgroundSize: '15px',
// //     boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
// //     transition: 'all 0.2s ease',
// //     cursor: 'pointer',
// //   },
// //   selectHover: {
// //     borderColor: '#6366F1',
// //     boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.1)',
// //   },
// //   dropzone: {
// //     border: '2px dashed #E5E7EB',
// //     borderRadius: '8px',
// //     padding: '20px',
// //     display: 'flex',
// //     flexDirection: 'column',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     backgroundColor: '#F9FAFB',
// //     cursor: 'pointer',
// //     transition: 'all 0.2s ease',
// //   },
// //   dropzoneActive: {
// //     borderColor: '#6366F1',
// //     backgroundColor: 'rgba(99, 102, 241, 0.05)',
// //   },
// //   placeholderContent: {
// //     display: 'flex',
// //     flexDirection: 'column',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     padding: '20px 0',
// //   },
// //   uploadIcon: {
// //     width: '36px',
// //     height: '36px',
// //     color: '#9CA3AF',
// //     marginBottom: '10px',
// //   },
// //   dropText: {
// //     margin: '0',
// //     fontSize: '14px',
// //     color: '#6B7280',
// //     fontWeight: '500',
// //   },
// //   orText: {
// //     margin: '10px 0',
// //     fontSize: '14px',
// //     color: '#9CA3AF',
// //   },
// //   uploadButton: {
// //     display: 'inline-block',
// //     padding: '10px 20px',
// //     backgroundColor: '#6366F1',
// //     color: 'white',
// //     borderRadius: '6px',
// //     fontSize: '14px',
// //     fontWeight: '500',
// //     textAlign: 'center',
// //     cursor: 'pointer',
// //     transition: 'all 0.2s ease',
// //     boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
// //     marginTop: '10px',
// //     width: '80%',
// //   },
// //   uploadButtonHover: {
// //     backgroundColor: '#4F46E5',
// //     transform: 'translateY(-1px)',
// //     boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
// //   },
// //   fileInput: {
// //     position: 'absolute',
// //     left: '-9999px',
// //   },
// //   previewContainer: {
// //     display: 'flex',
// //     flexDirection: 'column',
// //     alignItems: 'center',
// //     width: '100%',
// //     marginBottom: '10px',
// //   },
// //   previewImage: {
// //     maxWidth: '100%',
// //     maxHeight: '150px',
// //     objectFit: 'contain',
// //     borderRadius: '4px',
// //     marginBottom: '10px',
// //   },
// //   previewText: {
// //     margin: '0',
// //     fontSize: '14px',
// //     color: '#4B5563',
// //     fontWeight: '500',
// //   },
// //   footer: {
// //     padding: '5px 25px 20px',
// //   },
// //   infoBox: {
// //     backgroundColor: '#F3F4F6',
// //     borderRadius: '8px',
// //     padding: '15px',
// //   },
// //   infoHeader: {
// //     display: 'flex',
// //     alignItems: 'center',
// //     marginBottom: '8px',
// //   },
// //   infoIcon: {
// //     width: '18px',
// //     height: '18px',
// //     color: '#6366F1',
// //     marginRight: '8px',
// //   },
// //   infoTitle: {
// //     fontSize: '14px',
// //     fontWeight: '600',
// //     color: '#4B5563',
// //   },
// //   infoList: {
// //     margin: '0',
// //     paddingLeft: '20px',
// //     fontSize: '13px',
// //     color: '#4B5563',
// //     lineHeight: '1.6',
// //   },
// //   tipText: {
// //     margin: '10px 0 0',
// //     fontSize: '13px',
// //     color: '#4B5563',
// //     fontStyle: 'italic',
// //   }
// // };



// import { useState, useEffect } from "react";

// export function ImageUploader({ onImageUpload, meshOptions, onScaleChange }) {
//   const [selectedMesh, setSelectedMesh] = useState(meshOptions[0] || "");
//   const [previewImage, setPreviewImage] = useState(null);
//   const [hoveredButton, setHoveredButton] = useState(false);
//   const [hoveredSelect, setHoveredSelect] = useState(false);
//   const [dragActive, setDragActive] = useState(false);
//   const [scaleValues, setScaleValues] = useState({
//     Main003: { x: 0.1, y: 0.1 },
//     Main004: { x: 0.1, y: 0.1 },
//     Arms002: { x: 0.1, y: 0.1 }
//   });

//   useEffect(() => {
//     // Initialize scale values if provided through props
//     if (onScaleChange) {
//       meshOptions.forEach(mesh => {
//         onScaleChange(mesh, scaleValues[mesh].x, scaleValues[mesh].y);
//       });
//     }
//   }, []);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     processFile(file);
//   };

//   const handleDrag = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
    
//     if (e.type === "dragenter" || e.type === "dragover") {
//       setDragActive(true);
//     } else if (e.type === "dragleave") {
//       setDragActive(false);
//     }
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);
    
//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       processFile(e.dataTransfer.files[0]);
//     }
//   };

//   const processFile = (file) => {
//     if (!file) return;
    
//     if (!file.type.match('image.*')) {
//       alert('Please select an image file');
//       return;
//     }

//     const reader = new FileReader();
//     reader.onload = (event) => {
//       setPreviewImage(event.target.result);
      
//       if (selectedMesh && onImageUpload) {
//         onImageUpload(selectedMesh, event.target.result);
//       }
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleScaleChange = (axis, value) => {
//     const newValue = parseFloat(value);
    
//     // Update the local state
//     setScaleValues(prev => ({
//       ...prev,
//       [selectedMesh]: {
//         ...prev[selectedMesh],
//         [axis]: newValue
//       }
//     }));
    
//     // Call the parent component's handler
//     if (onScaleChange) {
//       onScaleChange(
//         selectedMesh, 
//         axis === 'x' ? newValue : scaleValues[selectedMesh].x,
//         axis === 'y' ? newValue : scaleValues[selectedMesh].y
//       );
//     }
//   };

//   const getMeshDisplayName = (meshName) => {
//     switch(meshName) {
//       case "Main003": return "Back";
//       case "Main004": return "Front";
//       case "Arms002": return "Sleeves";
//       default: return meshName;
//     }
//   };

//   return (
//     <div className="image-uploader" style={styles.container}>
//       <div style={styles.header}>
//         <h2 style={styles.title}>Customize Your Hoodie</h2>
//         <div style={styles.divider}></div>
//       </div>
      
//       <div style={styles.body}>
//         <div style={styles.instructions}>
//           <p style={styles.subtitle}>Choose where to apply your design:</p>
//           <select
//             value={selectedMesh}
//             onChange={(e) => setSelectedMesh(e.target.value)}
//             style={{
//               ...styles.select,
//               ...(hoveredSelect ? styles.selectHover : {})
//             }}
//             onMouseEnter={() => setHoveredSelect(true)}
//             onMouseLeave={() => setHoveredSelect(false)}
//           >
//             {meshOptions.map(mesh => (
//               <option key={mesh} value={mesh}>
//                 {getMeshDisplayName(mesh)}
//               </option>
//             ))}
//           </select>
//         </div>
        
//         <div 
//           style={{
//             ...styles.dropzone,
//             ...(dragActive ? styles.dropzoneActive : {})
//           }}
//           onDragEnter={handleDrag}
//           onDragLeave={handleDrag}
//           onDragOver={handleDrag}
//           onDrop={handleDrop}
//         >
//           {previewImage ? (
//             <div style={styles.previewContainer}>
//               <img 
//                 src={previewImage} 
//                 alt="Preview" 
//                 style={styles.previewImage}
//               />
//               <p style={styles.previewText}>
//                 Applied to {getMeshDisplayName(selectedMesh)}
//               </p>
//             </div>
//           ) : (
//             <div style={styles.placeholderContent}>
//               <svg style={styles.uploadIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M12 16L12 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                 <path d="M9 11L12 8L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                 <path d="M8 16H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                 <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
//               </svg>
//               <p style={styles.dropText}>Drag & drop an image here</p>
//               <p style={styles.orText}>- or -</p>
//             </div>
//           )}
          
//           <label style={{
//             ...styles.uploadButton,
//             ...(hoveredButton ? styles.uploadButtonHover : {})
//           }}>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleFileChange}
//               style={styles.fileInput}
//             />
//             <span 
//               onMouseEnter={() => setHoveredButton(true)}
//               onMouseLeave={() => setHoveredButton(false)}
//             >
//               {previewImage ? 'Change Image' : 'Browse Files'}
//             </span>
//           </label>
//         </div>

//         {/* Scale Controls - new section */}
//         {previewImage && (
//           <div style={styles.scaleControls}>
//             <p style={styles.scaleTitle}>Adjust Image Size:</p>
            
//             <div style={styles.scaleRow}>
//               <label style={styles.scaleLabel}>Width:</label>
//               <input
//                 type="range"
//                 min="0.05"
//                 max="0.3"
//                 step="0.01"
//                 value={scaleValues[selectedMesh].x}
//                 onChange={(e) => handleScaleChange('x', e.target.value)}
//                 style={styles.scaleSlider}
//               />
//               <span style={styles.scaleValue}>{(scaleValues[selectedMesh].x * 100).toFixed(0)}%</span>
//             </div>
            
//             <div style={styles.scaleRow}>
//               <label style={styles.scaleLabel}>Height:</label>
//               <input
//                 type="range"
//                 min="0.05"
//                 max="0.3"
//                 step="0.01"
//                 value={scaleValues[selectedMesh].y}
//                 onChange={(e) => handleScaleChange('y', e.target.value)}
//                 style={styles.scaleSlider}
//               />
//               <span style={styles.scaleValue}>{(scaleValues[selectedMesh].y * 100).toFixed(0)}%</span>
//             </div>
//           </div>
//         )}
//       </div>
      
//       <div style={styles.footer}>
//         <div style={styles.infoBox}>
//           <div style={styles.infoHeader}>
//             <svg style={styles.infoIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
//               <path d="M12 8L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//               <circle cx="12" cy="15" r="1" fill="currentColor"/>
//             </svg>
//             <span style={styles.infoTitle}>Application Guide</span>
//           </div>
//           <ul style={styles.infoList}>
//             <li><strong>Front:</strong> Center chest area of the hoodie</li>
//             <li><strong>Back:</strong> Center back area of the hoodie</li>
//             <li><strong>Sleeves:</strong> Appears on both arms</li>
//           </ul>
//           <p style={styles.tipText}>💡 Tip: Use transparent PNG files for best results</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     position: 'absolute',
//     top: '20px',
//     left: '20px',
//     background: 'rgba(255, 255, 255, 0.95)',
//     padding: '0',
//     borderRadius: '12px',
//     boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1), 0 1px 8px rgba(0, 0, 0, 0.07)',
//     zIndex: 1000,
//     width: '320px',
//     overflow: 'hidden',
//     fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
//   },
//   header: {
//     padding: '20px 25px',
//     background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
//     color: 'white',
//   },
//   title: {
//     margin: '0',
//     fontSize: '22px',
//     fontWeight: '600',
//     letterSpacing: '0.5px',
//   },
//   divider: {
//     height: '4px',
//     width: '40px',
//     background: 'rgba(255, 255, 255, 0.3)',
//     borderRadius: '2px',
//     marginTop: '15px',
//   },
//   body: {
//     padding: '20px 25px',
//   },
//   instructions: {
//     marginBottom: '15px',
//   },
//   subtitle: {
//     margin: '0 0 8px 0',
//     fontSize: '15px',
//     fontWeight: '500',
//     color: '#4B5563',
//   },
//   select: {
//     width: '100%',
//     padding: '12px 15px',
//     borderRadius: '8px',
//     border: '1px solid #E5E7EB',
//     backgroundColor: 'white',
//     fontSize: '15px',
//     color: '#374151',
//     appearance: 'none',
//     backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
//     backgroundRepeat: 'no-repeat',
//     backgroundPosition: 'right 15px center',
//     backgroundSize: '15px',
//     boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
//     transition: 'all 0.2s ease',
//     cursor: 'pointer',
//   },
//   selectHover: {
//     borderColor: '#6366F1',
//     boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.1)',
//   },
//   dropzone: {
//     border: '2px dashed #E5E7EB',
//     borderRadius: '8px',
//     padding: '20px',
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#F9FAFB',
//     cursor: 'pointer',
//     transition: 'all 0.2s ease',
//   },
//   dropzoneActive: {
//     borderColor: '#6366F1',
//     backgroundColor: 'rgba(99, 102, 241, 0.05)',
//   },
//   placeholderContent: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: '20px 0',
//   },
//   uploadIcon: {
//     width: '36px',
//     height: '36px',
//     color: '#9CA3AF',
//     marginBottom: '10px',
//   },
//   dropText: {
//     margin: '0',
//     fontSize: '14px',
//     color: '#6B7280',
//     fontWeight: '500',
//   },
//   orText: {
//     margin: '10px 0',
//     fontSize: '14px',
//     color: '#9CA3AF',
//   },
//   uploadButton: {
//     display: 'inline-block',
//     padding: '10px 20px',
//     backgroundColor: '#6366F1',
//     color: 'white',
//     borderRadius: '6px',
//     fontSize: '14px',
//     fontWeight: '500',
//     textAlign: 'center',
//     cursor: 'pointer',
//     transition: 'all 0.2s ease',
//     boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
//     marginTop: '10px',
//     width: '80%',
//   },
//   uploadButtonHover: {
//     backgroundColor: '#4F46E5',
//     transform: 'translateY(-1px)',
//     boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
//   },
//   fileInput: {
//     position: 'absolute',
//     left: '-9999px',
//   },
//   previewContainer: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     width: '100%',
//     marginBottom: '10px',
//   },
//   previewImage: {
//     maxWidth: '100%',
//     maxHeight: '150px',
//     objectFit: 'contain',
//     borderRadius: '4px',
//     marginBottom: '10px',
//   },
//   previewText: {
//     margin: '0',
//     fontSize: '14px',
//     color: '#4B5563',
//     fontWeight: '500',
//   },
//   footer: {
//     padding: '5px 25px 20px',
//   },
//   infoBox: {
//     backgroundColor: '#F3F4F6',
//     borderRadius: '8px',
//     padding: '15px',
//   },
//   infoHeader: {
//     display: 'flex',
//     alignItems: 'center',
//     marginBottom: '8px',
//   },
//   infoIcon: {
//     width: '18px',
//     height: '18px',
//     color: '#6366F1',
//     marginRight: '8px',
//   },
//   infoTitle: {
//     fontSize: '14px',
//     fontWeight: '600',
//     color: '#4B5563',
//   },
//   infoList: {
//     margin: '0',
//     paddingLeft: '20px',
//     fontSize: '13px',
//     color: '#4B5563',
//     lineHeight: '1.6',
//   },
//   tipText: {
//     margin: '10px 0 0',
//     fontSize: '13px',
//     color: '#4B5563',
//     fontStyle: 'italic',
//   },
//   // New styles for scaling controls
//   scaleControls: {
//     marginTop: '20px',
//     padding: '15px',
//     backgroundColor: '#F9FAFB',
//     borderRadius: '8px',
//     border: '1px solid #E5E7EB',
//   },
//   scaleTitle: {
//     margin: '0 0 12px 0',
//     fontSize: '15px',
//     fontWeight: '500',
//     color: '#4B5563',
//   },
//   scaleRow: {
//     display: 'flex',
//     alignItems: 'center',
//     marginBottom: '10px',
//   },
//   scaleLabel: {
//     width: '60px',
//     fontSize: '14px',
//     color: '#6B7280',
//   },
//   scaleSlider: {
//     flex: 1,
//     margin: '0 10px',
//     appearance: 'none',
//     height: '6px',
//     borderRadius: '3px',
//     background: '#E5E7EB',
//     outline: 'none',
//     cursor: 'pointer',
//   },
//   scaleValue: {
//     width: '40px',
//     fontSize: '14px',
//     color: '#6B7280',
//     textAlign: 'right',
//   }
// };


import { useState, useEffect } from "react";

export function ImageUploader({ onImageUpload, meshOptions, onScaleChange }) {
  const [selectedMesh, setSelectedMesh] = useState(meshOptions[0] || "");
  const [previewImage, setPreviewImage] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(false);
  const [hoveredSelect, setHoveredSelect] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [scaleValues, setScaleValues] = useState({
    Main003: { x: 0.1, y: 0.1, aspectRatio: 1 },
    Main004: { x: 0.1, y: 0.1, aspectRatio: 1 },
    Arms002: { x: 0.1, y: 0.1, aspectRatio: 1 }
  });

  useEffect(() => {
    // Initialize scale values if provided through props
    if (onScaleChange) {
      meshOptions.forEach(mesh => {
        onScaleChange(mesh, scaleValues[mesh].x, scaleValues[mesh].y, scaleValues[mesh].aspectRatio);
      });
    }
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    processFile(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const processFile = (file) => {
    if (!file) return;
    
    if (!file.type.match('image.*')) {
      alert('Please select an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setPreviewImage(event.target.result);
      
      // Create an image element to get the natural dimensions
      const img = new Image();
      img.onload = () => {
        const aspectRatio = img.width / img.height;
        
        // Update scale values with the new aspect ratio
        setScaleValues(prev => ({
          ...prev,
          [selectedMesh]: {
            ...prev[selectedMesh],
            aspectRatio: aspectRatio
          }
        }));
        
        // Call the parent component's handler with aspect ratio
        if (onScaleChange) {
          onScaleChange(
            selectedMesh, 
            scaleValues[selectedMesh].x,
            scaleValues[selectedMesh].y,
            aspectRatio
          );
        }
      };
      img.src = event.target.result;
      
      if (selectedMesh && onImageUpload) {
        onImageUpload(selectedMesh, event.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleScaleChange = (axis, value) => {
    const newValue = parseFloat(value);
    const aspectRatio = scaleValues[selectedMesh].aspectRatio;
    
    // Update both x and y maintaining aspect ratio
    let newX = scaleValues[selectedMesh].x;
    let newY = scaleValues[selectedMesh].y;
    
    if (axis === 'x') {
      newX = newValue;
      newY = newValue / aspectRatio;
    } else {
      newY = newValue;
      newX = newValue * aspectRatio;
    }
    
    // Update the local state
    setScaleValues(prev => ({
      ...prev,
      [selectedMesh]: {
        ...prev[selectedMesh],
        x: newX,
        y: newY
      }
    }));
    
    // Call the parent component's handler
    if (onScaleChange) {
      onScaleChange(selectedMesh, newX, newY, aspectRatio);
    }
  };

  const getMeshDisplayName = (meshName) => {
    switch(meshName) {
      case "Main003": return "Back";
      case "Main004": return "Front";
      case "Arms002": return "Sleeves";
      default: return meshName;
    }
  };

  return (
    <div className="image-uploader" style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Customize Your Hoodie</h2>
        <div style={styles.divider}></div>
      </div>
      
      <div style={styles.body}>
        <div style={styles.instructions}>
          <p style={styles.subtitle}>Choose where to apply your design:</p>
          <select
            value={selectedMesh}
            onChange={(e) => setSelectedMesh(e.target.value)}
            style={{
              ...styles.select,
              ...(hoveredSelect ? styles.selectHover : {})
            }}
            onMouseEnter={() => setHoveredSelect(true)}
            onMouseLeave={() => setHoveredSelect(false)}
          >
            {meshOptions.map(mesh => (
              <option key={mesh} value={mesh}>
                {getMeshDisplayName(mesh)}
              </option>
            ))}
          </select>
        </div>
        
        <div 
          style={{
            ...styles.dropzone,
            ...(dragActive ? styles.dropzoneActive : {})
          }}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {previewImage ? (
            <div style={styles.previewContainer}>
              <img 
                src={previewImage} 
                alt="Preview" 
                style={styles.previewImage}
              />
              <p style={styles.previewText}>
                Applied to {getMeshDisplayName(selectedMesh)}
              </p>
            </div>
          ) : (
            <div style={styles.placeholderContent}>
              <svg style={styles.uploadIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 16L12 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 11L12 8L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 16H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <p style={styles.dropText}>Drag & drop an image here</p>
              <p style={styles.orText}>- or -</p>
            </div>
          )}
          
          <label style={{
            ...styles.uploadButton,
            ...(hoveredButton ? styles.uploadButtonHover : {})
          }}>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={styles.fileInput}
            />
            <span 
              onMouseEnter={() => setHoveredButton(true)}
              onMouseLeave={() => setHoveredButton(false)}
            >
              {previewImage ? 'Change Image' : 'Browse Files'}
            </span>
          </label>
        </div>

        {/* Scale Controls - updated to maintain aspect ratio */}
        {previewImage && (
          <div style={styles.scaleControls}>
            <p style={styles.scaleTitle}>Adjust Image Size:</p>
            
            <div style={styles.scaleRow}>
              <label style={styles.scaleLabel}>Size:</label>
              <input
                type="range"
                min="0.05"
                max="0.3"
                step="0.01"
                value={scaleValues[selectedMesh].x}
                onChange={(e) => handleScaleChange('x', e.target.value)}
                style={styles.scaleSlider}
              />
              <span style={styles.scaleValue}>{(scaleValues[selectedMesh].x * 100).toFixed(0)}%</span>
            </div>
          </div>
        )}
      </div>
      
      <div style={styles.footer}>
        <div style={styles.infoBox}>
          <div style={styles.infoHeader}>
            <svg style={styles.infoIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 8L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="15" r="1" fill="currentColor"/>
            </svg>
            <span style={styles.infoTitle}>Application Guide</span>
          </div>
          <ul style={styles.infoList}>
            <li><strong>Front:</strong> Center chest area of the hoodie</li>
            <li><strong>Back:</strong> Center back area of the hoodie</li>
            <li><strong>Sleeves:</strong> Appears on both arms</li>
          </ul>
          <p style={styles.tipText}>💡 Tip: Use transparent PNG files for best results</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    background: 'rgba(255, 255, 255, 0.95)',
    padding: '0',
    borderRadius: '12px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1), 0 1px 8px rgba(0, 0, 0, 0.07)',
    zIndex: 1000,
    width: '320px',
    overflow: 'hidden',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
  },
  header: {
    padding: '20px 25px',
    background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
    color: 'white',
  },
  title: {
    margin: '0',
    fontSize: '22px',
    fontWeight: '600',
    letterSpacing: '0.5px',
  },
  divider: {
    height: '4px',
    width: '40px',
    background: 'rgba(255, 255, 255, 0.3)',
    borderRadius: '2px',
    marginTop: '15px',
  },
  body: {
    padding: '20px 25px',
  },
  instructions: {
    marginBottom: '15px',
  },
  subtitle: {
    margin: '0 0 8px 0',
    fontSize: '15px',
    fontWeight: '500',
    color: '#4B5563',
  },
  select: {
    width: '100%',
    padding: '12px 15px',
    borderRadius: '8px',
    border: '1px solid #E5E7EB',
    backgroundColor: 'white',
    fontSize: '15px',
    color: '#374151',
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 15px center',
    backgroundSize: '15px',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
  },
  selectHover: {
    borderColor: '#6366F1',
    boxShadow: '0 0 0 3px rgba(99, 102, 241, 0.1)',
  },
  dropzone: {
    border: '2px dashed #E5E7EB',
    borderRadius: '8px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9FAFB',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  dropzoneActive: {
    borderColor: '#6366F1',
    backgroundColor: 'rgba(99, 102, 241, 0.05)',
  },
  placeholderContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px 0',
  },
  uploadIcon: {
    width: '36px',
    height: '36px',
    color: '#9CA3AF',
    marginBottom: '10px',
  },
  dropText: {
    margin: '0',
    fontSize: '14px',
    color: '#6B7280',
    fontWeight: '500',
  },
  orText: {
    margin: '10px 0',
    fontSize: '14px',
    color: '#9CA3AF',
  },
  uploadButton: {
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: '#6366F1',
    color: 'white',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
    marginTop: '10px',
    width: '80%',
  },
  uploadButtonHover: {
    backgroundColor: '#4F46E5',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
  },
  fileInput: {
    position: 'absolute',
    left: '-9999px',
  },
  previewContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    marginBottom: '10px',
  },
  previewImage: {
    maxWidth: '100%',
    maxHeight: '150px',
    objectFit: 'contain',
    borderRadius: '4px',
    marginBottom: '10px',
  },
  previewText: {
    margin: '0',
    fontSize: '14px',
    color: '#4B5563',
    fontWeight: '500',
  },
  footer: {
    padding: '5px 25px 20px',
  },
  infoBox: {
    backgroundColor: '#F3F4F6',
    borderRadius: '8px',
    padding: '15px',
  },
  infoHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '8px',
  },
  infoIcon: {
    width: '18px',
    height: '18px',
    color: '#6366F1',
    marginRight: '8px',
  },
  infoTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#4B5563',
  },
  infoList: {
    margin: '0',
    paddingLeft: '20px',
    fontSize: '13px',
    color: '#4B5563',
    lineHeight: '1.6',
  },
  tipText: {
    margin: '10px 0 0',
    fontSize: '13px',
    color: '#4B5563',
    fontStyle: 'italic',
  },
  // Simplified scale controls - one slider that maintains aspect ratio
  scaleControls: {
    marginTop: '20px',
    padding: '15px',
    backgroundColor: '#F9FAFB',
    borderRadius: '8px',
    border: '1px solid #E5E7EB',
  },
  scaleTitle: {
    margin: '0 0 12px 0',
    fontSize: '15px',
    fontWeight: '500',
    color: '#4B5563',
  },
  scaleRow: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  scaleLabel: {
    width: '60px',
    fontSize: '14px',
    color: '#6B7280',
  },
  scaleSlider: {
    flex: 1,
    margin: '0 10px',
    appearance: 'none',
    height: '6px',
    borderRadius: '3px',
    background: '#E5E7EB',
    outline: 'none',
    cursor: 'pointer',
  },
  scaleValue: {
    width: '40px',
    fontSize: '14px',
    color: '#6B7280',
    textAlign: 'right',
  }
};