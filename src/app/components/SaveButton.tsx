import React from 'react';

interface ButtonProps {
    title: string;
    onPress?: () => void;
}

export default function SaveButton({ title, onPress }: ButtonProps) {
    return (
        <button
            onClick={onPress}
            type="submit"
            className="bg-gradient-to-b cursor-pointer bg-green-600 hover:bg-green-500 font-medium p-2 md:p-2 text-sm text-white uppercase "
        >
            {title}
        </button>
    );
}
