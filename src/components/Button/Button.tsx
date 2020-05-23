import React from 'react';

import './../Panel/Panel.scss'

type Props= {
    addHandleDot: () => void
}

const Button: React.FC<Props> = ({addHandleDot}) => {
    return (
        <div>
            <button onClick={addHandleDot}> Add point </button>
        </div>
    );
};

export default Button;