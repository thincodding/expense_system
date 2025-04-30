'use client';

import React from 'react';

interface TextFormInputProps {
    type?: string;
    placeholder: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    id?: string;
    name?: string;
}

const TextFormInput: React.FC<TextFormInputProps> = ({
    type = 'text',
    placeholder,
    value,
    onChange,
    id,
    name,
}) => {
    return (
        <div>
     
         
            {/* Input */}
            <input
                required
                id={id}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="bg-gray-200 text-gray-800 pl-12 py-2 md:py-4 focus:outline-none w-full rounded"
            />
        </div>
    );
};

export default TextFormInput;
