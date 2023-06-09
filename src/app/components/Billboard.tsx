import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { MovieInterface } from "./types";
import { getMovies } from "../api";
import { PlayButton } from "./PlayButton";
import { setInfoModalMovieId, setInfoModalStatus } from "../store/infoModal";
import { AppStore } from "../store/store";
const getBillboard = (): MovieInterface => {
  const moviesData = getMovies();

  const movieCount = moviesData.length;
  const randomIndex = Math.floor(Math.random() * movieCount);
  const randomFilm = moviesData[randomIndex];
  return randomFilm;
};
export const Billboard = () => {
  const [randomFilm, setRandomFilm] = useState<MovieInterface>(
    {} as MovieInterface
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const movie = getBillboard();
    setRandomFilm(movie);
  }, [randomFilm]);

  const handleInfoModal = useCallback(() => {
    (randomFilm.id);
    dispatch(setInfoModalMovieId(randomFilm.id));
    dispatch(setInfoModalStatus(true));
  }, [randomFilm]);

  return (
    <div className="relative h-[56.25vw]">
      <video
        className="
            w-full
            h-[56.25vw]
            object-cover
            brightness-[60%]
        "
        autoPlay
        muted
        loop
        poster={randomFilm?.thumbnailUrl}
        src={randomFilm?.videoUrl}
      ></video>

      <div
        className="
        absolute
        top-[30%]
        md:top-[40%]
        md:ml-16
      "
      >
        <p
          className="
        text-white
        text-1xl
        md:text-5xl
        h-full
        w-[50%]
        lg:text-6xl
        font-bold
        drop-shadow-xl
        "
        >
          {randomFilm.title}
        </p>
        <p
          className="text-white
            text-[8px]
            md:text-lg
            mt-3
            md:mt-8
            w-[90%]
            md:w-[80%]
            lg:w-[50%]
            drop-shadow-xl
            "
        >
          {randomFilm.description}
        </p>

        <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
          <PlayButton movieId={randomFilm.id} />
          <button
            onClick={handleInfoModal}
            className="
            bg-white
            text-white
            bg-opacity-30
            rounded-md 
            py-1  md:py-2
            px-2  md:px-4
            w-aouto
            text-xs lg:text-lg
            font-semibold
            flex
            flex-row
            items-center
            hover:bg-opacity-20
            transition
          "
          >
            <AiOutlineInfoCircle className="mr-1" />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};
