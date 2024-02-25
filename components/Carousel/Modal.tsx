import React from 'react';
import Image from "next/image";
import Button from '../Button';


interface ModalProps {
    imagePath: string;
    onYesClick: () => void;
    onNoClick: () => void;
    show: boolean;
}

const Modal: React.FC<ModalProps> = ({
    imagePath,
    onYesClick,
    onNoClick,
    show
}) => {
    return (
        <div
            className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${show ? "opacity-100" : "opacity-0 pointer-events-none" // Apply opacity and disable pointer events based on 'show' prop
                } transition-opacity duration-300`}
        >
            {/* Modal overlay */}
            <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50"></div>

            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow-md max-w-sm p-8 transition-transform duration-300 transform scale-100 flex flex-col items-center">
                <span
                    className="absolute top-0 right-0 cursor-pointer p-2"
                    onClick={onNoClick}
                >
                    &times;
                </span>
                <p className='p-2'>Is this choice correct?</p>
                <div className='p-2'>
                    <Image
                        src={imagePath}
                        alt={`Character choice`}
                        width={100}
                        height={200}
                        className="rounded-lg shadow-md max-w-full h-auto"
                    />
                </div>
                <div className="flex justify-between w-full mt-4">
                    <Button onClick={onNoClick} bgColor="#55ac78">No</Button>
                    <Button onClick={onYesClick} bgColor="#55ac78">Yes</Button>
                </div>
            </div>
        </div>
    );
};

export default Modal;