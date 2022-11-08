import React from "react";

type MasterData = {
  id: number;
};

export const initialMasterData: MasterData = {
  id: 1,
};

export const MasterDataContext = React.createContext(initialMasterData);
