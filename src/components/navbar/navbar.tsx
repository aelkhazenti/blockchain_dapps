import React, { useState } from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import ConnectButton from "../utils/ConnectWallet";
import DisconnectButton from "../utils/DisconnectWallet";
import {AcmeLogo} from "./logo";
import { TezosToolkit } from "@taquito/taquito";

export default function Nav() {

    const [Tezos, setTezos] = useState<TezosToolkit>(
        new TezosToolkit("https://ghostnet.ecadinfra.com")
      );
      const [contract, setContract] = useState<any>(undefined);
      const [publicToken, setPublicToken] = useState<string | null>(null);
      const [wallet, setWallet] = useState<any>(null);
      const [userAddress, setUserAddress] = useState<string>("");
      const [userBalance, setUserBalance] = useState<number>(0);
      const [storage, setStorage] = useState<number>(0);
      const [copiedPublicToken, setCopiedPublicToken] = useState<boolean>(false);
      const [beaconConnection, setBeaconConnection] = useState<boolean>(false);
      const [activeTab, setActiveTab] = useState<string>("transfer");
    
      // Ghostnet Increment/Decrement contract
      const contractAddress: string = "KT1A4Xqb17bhA4ohnTkxacHVx5mmmJdtTRzU"
    
      const generateQrCode = (): { __html: string } => {
        const qr = qrcode(0, "L");
        qr.addData(publicToken || "");
        qr.make();
    
        return { __html: qr.createImgTag(4) };
      };

      if (userAddress && !isNaN(userBalance)) {
        return (
            <Navbar position="static">
              <NavbarBrand>
                <AcmeLogo />
                <p className="font-bold text-inherit">Les enneigés</p>
              </NavbarBrand>
              <NavbarContent className=" sm:flex gap-4" justify="center">
                <NavbarItem>
                  <Link color="foreground" href={`https://ghostnet.tzkt.io/${userAddress}/operations/`}>
                        {userAddress}
                  </Link>
                </NavbarItem>
                <NavbarItem isActive>
                  <Link href="#" aria-current="page">
                        {(userBalance / 1000000).toLocaleString("en-US")} ꜩ
                  </Link>
                </NavbarItem>
                <NavbarItem>
                  <Link color="foreground" href={`https://better-call.dev/ghostnet/${contractAddress}/operations`}>
                        {contractAddress}
                  </Link>
                </NavbarItem>
              </NavbarContent>
              <NavbarContent justify="end">
                <NavbarItem className="hidden lg:flex">
                  <Link href="#">Login</Link>
                </NavbarItem>
                <NavbarItem>
                <DisconnectButton
                    wallet={wallet}
                    setPublicToken={setPublicToken}
                    setUserAddress={setUserAddress}
                    setUserBalance={setUserBalance}
                    setWallet={setWallet}
                    setTezos={setTezos}
                    setBeaconConnection={setBeaconConnection}
                />
                </NavbarItem>
              </NavbarContent>
            </Navbar>
          );
      }
      else if (!publicToken && !userAddress && !userBalance) {
        return (
            <Navbar position="static">
              <NavbarBrand>
                <AcmeLogo />
                <p className="font-bold text-inherit">Les enneigés </p>
              </NavbarBrand>

              <NavbarContent justify="end">
                <NavbarItem className="hidden lg:flex">
                  <Link href="#">Login</Link>
                </NavbarItem>
                <NavbarItem>
                <ConnectButton
                    Tezos={Tezos}
                    setContract={setContract}
                    setPublicToken={setPublicToken}
                    setWallet={setWallet}
                    setUserAddress={setUserAddress}
                    setUserBalance={setUserBalance}
                    setStorage={setStorage}
                    contractAddress={contractAddress}
                    setBeaconConnection={setBeaconConnection}
                    wallet={wallet}
                  />
                </NavbarItem>
              </NavbarContent>
            </Navbar>
          );
      } else {
        return <div>An error has occurred</div>;
      }

}
