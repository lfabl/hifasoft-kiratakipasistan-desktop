import React from 'react';
import {
    library
} from '@fortawesome/fontawesome-svg-core';
import {
    fas
} from '@fortawesome/free-solid-svg-icons';
import {
    FontAwesomeIcon 
} from '@fortawesome/react-fontawesome';

library.add(fas);

const Icon = ({
    type, name, size, color, style, ...props 
}) => {
    const sizeType = typeof size === "number";
    return <FontAwesomeIcon
        {...props}
        icon={[type, name]}
        size={sizeType ? null : size}
        style={{
            width: sizeType ? size : null,
            height: sizeType ? size : null,
            color: color,
            ...style
        }}
        color="white"
    />;
};
export default Icon;