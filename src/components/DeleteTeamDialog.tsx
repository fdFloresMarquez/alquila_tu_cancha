import { X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { type Team } from "./Teams";
import { usePlayerContext } from "@/context/playersContext";

export default function DeleteTeamDialog({
  team,
  setTeam,
}: {
  team: Team;
  setTeam: (team: Team | null) => void;
}) {
  const { removePlayer } = usePlayerContext();
  function handleDeleteTeam() {
    if (team) {
      team.members?.forEach((player) => {
        removePlayer(player.player_key);
      });
    }
    setTeam(null);
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="icon">
          <X />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Estas seguro/a?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción eliminará el equipo y no se puede recuperar.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant="destructive" onClick={() => handleDeleteTeam()}>
              Eliminar
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
