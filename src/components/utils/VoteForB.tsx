import React, { useState, Dispatch, SetStateAction } from "react";
import { TezosToolkit, WalletContract } from "@taquito/taquito";
import { Button } from "@nextui-org/react";

interface vote_for_candidate_B_Props {
  contract: WalletContract | any;
  setUserBalance: Dispatch<SetStateAction<any>>;
  Tezos: TezosToolkit;
  userAddress: string;
  setStorage: Dispatch<SetStateAction<number>>;
}

const Vote_for_candidate_B = ({ contract, setUserBalance, Tezos, userAddress, setStorage }: vote_for_candidate_B_Props) => {
  const [loadingIncrement, setLoadingIncrement] = useState<boolean>(false);
  const [loadingDecrement, setLoadingDecrement] = useState<boolean>(false);

  const votforB = async (): Promise<void> => {

    setLoadingIncrement(true);
    try {
      const op = await contract.methods.vote_for_candidate_B().send();
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
    <Button color="primary" variant="ghost" onClick={votforB}>
    Vote For B
  </Button>
  );
};

export default Vote_for_candidate_B;
