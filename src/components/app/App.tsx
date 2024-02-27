import React, { useState } from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import ConnectButton from "../utils/ConnectWallet";
import DisconnectButton from "../utils/DisconnectWallet";
import {AcmeLogo} from "./logo";
import { TezosToolkit } from "@taquito/taquito";
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";

import Vote_for_candidate_A from "../utils/VoteForA"
import Vote_for_candidate_B from "../utils/VoteForB"

export default function Toti() {

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
      const [candidateA_votes, setCandidateAVotes] = useState(0);
      const [candidateB_votes, setCandidateBVotes] = useState(0);
      const [totalevotes, setTotalVotes] = useState(0);
    
      // Ghostnet Increment/Decrement contract
    //   const contractAddress: string = "KT1A4Xqb17bhA4ohnTkxacHVx5mmmJdtTRzU"
      const contractAddress: string = "KT1Suoju5rDRNDDUnNdSUXmtC891F5QAvsM5"
    
      const generateQrCode = (): { __html: string } => {
        const qr = qrcode(0, "L");
        qr.addData(publicToken || "");
        qr.make();
    
        return { __html: qr.createImgTag(4) };
      };

      if (userAddress && !isNaN(userBalance)) {
        return (
            <><Navbar position="static">
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
                            setBeaconConnection={setBeaconConnection} />
                    </NavbarItem>
                </NavbarContent>
            </Navbar><div className="gap-2 grid grid-cols-2 sm:grid-cols-4">

                    <Card shadow="sm" isPressable onPress={() => console.log("item pressed")}>
                        <CardBody className="overflow-visible">
                            <Image
                                shadow="sm"
                                radius="lg"
                                width="40%"
                                alt="Orange"
                                className="w-full object-cover h-[140px]"
                                src="https://nextui.org/images/fruit-1.jpeg" />
                        </CardBody>
                        <CardFooter className="text-small justify-between">
                            <b>Orange --- { candidateA_votes }</b>
                            <p className="text-default-300">
                                <Vote_for_candidate_A
                                    contract={contract}
                                    setUserBalance={setUserBalance}
                                    Tezos={Tezos}
                                    userAddress={userAddress}
                                    setStorage={setStorage} />
                            </p>
                        </CardFooter>
                    </Card>

                    <Card shadow="sm" isPressable onPress={() => console.log("item pressed")}>
                        <CardBody className="overflow-visible">
                            <Image
                                shadow="sm"
                                radius="lg"
                                width="40%"
                                alt="Tangerine"
                                className="w-full object-cover h-[140px]"
                                src="https://nextui.org/images/fruit-2.jpeg" />
                        </CardBody>
                        <CardFooter className="text-small justify-between">
                            <b>Tangerine --- { candidateB_votes }</b>
                            <p className="text-default-300">
                                <Vote_for_candidate_B
                                    contract={contract}
                                    setUserBalance={setUserBalance}
                                    Tezos={Tezos}
                                    userAddress={userAddress}
                                    setStorage={setStorage} />
                            </p>
                        </CardFooter>
                    </Card>

                </div></>
          );
      }
      else if (!publicToken && !userAddress && !userBalance) {
        return (
            <><Navbar position="static">
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
                            setCandidateAVotes={setCandidateAVotes}
                            setCandidateBVotes={setCandidateBVotes}
                            setTotalVotes={setTotalVotes}
                            contractAddress={contractAddress}
                            setBeaconConnection={setBeaconConnection}
                            wallet={wallet} />
                    </NavbarItem>
                </NavbarContent>
            </Navbar><div className="gap-2 grid grid-cols-2 sm:grid-cols-4">

                    <Card shadow="sm" isPressable onPress={() => console.log("item pressed")}>
                        <CardBody className="overflow-visible">
                            <Image
                                shadow="sm"
                                radius="lg"
                                width="40%"
                                alt="Orange"
                                className="w-full object-cover h-[140px]"
                                src="https://nextui.org/images/fruit-1.jpeg" />
                        </CardBody>
                        <CardFooter className="text-small justify-between">
                            <b>Orange</b>
                            <p className="text-default-300">
                                <Vote_for_candidate_A
                                    contract={contract}
                                    setUserBalance={setUserBalance}
                                    Tezos={Tezos}
                                    userAddress={userAddress}
                                    setStorage={setStorage} />
                            </p>
                        </CardFooter>
                    </Card>

                    <Card shadow="sm" isPressable onPress={() => console.log("item pressed")}>
                        <CardBody className="overflow-visible">
                            <Image
                                shadow="sm"
                                radius="lg"
                                width="40%"
                                alt="Tangerine"
                                className="w-full object-cover h-[140px]"
                                src="https://nextui.org/images/fruit-2.jpeg" />
                        </CardBody>
                        <CardFooter className="text-small justify-between">
                            <b>Tangerine {} </b>
                            <p className="text-default-300">
                                <Vote_for_candidate_B
                                    contract={contract}
                                    setUserBalance={setUserBalance}
                                    Tezos={Tezos}
                                    userAddress={userAddress}
                                    setStorage={setStorage} />
                            </p>
                        </CardFooter>
                    </Card>

                </div></>
            
          );
      } else {

      }

}
