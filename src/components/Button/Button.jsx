import React from 'react';

const Button = ({addHandleDot}) => {
    return (
        <div>
            <button onClick={addHandleDot}> Add point </button>
        </div>
    );
};

export default Button;