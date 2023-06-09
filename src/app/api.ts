import moviesData from "../../database/movies.json";

export const getMovies = () => {
  return moviesData;
};

export const getMovieFromId = (id: number) => {
  if (id === 0) {
    return null;
  }
  return moviesData.find((movie) => movie.id == id);
};
