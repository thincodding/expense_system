import React from 'react';

interface ButtonProps {
    title: string;
    onPress?: () => void;
}

export default function AddNewButton({ title, onPress }: ButtonProps) {
    return (
        <button
            onClick={onPress}
            type="submit"
            className="bg-gradient-to-b cursor-pointer bg-blue-600 hover:bg-blue-500 font-medium p-2 md:p-4 text-white uppercase w-full"
        >
            {title}
        </button>
    );
}
