"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { getMovieFromId } from "@/app/api";

interface WatchParams {
  params: {
    movieId: number;
  };
}

export default function Watch({ params }: WatchParams) {
  const router = useRouter();
  const movie = getMovieFromId(params.movieId);
  return (
    <div
      className="
        h-screen
        w-screen
      bg-black
      "
    >
      <nav
        className="
          fixed
          w-full
          p-4
          z-10
          flex
          flex-row
          items-center
          gap-8
          bg-black
          bg-opacity-70
        "
      >
        <AiOutlineArrowLeft
          className="text-white cursor-pointer"
          size={40}
          onClick={() => router.back()}
        />
        <p className=" text-white text-1xl md:text-3xl font-bold ">
          <span className=" font-light ">Whatching: </span>
          {movie?.title}
        </p>
      </nav>

      <video
        autoPlay
        controls
        controlsList="nodownload"
        className="h-full w-fill"
        src={movie?.videoUrl}
      ></video>
    </div>
  );
}
