import React from 'react';

import './../Panel/Panel.scss';

type Props = {
    value?: string,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleKeyPress: (e:React.KeyboardEvent<HTMLInputElement>) => void
}

const Input: React.FC<Props> = ({value, handleChange, handleKeyPress}) => {

    return (
        <div>
            <input type="text"  placeholder='Name point' value={value} onChange={handleChange} onKeyPress={handleKeyPress}/>
        </div>
    );
};

export default Input;