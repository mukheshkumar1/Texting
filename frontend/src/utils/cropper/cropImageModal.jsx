import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from './cropImageHelper'; // Helper function to crop the image
import './cropImagemodal.css'; // Import CSS styles

const CropImageModal = ({ imageSrc, onCancel, onCrop }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCrop = async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      onCrop(croppedImage);
    } catch (error) {
      console.error("Crop error:", error);
    }
  };

  return (
    <div className="crop-modal-overlay">
      <div className="crop-modal-content">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={1} // 1:1 ratio for profile pictures
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        />
        <div className="modal-controls">
          <button onClick={onCancel} className="cancel-btn">
            Cancel
          </button>
          <button onClick={handleCrop} className="save-btn">
            Crop & Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CropImageModal;
