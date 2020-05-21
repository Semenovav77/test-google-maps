import React from 'react';

import './../Panel/Panel.scss'

const Button = ({addHandleDot}) => {
    return (
        <div>
            <button onClick={addHandleDot}> Add point </button>
        </div>
    );
};

export default Button;