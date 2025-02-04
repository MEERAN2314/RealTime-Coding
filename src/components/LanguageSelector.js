import React, { useState } from 'react';
import { LANGUAGE_VERSIONS } from "../lib/constants";

const languages = Object.entries(LANGUAGE_VERSIONS);
const ACTIVE_COLOR = "#4299E1"; // equivalent to Chakra's blue.400

const LanguageSelector = ({ language, onSelect }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <div style={{ marginLeft: '8px', marginBottom: '16px' }}>
      <div className='language'>
      <p style={{ marginBottom: '8px', fontSize: '30px',color: '#4aed88' }}>Language:</p></div>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <button
          onClick={toggleDropdown}
          style={{
            padding: '10px 20px',
            backgroundColor: '#EDF2F7',
            border: '1px solid #CBD5E0',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          {language}
        </button>
        <div
          style={{
            position: 'absolute',
            backgroundColor: '#110c1b',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
            borderRadius: '4px',
            marginTop: '4px',
            display: isDropdownVisible ? 'block' : 'none', // Toggle display based on state
            zIndex: 1, // Ensure the dropdown appears above other elements
          }}
          className="menu-list"
        >
          {languages.map(([lang, version]) => (
            <div
              key={lang}
              style={{
                padding: '8px 16px',
                color: lang === language ? ACTIVE_COLOR : '#E2E8F0',
                backgroundColor: lang === language ? '#1A202C' : 'transparent',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              onClick={() => {
                onSelect(lang);
                setIsDropdownVisible(false); // Close dropdown on selection
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#1A202C';
                e.target.style.color = ACTIVE_COLOR;
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = lang === language ? '#1A202C' : 'transparent';
                e.target.style.color = lang === language ? ACTIVE_COLOR : '#E2E8F0';
              }}
            >
              {lang}
              <span style={{ color: '#718096', fontSize: 'small' }}>
                ({version})
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;