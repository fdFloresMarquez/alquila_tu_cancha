import * as React from "react";

export type PlayerContextType = {
  players: number[];
  addPlayer: (key: number) => void;
  removePlayer: (key: number) => void;
};

export const PlayerContext = React.createContext<PlayerContextType | null>(
  null,
);

export function usePlayerContext () {
  const context = React.useContext(PlayerContext)
  if(!context) {
    throw new Error(
      'usePlayerContext debe ser usado dentro de PlayerProvider'
    )
  } 
  return context
}

const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [players, setPlayers] = React.useState<number[]>([]);

  function addPlayer(key: number) {
    setPlayers([...players, key]);
  }

  const removePlayer = (key: number) => {
    const newPlayers = players.filter((playerKey) => playerKey !== key);
    setPlayers(newPlayers);
  };

  return (
    <PlayerContext.Provider value={{ players, addPlayer, removePlayer }}>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerProvider