import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { MovieInterface } from "./types";
import { getMovieFromId } from "../api";
import { PlayButton } from "./PlayButton";
import { setInfoModalMovieId, setInfoModalStatus } from "../store/infoModal";
import MANIFEST from "../streaming/manifest.json";
import { Network } from "../lib";

const localhost = ["127.0.0.1", "localhost"];

export const Billboard = () => {
  const [movie, setMovie] = useState<MovieInterface>({} as MovieInterface);
  const dispatch = useDispatch();

  const isLocal = !!~localhost.indexOf(globalThis.window?.location.hostname);

  const host = isLocal ? MANIFEST.localHost : MANIFEST.productionHost;
  const network = new Network(host);

  useEffect(() => {
    const moviesData = getMovieFromId(5) as MovieInterface;

    const url = "$HOST/videos/Black_Mirror_Bandersnatch_Trailer.mp4";
    const finalUrl = network.parseBillBoardManifestURL({
      hostTag: MANIFEST.hostTag,
      url,
    });

    moviesData.videoUrl = finalUrl;
    setMovie(moviesData);

  }, [movie]);

  const handleInfoModal = useCallback(() => {
    dispatch(setInfoModalMovieId(movie));
    dispatch(setInfoModalStatus(true));
  }, [movie]);

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
        poster={movie?.thumbnailUrl}
        src={movie?.videoUrl}
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
          {movie.title}
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
          {movie.description}
        </p>

        <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
          <PlayButton movieId={movie.id} />
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
