import React, { createContext, useContext, useState, ReactNode } from 'react';

const MuteContext = createContext<{
  isMuted: boolean;
  toggleMute: () => void;
}>({
  isMuted: false,
  toggleMute: () => {}
});

export const MuteProvider = ({ children }: { children: ReactNode }) => {
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  return (
    <MuteContext.Provider value={{ isMuted, toggleMute }}>
      {children}
    </MuteContext.Provider>
  );
};

export const useMute = () => useContext(MuteContext);
