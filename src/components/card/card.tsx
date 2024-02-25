import React, { useState } from "react";
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";
import vote_for_candidate_A from "../utils/VoteForA"
import vote_for_candidate_B from "../utils/VoteForB"
import { TezosToolkit } from "@taquito/taquito";


export default function CandidateCard() {

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
  const contractAddress: string = "KT1QMGSLynvwwSfGbaiJ8gzWHibTCweCGcu8";

  const list = [
    {
      title: "Orange",
      img: "https://nextui.org/images/fruit-1.jpeg",
      price: "$5.50",
    },
    {
      title: "Tangerine",
      img: "https://nextui.org/images/fruit-2.jpeg",
      price: "$3.00",
    }
  ];

  

  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">

        <Card  shadow="sm" isPressable onPress={() => console.log("item pressed")}>
          <CardBody className="overflow-visible">
            <Image
              shadow="sm"
              radius="lg"
              width="40%"
              alt="Orange"
              className="w-full object-cover h-[140px]"
              src="https://nextui.org/images/fruit-1.jpeg"
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>Orange</b>
            <p className="text-default-300">--</p>
          </CardFooter>
        </Card>

        <Card  shadow="sm" isPressable onPress={() => console.log("item pressed")}>
          <CardBody className="overflow-visible">
            <Image
              shadow="sm"
              radius="lg"
              width="40%"
              alt="Tangerine"
              className="w-full object-cover h-[140px]"
              src="https://nextui.org/images/fruit-2.jpeg"
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>Tangerine</b>
            <p className="text-default-300">---</p>
          </CardFooter>
        </Card>
    </div>
  );
}


// export const  voteCandidateAOperation = async () => {
//   try {
//       const contractInstance = await tezos.wallet.at(contractAddress);
//       const op = await contractInstance.methods.vote_for_candidate_A().send();
//       await op.confirmation(1);
//   } catch (err) {
//       throw err;
//   }
// };



// export const voteCandidateBOperation = async () => {
//   try {
//       const contractInstance = await tezos.wallet.at(contractAddress);
//       const op = await contractInstance.methods.vote_for_candidate_B().send();
//       await op.confirmation(1);
//   } catch (err) {
//       throw err;
//   }
// };

// export const resetOperation = async () => {
//   try {
//       const contractInstance = await tezos.wallet.at(contractAddress);
//       const op = await contractInstance.methods.reset_voting().send();
//       await op.confirmation(1);
//   } catch (err) {
//       throw err;
//   }
// };