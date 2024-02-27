import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import {Button} from "@nextui-org/react";

import {
  NetworkType,
  BeaconEvent,
  defaultEventCallbacks,
} from "@airgap/beacon-dapp";

type ButtonProps = {
  Tezos: TezosToolkit;
  setContract: Dispatch<SetStateAction<any>>;
  setWallet: Dispatch<SetStateAction<any>>;
  setUserAddress: Dispatch<SetStateAction<string>>;
  setUserBalance: Dispatch<SetStateAction<number>>;
  setCandidateAVotes: Dispatch<SetStateAction<number>>;
  setCandidateBVotes: Dispatch<SetStateAction<number>>;
  setTotalVotes: Dispatch<SetStateAction<number>>;
  contractAddress: string;
  setBeaconConnection: Dispatch<SetStateAction<boolean>>;
  setPublicToken: Dispatch<SetStateAction<string | null>>;
  wallet: BeaconWallet;
};

function storeToLocalStorage(conA: number, conB: number, totalV: number) {
  localStorage.setItem("candidateA", conA.toString());
  localStorage.setItem("candidateB", conB.toString());
  localStorage.setItem("totalVote", totalV.toString());
}

const ConnectButton = ({
  Tezos,
  setContract,
  setWallet,
  setUserAddress,
  setUserBalance,
  setCandidateAVotes,
  setCandidateBVotes,
  setTotalVotes,
  contractAddress,
  setBeaconConnection,
  setPublicToken,
  wallet,
}: ButtonProps): JSX.Element => {
  const setup = async (userAddress: string): Promise<void> => {
    setUserAddress(userAddress);
    // updates balance
    const balance = await Tezos.tz.getBalance(userAddress);
    setUserBalance(balance.toNumber());
    // creates contract instance
    const contract = await Tezos.wallet.at(contractAddress);
    const storage: any = await contract.storage();
    setContract(contract);
    storeToLocalStorage(storage.candidateA_votes.toNumber(),storage.candidateB_votes.toNumber(),storage.total_votes.toNumber())
    console.log(balance)
    setCandidateAVotes(storage.candidateA_votes.toNumber());
    setCandidateBVotes(storage.candidateB_votes.toNumber());
    setTotalVotes(storage.total_votes.toNumber());
  };

  const connectWallet = async (): Promise<void> => {
    try {
      await wallet.requestPermissions({
        network: {
          type: NetworkType.GHOSTNET,
          rpcUrl: "https://ghostnet.ecadinfra.com",
        },
      });
      // gets user's address
      const userAddress = await wallet.getPKH();
      await setup(userAddress);
      setBeaconConnection(true);
    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {
    (async () => {
      // creates a wallet instance
      const wallet = new BeaconWallet({
        name: "Taquito React template",
        preferredNetwork: NetworkType.GHOSTNET,
        disableDefaultEvents: false, // Disable all events when true/ UI. This also disables the pairing alert.
      });
      Tezos.setWalletProvider(wallet);
      setWallet(wallet);
      // checks if wallet was connected before
      const activeAccount = await wallet.client.getActiveAccount();
      if (activeAccount) {
        const userAddress = await wallet.getPKH();
        await setup(userAddress);
        setBeaconConnection(true);
      }
    })();
  }, []);

  return (
    <div className="buttons">
      <Button color="primary" variant="ghost" onClick={connectWallet}>
        Connect wallet
      </Button>
    </div>
  );
};



export default ConnectButton;
