import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ handleInput, handleSubmit }) => {
  return (
    <div>
      <div>
        <p className="f3">
          {'This Magic Brain will dectect faces in your picture'}
        </p>
      </div>
      <div className="center">
        <div className="center form  pa4 br3 shadow-2">
          <input
            className="f4 pa2 w-70 center"
            type="text"
            placeholder="URL"
            onChange={handleInput}
          />
          <button
            className="w-30  grow link ph3 pv2 dib white bg-light-purple"
            onClick={handleSubmit}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
