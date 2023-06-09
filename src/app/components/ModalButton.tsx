"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppStore } from "../store/store";

// declare global {
//   interface Window {
//     nextChunk: (parametro: any) => void;
//   }
// }

interface ModalButtonProps {
  option: string;
}
export const ModalButton: React.FC<ModalButtonProps> = ({ option }) => {

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
      onClick={() => {
        // alert(option);
      }}
    >
      {option}
    </button>
  );
};
