/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";

import { DialogTrigger } from "@radix-ui/react-dialog";
import { CirclePlus, LoaderCircle } from "lucide-react";
import { env } from "@/env";
import { type Player } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import PlayerDialogForm from "./PlayerDialogForm";
import { ScrollArea } from "./ui/scroll-area";
import PlayerListItem from "./PlayerListItem";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getInitials } from "@/utils/functions";

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
  addPlayer,
}: {
  addPlayer: (player: Player) => void;
}) {
  const [playerName, setPlayerName] = useState<string | null>(null);
  const [playerSelected, setPlayerSelected] = useState<Player | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { isLoading, isError, data } = useQuery({
    queryKey: ["players", playerName],
    queryFn: () => fetchPlayers(playerName!),
    enabled: !!playerName,
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
        {data && !playerSelected && (
          <>
            <ScrollArea className="h-72 w-full rounded-md border">
              {data.map((player: Player) => (
                <PlayerListItem
                  key={`${player.player_key}-${player.team_name}`}
                  player={player}
                  setPlayer={setPlayerSelected}
                />
              ))}
            </ScrollArea>

            <DialogFooter className="sm:justify-start">
              <Button variant="outline" onClick={() => setPlayerName(null)}>
                Volver
              </Button>
            </DialogFooter>
          </>
        )}

        {playerSelected && (
          <>
            <div className="flex items-center justify-center">
              <Avatar>
                <AvatarImage
                  src={playerSelected.player_image}
                  alt={playerSelected.player_name}
                />
                <AvatarFallback>
                  {getInitials(playerSelected.player_name)}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex flex-row items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">
                  {playerSelected.player_name}
                </h3>
                <p className="text-sm text-gray-400">
                  {playerSelected.team_name}
                </p>
                <p className="text-sm text-gray-400">
                  Edad: {playerSelected.player_age}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">
                  Rating: {playerSelected.player_rating}
                </h3>
                <p className="text-sm text-gray-400">
                  Goles: {playerSelected.player_goals}
                </p>
                <p className="text-sm text-gray-400">
                  Numero: {playerSelected.player_number}
                </p>
              </div>
            </div>
            <DialogFooter className="sm:justify-between">
              <Button variant="outline" onClick={() => setPlayerSelected(null)}>
                Cancelar
              </Button>
              <Button
                onClick={() => {
                  addPlayer(playerSelected);
                  setIsOpen(false);
                }}
              >
                Agregar Jugador
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
