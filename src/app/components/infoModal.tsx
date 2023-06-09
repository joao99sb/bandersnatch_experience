"use client";

import Reatc, { useCallback, useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";

import { PlayButton } from "./PlayButton";
import { FavoriteButton } from "./FavoriteButton";
import { useSelector, useDispatch } from "react-redux";
import { setInfoModalStatus } from "../store/infoModal";
import { getMovieFromId } from "../api";
import { AppStore } from "../store/store";
import { MovieInterface } from "./types";

interface InfoModalProps {
  visible?: boolean;
}

export const InfoModal: React.FC<InfoModalProps> = ({ visible }) => {
  const [isVisible, setIsVisible] = useState(!!visible);
  const [movie, setMovie] = useState<MovieInterface>({} as MovieInterface);
  const dispatch = useDispatch();

  const movieId = useSelector((state: AppStore) => state.infoModal.modalId);

  useEffect(() => {
    const movie = getMovieFromId(movieId || 0);
    if (movie) {
      setMovie(movie);
    }
  }, [movieId]);
  useEffect(() => {
    setIsVisible(!!visible);
  }, [visible]);

  const handleClose = useCallback(() => {
    setTimeout(() => {
      dispatch(setInfoModalStatus(false));
    }, 300);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div
      className="
      z-50
      trnasition
      duration-300
      bg-black
      bg-opacity-80
      flex
      justify-center
      items-center
      overflow-x-hidden
      overflow-y-auto
      fixed
      inset-0
    "
    >
      <div
        className="
          relative
          w-auto
          mx-auto
          max-w-3xl
          rounded-md
          overflow-hidden
          
        "
      >
        <div
          className={`
          ${isVisible ? "scale-100" : "scale-0"} 
            transform
            duration-300
            relative
            flex-auto
            bg-zinc-900
            drop-shadow-md
          `}
        >
          <div className="relative h-96">
            <video
              className="
                w-full
                brightness-[60%]
                object-cover
                h-full                
              "
              autoPlay
              muted
              loop
              poster={movie?.thumbnailUrl}
              src={movie?.videoUrl}
            ></video>
          </div>

          <div
            className="
              cursor-pointer
              absolute
              top-3
              right-3
              h-10
              w-10
              rounded-full
              bg-black
              bg-opacity-70
              flex
              items-center
              justify-center
            "
            onClick={handleClose}
          >
            <AiOutlineClose className="text-white" size={20} />
          </div>

          <div
            className="    
              absolute
              bottom-[10%]
              left-10
            "
          >
            <p
              className="
            text-white
              text-3xl
              md:text-4xl
              h-full
              lg:text-5xl
              font-bold
              mb-80
            "
            >
              {movie?.title}
            </p>
            <div
              className="
              flex
              flex-row
              gap-4
              items-center
            
            "
            >
              <PlayButton movieId={movie?.id as number} />

              <FavoriteButton />
            </div>
          </div>
        </div>
        <div className="px-12 py-8  bg-zinc-900">
          <p
            className="
             text-green-400 
              font-semibold
              text-lg
            "
          >
            New
          </p>
          <p className="text-white text-lg">{movie?.duration}</p>
          <p className="text-white text-lg">{movie?.genre}</p>
          <p className="text-white text-lg">{movie?.description}</p>
        </div>
      </div>
    </div>
  );
};
