import React from 'react';

import './../Panel/Panel.scss';

const Input = ({value, handleChange, handleKeyPress}) => {

    return (
        <div>
            <input type="text"  placeholder='Name point' value={value} onChange={handleChange} onKeyPress={handleKeyPress}/>
        </div>
    );
};

export default Input;