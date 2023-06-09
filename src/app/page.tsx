"use client";
import { Navbar } from "./components/Navbar";
import { Billboard } from "./components/Billboard";
import { getMovies } from "./api";
import { MovieList } from "./components/MovieList";
import { InfoModal } from "./components/infoModal";
import { useSelector, useDispatch } from "react-redux";
import { AppStore } from "./store/store";
import { setInfoModalMovieId, setInfoModalStatus } from "./store/infoModal";

export default function Home() {
  const moviesData = getMovies();
  const isOpen = useSelector(
    (state: AppStore) => state.infoModal.infoModalStatus
  );


  return (
    <>
      <InfoModal visible={isOpen} />
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending Nows" data={moviesData} />
      </div>
    </>
  );
}
