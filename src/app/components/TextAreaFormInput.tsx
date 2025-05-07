'use client';

import React from 'react';

interface TextFormInputProps {
    placeholder: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    id?: string;
    name?: string;
}

const TextAreaFormInput: React.FC<TextFormInputProps> = ({
    placeholder,
    value,
    onChange,
    id,
    name,
}) => {
    return (
        <div>
            <textarea
      
                id={id}
                name={name}
                rows={5}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="bg-gray-200 text-gray-800 pl-12 py-2 md:py-4 focus:outline-none w-full rounded"
            ></textarea>
        </div>
    );
};

export default TextAreaFormInput;
