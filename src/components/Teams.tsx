"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import TeamsDialog from "./TeamsDialog";
import { CirclePlus } from "lucide-react";

import { type Player } from "@/types/types";
import TeamCard from "./TeamCard";
import { toast } from "sonner";

export interface Team {
  name: string;
  members?: Player[];
}

export default function Teams() {
  const [isTeam1Complete, setIsTeam1Complete] = useState<boolean>(false);
  const [isTeam2Complete, setIsTeam2Complete] = useState<boolean>(false);

  useEffect(() => {
    if (isTeam1Complete && isTeam2Complete) {
      toast.success("Equipos armados y listos para jugar!");
    }
  }, [isTeam1Complete, isTeam2Complete]);

  return (
    <section className="flex w-full flex-col flex-wrap gap-20">
      {isTeam1Complete && isTeam2Complete ? (
        <h2 className="text-center text-2xl font-extrabold tracking-tight text-green-500 sm:text-[5rem]">
          Equipos Completados!
        </h2>
      ) : (
        <h2 className="text-center text-2xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Equipos
        </h2>
      )}

      <div className="flex max-h-full min-h-96 w-full flex-col items-start justify-between gap-5 sm:flex-row">
        <CreateTeamCard setIsTeamComplete={setIsTeam1Complete} />
        <CreateTeamCard setIsTeamComplete={setIsTeam2Complete} />
      </div>
    </section>
  );
}

interface CreateTeamCardProps {
  setIsTeamComplete: Dispatch<SetStateAction<boolean>>;
}

function CreateTeamCard({ setIsTeamComplete }: CreateTeamCardProps) {
  const [team, setTeam] = useState<Team | null>(null);
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (team?.members && team?.members?.length > 4) {
      setIsTeamComplete(true);
    } else {
      setIsTeamComplete(false);
    }
  }, [team?.members?.length]);

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
        <TeamCard
          team={team}
          setTeam={setTeam}
          setDialogIsOpen={setDialogIsOpen}
        />
      )}
    </>
  );
}
