import React, { Dispatch, SetStateAction } from "react";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { TezosToolkit } from "@taquito/taquito";
import {Button} from "@nextui-org/react";


interface ButtonProps {
  wallet: BeaconWallet | null;
  setPublicToken: Dispatch<SetStateAction<string | null>>;
  setUserAddress: Dispatch<SetStateAction<string>>;
  setUserBalance: Dispatch<SetStateAction<number>>;
  setWallet: Dispatch<SetStateAction<any>>;
  setTezos: Dispatch<SetStateAction<TezosToolkit>>;
  setBeaconConnection: Dispatch<SetStateAction<boolean>>;
}

const DisconnectButton = ({
  wallet,
  setPublicToken,
  setUserAddress,
  setUserBalance,
  setWallet,
  setTezos,
  setBeaconConnection
}: ButtonProps): JSX.Element => {
  const disconnectWallet = async (): Promise<void> => {
    if (wallet) {
      await wallet.clearActiveAccount();
    }
    setUserAddress("");
    setUserBalance(0);
    setWallet(null);
    const tezosTK = new TezosToolkit("https://ghostnet.ecadinfra.com");
    setTezos(tezosTK);
    setBeaconConnection(false);
    setPublicToken(null);
  };

  return (
    <div className="buttons">
      <Button color="primary" variant="ghost" onClick={disconnectWallet}>
      Disconnect wallet
      </Button>

    </div>
  );
};

export default DisconnectButton;
