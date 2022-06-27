import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { NftResult } from "../models/models";
import { Draggable } from "react-beautiful-dnd";
import { getDefaultProvider, } from "ethers"
import { NftProvider, useNft } from "use-nft"
import { Provider } from "ethereum-types";

const SingleNFT: React.FC<{
  index: number;
  nftr: NftResult;
  nftrs: Array<NftResult>;
  setNftrs: React.Dispatch<React.SetStateAction<Array<NftResult>>>;
}> = ({ index, nftr, nftrs, setNftrs }) => {

  function Nft() {
      if (nftr.loading) return <>Loading…</>
      if (nftr.error || !nftr.nft) return <>Error.</>
      return (
        <section>
          <h1>{nftr.nft.name}</h1>
          <img src={nftr.nft.image} alt="" />
          <p>{nftr.nft.description}</p>
          <p>Owner: {nftr.nft.owner}</p>
          <p>Metadata URL: {nftr.nft.metadataUrl}</p>
        </section>
      )
    };

  const ethersConfig: any = {
        provider: getDefaultProvider("etherscan"),
      };

  const handleDelete = (name: string | undefined) => {
    setNftrs(nftrs.filter((nftr) => nftr.nft?.name !== name)); 
  };

  return (
    <Draggable draggableId={nftr.nft?.name} index={index}>
      <NftProvider fetcher={["ethers", ethersConfig]}>
        <Nft />
      </NftProvider>
      <span className="icon" onClick={() => handleDelete(nftr.nft?.name)}>
        <AiFillDelete />
      </span>
    </Draggable>
  );
};

export default SingleNFT;

