"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import TeamsDialog from "./TeamsDialog";
import { CirclePlus, Pencil, X } from "lucide-react";
import { Button } from "./ui/button";
import DeleteTeamDialog from "./DeleteTeamDialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import PlayerDialog from "./PlayerDialog";
import { type Player } from "@/types/types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getInitials } from "@/utils/functions";
import { usePlayerContext } from "@/context/playersContext";
import { DeletePlayerDialog } from "./DeletePlayerDialog";

export interface Team {
  name: string;
  members?: Player[];
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
  const { removePlayer } = usePlayerContext()

  function addPlayer(player: Player) {
    if (team) {
      setTeam({
        ...team,
        members: team.members ? [...team.members, player] : [player],
      });
    }
  }

  function deletePlayer(playerKey: Player["player_key"]) {
    if (team) {
      setTeam({
        ...team,
        members: team.members?.filter(
          (player) => player.player_key !== playerKey,
        ),
      });
      removePlayer(playerKey)
    }
  }

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
        <Card className="min-h-80 w-full">
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
              <p>Jugadores {team.members ? team.members.length : 0}/5</p>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <PlayerDialog addPlayer={addPlayer} />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Agregar jugador</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="flex flex-col">
              {team.members?.map((player) => (
                <div
                  key={player.team_key}
                  className="flex w-full items-center justify-between gap-4 border-b p-2 duration-300 hover:cursor-pointer hover:bg-gray-700"
                >
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage
                        src={player.player_image}
                        alt={player.player_name}
                      />
                      <AvatarFallback>
                        {getInitials(player.player_name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold">
                        {player.player_name}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {player.team_name}
                      </p>
                    </div>
                  </div>
                  <div>
                    <DeletePlayerDialog playerKey={player.player_key} deletePlayer={deletePlayer} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
