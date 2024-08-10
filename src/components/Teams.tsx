"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import TeamsDialog from "./TeamsDialog";
import { CirclePlus, Pencil } from "lucide-react";
import { Button } from "./ui/button";
import DeleteTeamDialog from "./DeleteTeamDialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import PlayerDialog from "./PlayerDialog";

export interface Team {
  name: string;
  members?: string[];
}

export default function Teams() {
  const [team1, setTeam1] = useState<Team | null>(null);
  const [team2, setTeam2] = useState<Team | null>(null);

  return (
    <section className="flex w-full flex-col flex-wrap gap-20">
      <h2 className="text-center text-2xl font-extrabold tracking-tight text-white sm:text-[5rem]">
        Equipos
      </h2>

      <div className="flex w-full flex-row items-center justify-between gap-5">
        <TeamCard team={team1} setTeam={setTeam1} />
        <TeamCard team={team2} setTeam={setTeam2} />
      </div>
    </section>
  );
}

function TeamCard({
  team,
  setTeam,
}: {
  team: Team | null;
  setTeam: (team: Team | null) => void;
}) {
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);
  const [playerDialogIsOpen, setPlayerDialogIsOpen] = useState<boolean>(false);

  return (
    <>
      <TeamsDialog
        dialogIsOpen={dialogIsOpen}
        setDialogIsOpen={setDialogIsOpen}
        setTeam={setTeam}
        team={team}
      />

      {!team ? (
        <Card
          onClick={() => setDialogIsOpen(true)}
          className="h-80 w-full hover:cursor-pointer hover:bg-slate-500"
        >
          <CardHeader>
            <CardTitle className="text-center">Crear Equipo</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <CirclePlus className="size-10" />
          </CardContent>
        </Card>
      ) : (
        <Card className="h-80 w-full">
          <CardHeader>
            <div className="flex flex-row items-center justify-between">
              <div className="flex items-center gap-4">
                <CardTitle>{team.name}</CardTitle>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setDialogIsOpen(true)}
                >
                  <Pencil className="size-4" />
                </Button>
              </div>

              <DeleteTeamDialog setTeam={setTeam} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-row items-center gap-4">
              <p>Jugadores 0/5</p>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <PlayerDialog
                      setTeam={setTeam}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Agregar jugador</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
