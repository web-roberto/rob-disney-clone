import { GetStaticPaths, GetStaticProps } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import React, { useEffect } from "react";
import FilmLayout from "../../components/FilmLayout";
import { MovieListType } from "../../types/MovieList";
require('dotenv').config()

interface Props {
  movieResults: MovieListType;
}

export default function MovieInformation({ movieResults }: Props) {
  const { data: session, status } = useSession();
  const router = useRouter();
   // console.log('############modulo ppal ##### process.env.NEXT_PUBLIC_API_BASE_URL',process.env.NEXT_PUBLIC_API_BASE_URL)

  //console.log('################# props recibido de el componente ppal',movieResults)

  useEffect(() => {
    if (!session) {
      // redirect to the login page
      router.push({
        pathname: "/login",
      });
    }
    return () => {};
  }, []);

  if (status === "loading") return <p>Loading</p>;

  if (session) return <FilmLayout movieResults={movieResults} />;
}



const GetAllMovies=async ()=> {
  return await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/movies`).then((res) => res.json());
}
const GetOneMovies=async (id:string)=> {
  return await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/movies/${id}`).then((res) => res.json());
}
export const getStaticPaths: GetStaticPaths = async () => {
  //## incio ################# para el primer despliegue: ###############
  let movieData=[];
  if (process.env.NEXT_PUBLIC_API_BASE_URL)   { movieData = await GetAllMovies();}
  //## fin ################# para el primer despliegue: ###############

  const paths = movieData?.map((movie: MovieListType) => ({
    params: { id: String(movie.id) },
  }));

  return {
    paths,
    fallback: false,
  };
};

interface IParams extends ParsedUrlQuery {
  id: string;
}


export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as IParams;

  //## incio ################# para el primer despliegue: ###############
  let movieResults=[];
  if (process.env.NEXT_PUBLIC_API_BASE_URL) {movieResults = await GetOneMovies(id);}
  //## fin ################# para el primer despliegue: ###############
   

  return {
    props: {
      movieResults,
    },
    revalidate: 1000,
  };
};
