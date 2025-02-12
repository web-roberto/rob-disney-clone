import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import HomeLayout from "../components/HomeLayout";
import { MovieListType } from "../types/MovieList";
require('dotenv').config()


interface Props {
  movieResults: MovieListType[];
}

export default function Home({ movieResults }: Props) {
  const { data: session, status } = useSession();
  // if (!process.env.NEXT_PUBLIC_API_BASE_URL) return null; //no hagas nada en el 1er despliegue y que me asigne una url vercel y la pondre en variasble entorno de vercel NEXT_PUBLIC_API_BASE_URL
  console.log('----- pages/index.tsx-----Home-NEXT_PUBLIC_API_BASE_URL true- ',process.env.NEXT_PUBLIC_API_BASE_URL)
  console.log('---pages/index.tsx ---getServerSideProps->------GetAllMovies -> Home-> ---movieResults---',movieResults)

  const router = useRouter();
  console.log('---pages/index.tsx ---getServerSideProps->------GetAllMovies -> Home-> ---session---',session)

  useEffect(() => {
    if (!session) {
      // redirect to the homepage
      console.log('---pages/index.tsx ---getServerSideProps->------GetAllMovies -> Home-> ---session-  VOY A REDIDIGIR A LOGIN--',session)

      router.push({
        pathname: "/login",
      });
    }
    return () => {};
  }, []);

  if (status === "loading") return <p>Loading</p>;

  
  if (session)
    return (
      <>
        <HomeLayout movieResults={movieResults} />
      </>
    );
}

const GetAllMovies=async ()=> {
  return await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/movies`).then((res) => res.json());
}
export const getServerSideProps: GetServerSideProps = async () => {
  // let movieResults=[];
  // if (process.env.NEXT_PUBLIC_API_BASE_URL)  { movieResults = await GetAllMovies() }
  console.log('----- pages/index.tsx-----getServerSideProps-NEXT_PUBLIC_API_BASE_URL true- ',process.env.NEXT_PUBLIC_API_BASE_URL)
   const movieResults = await GetAllMovies()
   console.log('------getServerSideProps------GetAllMovies---movieResults---',movieResults)
  return {
    props: {
      movieResults,
    },
  };
};
