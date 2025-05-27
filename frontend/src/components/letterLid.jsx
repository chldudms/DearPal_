// components/LetterLid.jsx
import React from 'react';

const LetterLid = ({ fill = "#FFCCE1" }) => {
    return (
        <svg 
            width="100%" 
            height="40" 
            viewBox="0 0 350 40" 
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: 'block' }}
        >
            <polygon 
                points="0,40 175,0 350,40" 
                fill={fill} 
                stroke="#aaa" 
                strokeWidth="1.5"
                filter="drop-shadow(0 2px 2px rgba(0,0,0,0.2))"
            />
        </svg>
    );
};

export default LetterLid;
