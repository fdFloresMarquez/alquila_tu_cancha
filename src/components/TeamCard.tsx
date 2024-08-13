import { Check, Pencil } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import DeleteTeamDialog from "./DeleteTeamDialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import PlayerDialog from "./PlayerDialog";
import TeamPlayerItem from "./TeamPlayerItem";
import { type Team } from "./Teams";
import { usePlayerContext } from "@/context/playersContext";
import { type Player } from "@/types/types";
import { cn } from "@/lib/utils";

interface TeamCardProps {
  team: Team;
  setTeam: (team: Team | null) => void;
  setDialogIsOpen: (isOpen: boolean) => void;
}

export default function TeamCard({
  team,
  setTeam,
  setDialogIsOpen,
}: TeamCardProps) {
  const { removePlayer } = usePlayerContext();
  const isTeamComplete = team.members && team.members?.length > 4

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
      removePlayer(playerKey);
    }
  }

  return (
    <Card className={cn("min-h-80 w-full", {
      'border-green-500':isTeamComplete
    })}>
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

          <DeleteTeamDialog team={team} setTeam={setTeam} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row items-center gap-4">
          <p>Jugadores {team.members ? team.members.length : 0}/5</p>

          {isTeamComplete ? (
            <Check className="text-green-500" />
          ) : (
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
          )}
        </div>

        <div className="flex flex-col">
          {team.members?.map((player) => (
            <TeamPlayerItem
              key={player.player_key}
              player={player}
              deletePlayer={deletePlayer}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
