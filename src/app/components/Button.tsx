import React from 'react';

interface ButtonProps {
    title: string;
    onPress?: () => void;
}

export default function Button({ title, onPress }: ButtonProps) {
    return (
        <button
            onClick={onPress}
            type="submit"
            className="bg-gradient-to-b cursor-pointer from-gray-700 to-gray-900 font-medium p-2 md:p-4 text-white uppercase w-full"
        >
            {title}
        </button>
    );
}
