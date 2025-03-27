import React, { useState } from "react";

function Input() {
    const [inputValue, setInputValue] = useState("");

    return (
        <div>
            <h1>Input Page</h1>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <p>Entered text: {inputValue}</p>
        </div>
    );
}

export default Input;