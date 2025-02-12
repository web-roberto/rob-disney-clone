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
    console.log('############modulo ppal ##### process.env.NEXT_PUBLIC_API_BASE_URL',process.env.NEXT_PUBLIC_API_BASE_URL)

  console.log('################# props recibido de el componente ppal',movieResults)

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
  //console.log('###########GetStaticPaths###### process.env.NEXT_PUBLIC_API_BASE_URL',process.env.NEXT_PUBLIC_API_BASE_URL)

  //const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/movies`);
  //const res = await fetch(`http://localhost:3000/api/movies`);

  //const movieData = await res.json();

  const movieData = await GetAllMovies();


  //console.log('################# movieData en getStaticPaths',movieData)
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
  //console.log('###########getStaticProps###### process.env.NEXT_PUBLIC_API_BASE_URL',process.env.NEXT_PUBLIC_API_BASE_URL)

  const { id } = context.params as IParams;
  //console.log('################# context.params en getStaticProps',{context})

  const movieResults = await GetOneMovies(id);
 // console.log('################# movieResults en getStaticProps',movieResults)

  return {
    props: {
      movieResults,
    },
    revalidate: 1000,
  };
};
