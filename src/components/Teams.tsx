"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import TeamsDialog from "./TeamsDialog";

interface Team {
  id: string;
  name: string;
  description: string;
  members: string[];
}

export default function Teams() {
  const [team1, setTeam1] = useState<Team | null>(null);
  const [team2, setTeam2] = useState<Team | null>(null);
  return (
    <>
      <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-[5rem]">
        Equipos
      </h2>

      <div className="flex w-full flex-row items-center justify-between gap-5">
        <TeamCard team={team1} />
        <TeamCard team={team2} />
      </div>
    </>
  );
}

function TeamCard({ team }: { team: Team | null }) {
  return !team ? (
    <TeamsDialog />
  ) : (
    <Card className="h-80 w-full">
      <CardHeader>
        <CardTitle>Equipo</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
}
