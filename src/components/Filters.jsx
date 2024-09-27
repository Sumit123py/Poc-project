import React, { useState, useEffect, useRef } from 'react';

const Filters = ({ setSelectedOption, selectedOption, setAcademicSearchTerm, setSearchTerm, searchTerm, academicSearchTerm }) => {
  const [showList, setShowList] = useState(false);
  const dropdownRef = useRef(null); // Create a reference to the dropdown container

  // Effect to handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click happened outside the dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowList(false); // Close the dropdown
      }
    };

    // Add event listener when component mounts
    document.addEventListener('mousedown', handleClickOutside);
    
    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="filters" ref={dropdownRef}>
      <p>{selectedOption}</p>
      <p onClick={() => setShowList((prev) => !prev)} className="icon">
        <i className="fa-solid fa-caret-down"></i>
      </p>
      <div style={{ display: showList ? 'flex' : 'none' }} className="dropDown">
        <p
          onClick={() => {
            setSelectedOption('Youtube Videos Links and Articles');
            setShowList(false);
            setSearchTerm(academicSearchTerm)
          }}
        >
          Youtube Videos Links and Articles
        </p>
        <p
          onClick={() => {
            setSelectedOption('Academic Papers');
            setShowList(false);
            setAcademicSearchTerm(searchTerm)
          }}
        >
          Academic Papers
        </p>
      </div>
    </div>
  );
};

export default Filters;
