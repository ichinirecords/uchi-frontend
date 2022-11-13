import React, { useState } from 'react';
import './Switch.css';

const Switch = ({ approvedArtwork, setApprovedArtwork, backupData, showIntro, setShowIntro }) => {
  let tempArray = [...approvedArtwork]
  const mediaTypes = ['video', 'audio', 'image', 'text'];
  const [checkedMediaTypes, setCheckedMediaTypes] = useState([]);
  const [checkedState, setCheckedState] = useState(
    new Array(mediaTypes.length).fill(true)
  );

  const handleCheckbox = (e, position) => {
    const updatedCheckedState = checkedState.map((checked, index) =>
      index === position ? !checked : checked
    );
    setCheckedState(updatedCheckedState);
    const flatDeep = (arr, d = 1) => {
      return d > 0 ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val), [])
        : arr.slice();
    };
    if (!e.target.checked) {
      const unchecked = tempArray.filter(artWork => artWork.content_type !== mediaTypes[position]);
      const flattened = flatDeep(unchecked, Infinity);
      setApprovedArtwork(flattened);
      setCheckedMediaTypes(flattened);
    } else if (e.target.checked) {
      tempArray = [...backupData]
      const checked = tempArray.filter(artWork => artWork.content_type === mediaTypes[position]);
      tempArray = [...checkedMediaTypes, ...checked]
      const flattened = flatDeep(tempArray, Infinity);
      setApprovedArtwork(flattened);
      setCheckedMediaTypes(flattened);
    };
    if (showIntro) setShowIntro(false);
  };

  return (
    <div className='radio-switch'>
      {mediaTypes.map((mediaType, index) => {
        return (
          <div key={index} className={mediaType}>
            <div>
              <input
                className="switch-checkbox"
                id={index}
                name={mediaType}
                value={mediaType}
                type="checkbox"
                checked={checkedState[index]}
                onChange={(e) => handleCheckbox(e, index)}
              />
              <label
                className="switch-label"
                htmlFor={index}
              >
                <span className={`switch-button`} />
              </label>
            </div>
            <h2>{mediaType}</h2>
          </div>
        )
      })}
    </div>
  );
};

export default Switch;