import { getInitials } from "@/utils/functions";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { type Dispatch, type SetStateAction } from "react";
import { type Player } from "@/types/types";

interface PlayerItemProps extends React.HTMLAttributes<HTMLDivElement> {
  player: Player;
  setPlayer: Dispatch<SetStateAction<Player | null>>
}

export default function PlayerListItem({
  player,
  setPlayer
}: PlayerItemProps) {
  return (
    <div onClick={() => setPlayer(player)} className="flex w-full items-center justify-between gap-4 border-b p-2 duration-300 hover:cursor-pointer hover:bg-gray-700">
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src={player.player_image} alt={player.player_name} />
          <AvatarFallback>{getInitials(player.player_name)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-lg font-semibold">{player.player_name}</h3>
          <p className="text-sm text-gray-400">{player.team_name}</p>
        </div>
      </div>
    </div>
  );
}
