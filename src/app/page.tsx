'use client'
import Teams from "@/components/Teams";
import PlayerProvider from "@/context/playersContext";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center  text-white ">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-center text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Bienvenido a Alquila Tu Cancha!
        </h1>

        <PlayerProvider>
          <Teams />
        </PlayerProvider>
      </div>
    </main>
  );
}

