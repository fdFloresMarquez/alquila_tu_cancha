/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

import { type Team } from "./Teams";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { CirclePlus, LoaderCircle } from "lucide-react";
import { env } from "@/env";
import { type Player } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import PlayerDialogForm from "./PlayerDialogForm";

async function fetchPlayers(playerName: string): Promise<Player[]> {
  return await fetch(
    `https://apiv3.apifootball.com/?action=get_players&player_name=${playerName}&APIkey=${env.NEXT_PUBLIC_FOOTBALL_API_KEY}`,
  )
    .then(async (res) => {
      if (!res.ok) throw new Error("Error en la petición");
      return await res.json();
    })
    .then((data: Player[] | { error: string }) => {
      if ("error" in data) throw new Error("No se encontrarón jugadores");
      return data;
    });
}

export default function PlayerDialog({
  setTeam,
}: {
  setTeam: (team: Team) => void;
}) {
  const [playerName, setPlayerName] = useState<string | null>(null);

  const { isLoading, isError, data } = useQuery({
    queryKey: ["players", playerName],
    queryFn: () => fetchPlayers(playerName!),
    enabled: !!playerName,
  });

  console.log(data);

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline" size="icon">
          <CirclePlus className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Elegir Jugador</DialogTitle>
        </DialogHeader>
        {!playerName && <PlayerDialogForm setPlayerName={setPlayerName} />}

        {isLoading && (
          <div className="flex w-full items-center justify-center">
            <LoaderCircle className="animate-spin" />
          </div>
        )}
        {isError && (
          <>
            <div className="flex w-full items-center justify-center text-destructive">
              No se encontraron jugadores
            </div>
            <DialogFooter className="sm:justify-start">
              <Button variant="outline" onClick={() => setPlayerName(null)}>
                Volver
              </Button>
            </DialogFooter>
          </>
        )}
        {data && (
          <>
            {data.map((player: Player) => (
              <div
                key={player.player_key}
                className="flex w-full items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={player.player_image}
                    alt={player.player_name}
                    className="h-10 w-10 rounded-full"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">
                      {player.player_name}
                    </h3>
                    <p className="text-sm text-gray-400">{player.team_name}</p>
                  </div>
                </div>
              </div>
            ))}
            <DialogFooter className="sm:justify-start">
              <Button variant="outline" onClick={() => setPlayerName(null)}>
                Volver
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
