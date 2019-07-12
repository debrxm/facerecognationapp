import React from 'react';
import './FaceRecognation.css';
const FaceRecognation = ({ image, box }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img id="inputImage" src={image} alt="" width="500px" height="auto" />
        <div
          className="bounding_box"
          style={{
            top: box.topRow,
            bottom: box.bottomRow,
            left: box.leftCol,
            right: box.rightCol
          }}
        />
      </div>
    </div>
  );
};

export default FaceRecognation;
