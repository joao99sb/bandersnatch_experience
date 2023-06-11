"use client";
import React, { useEffect, useState } from "react";

interface ModalButtonProps {
  option: string;
  nextChunck: any;
}
export const ModalButton: React.FC<ModalButtonProps> = ({
  option,
  nextChunck,
}) => {
  return (
    <button
      className="
        bg-white
        opacity-80
        rounded-md
        py-1 md:py-2
        px-2 md:px-4
        w-[10rem]
        h-[5rem]
        text-lg lg:text-[1.5rem]
        font-bold        

        flex
        flex-row
        items-center
        justify-center
        hover:bg-neutral-300
        transition

        "
      onClick={() => nextChunck(option)}
    >
      {option}
    </button>
  );
};
