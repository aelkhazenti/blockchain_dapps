import React, { useState, Dispatch, SetStateAction } from "react";
import { TezosToolkit, WalletContract } from "@taquito/taquito";
import {Button} from "@nextui-org/react";

interface vote_for_candidate_A_Props {
  contract: WalletContract | any;
  setUserBalance: Dispatch<SetStateAction<any>>;
  Tezos: TezosToolkit;
  userAddress: string;
  setStorage: Dispatch<SetStateAction<number>>;
}

const Vote_for_candidate_A = ({ contract, setUserBalance, Tezos, userAddress, setStorage }: vote_for_candidate_A_Props) => {
  const [loadingIncrement, setLoadingIncrement] = useState<boolean>(false);
  const [loadingDecrement, setLoadingDecrement] = useState<boolean>(false);

  const votforCanA = async (): Promise<void> => {
    setLoadingIncrement(true);
    try {
      const op = await contract.methods.vote_for_candidate_A().send();
      await op.confirmation();
      const newStorage: any = await contract.storage();
      if (newStorage) setStorage(newStorage.toNumber());
      setUserBalance(await Tezos.tz.getBalance(userAddress));
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingIncrement(false);
    }
  };

  if (!contract && !userAddress) return <div>&nbsp;</div>;
  return (
    <Button color="primary" variant="ghost" onClick={votforCanA}>
    vote for A
    </Button>

  );
};

export default Vote_for_candidate_A;
