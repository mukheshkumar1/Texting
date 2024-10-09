import { useState } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../../pages/profile-page/getCroppedimg'; // Import the utility function

const ImageCropperComponent = ({ imageSrc, onCropComplete }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const handleCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleCropAndSave = async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      onCropComplete(croppedImage); // Pass the cropped image back to the parent component or handle it as needed
    } catch (error) {
      console.error('Error cropping image:', error);
    }
  };

  return (
    <div className="crop-container">
      <Cropper
        image={imageSrc}
        crop={crop}
        zoom={zoom}
        aspect={1}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={handleCropComplete}
      />
      <button onClick={handleCropAndSave} className="mt-2 p-2 bg-blue-500 text-white rounded">
        OK
      </button>
    </div>
  );
};

export default ImageCropperComponent;
