import React, { ReactNode, useContext } from "react";
import { MasterDataContext } from "../contexts/master_data_context";
import { useEffect } from "react";
import { useState } from "react";
import { useEffectSkipFirst, useForm } from "utils/hooks";

import { GlobalStateContext } from "contexts/global_state_context";

type MasterDataContainerProps = {
  children: ReactNode;
};

const MasterDataContainer: React.FC<MasterDataContainerProps> = (
  props: MasterDataContainerProps
) => {
  const globalState = useContext(GlobalStateContext);

  // useEffect(() => {}, []);

  return (
    <MasterDataContext.Provider value={{ id: 1 }}>
      {props.children}
    </MasterDataContext.Provider>
  );
};

export default MasterDataContainer;
