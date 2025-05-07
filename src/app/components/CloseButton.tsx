import React from 'react';

interface ButtonProps {
    title: string;
    onPress?: () => void;
}

export default function CloseButton({ title, onPress }: ButtonProps) {
    return (
        <button
            onClick={onPress}
            type="submit"
            className="bg-gradient-to-b cursor-pointer px-4 bg-red-600 hover:bg-red-500 font-medium  text-sm text-white uppercase "
        >
            {title}
        </button>
    );
}
