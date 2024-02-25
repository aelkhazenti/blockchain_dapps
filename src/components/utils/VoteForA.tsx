import React, { useState, Dispatch, SetStateAction } from "react";
import { TezosToolkit, WalletContract } from "@taquito/taquito";

interface vote_for_candidate_A_Props {
  contract: WalletContract | any;
  setUserBalance: Dispatch<SetStateAction<any>>;
  Tezos: TezosToolkit;
  userAddress: string;
  setStorage: Dispatch<SetStateAction<number>>;
}

const vote_for_candidate_A = ({ contract, setUserBalance, Tezos, userAddress, setStorage }: vote_for_candidate_A_Props) => {
  const [loadingIncrement, setLoadingIncrement] = useState<boolean>(false);
  const [loadingDecrement, setLoadingDecrement] = useState<boolean>(false);

  const votforA = async (): Promise<void> => {
    setLoadingIncrement(true);
    try {
      const op = await contract.methods.increment(1).send();
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
    <div className="buttons">
      <button className="button" disabled={loadingIncrement} onClick={votforA}>
        {loadingIncrement ? (
          <span>
            <i className="fas fa-spinner fa-spin"></i>&nbsp; Please wait
          </span>
        ) : (
          <span>
            <i className="fas fa-plus"></i>&nbsp; Bote for Orange
          </span>
        )}
      </button>
    </div>
  );
};

export default vote_for_candidate_A;
