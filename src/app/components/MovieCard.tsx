"use client";

import React from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { MovieInterface } from "./types";
import { FavoriteButton } from "./FavoriteButton";

interface MovieCardProps {
  movie: MovieInterface;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="group bg-zinc-900 col-span relative h-[12vw]">
      <img
        src={movie.thumbnailUrl}
        alt="thumbnail"
        className="
            cursor-pointer
            object-cover
            transition
            shadow-xl
            rounded-md
            group-hover:opacity-90
            sm:group-hover:opacity-0
            delay-300
            w-full
            h-[12vw]
        "
      />

      <div
        className="
            opacity-0
            absolute
            top-0
            transition
            duration-300
            z-10
            
            w-full
            scale-0
            delay-300
            group-hover:scale-110
            group-hover:-translate-y-[6vw]
            group-hover: translate-x-[2vw]
            group-hover:opacity-100            
        "
      >
        <img
          src={movie.thumbnailUrl}
          alt="thumbnail"
          className="
                cursos-pointer
                object-cover
                transition
                shadow-xl
                rounded-t-md
                w-full
                h-[12vw]
                delay-300
            "
        />
        <div
          className="
            z-10
            bg-zinc-800
            p-2
            lg:p-4
            absolute
            w-full
            transition
            shadow-md
            rounded-b-md
          "
        >
          <div
            className="
              flex
              flex-row
              items-center
              gap-3 
            "
          >
            <div
              onClick={() => {
                console.log("oi");
              }}
              className="
                cursor-pointer
                w-6
                h-6
                lg:w-10
                lg:h-10
                bg-white  
                rounded-full
                flex
                justify-center
                items-center
                transition
                hover:bg-neutral-300
              "
            >
              <BsFillPlayFill size={30} />
            </div>
            <FavoriteButton />
          </div>

          <p
            className="
              text-green-400
              font-semibold
              mt-4
            "
          >
            New <span className=" text-white">2023</span>
          </p>

          <div
            className="
              flex
              flex-row
              mt-4
              gap-2
              items-center  
            "
          >
            <p
              className="
               text-white
                text-[10px]
                lg:text-sm
              "
            >
              {movie.duration}
            </p>
          </div>

          <div
            className="
              flex
              flex-row
              mt-4
              gap-2
              items-center  
            "
          >
            <p
              className="
               text-white
                text-[10px]
                lg:text-sm
              "
            >
              {movie.genre}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
