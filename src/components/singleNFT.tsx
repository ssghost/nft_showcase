import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { NftData } from "../models/models";
import { Draggable } from "react-beautiful-dnd";
import { getDefaultProvider, } from "ethers"
import { NftProvider, useNft } from "use-nft"
import { Provider } from "ethereum-types";

type NftResult = {
    status: "error" | "loading" | "done"
    loading: boolean
    reload: () => void
    error?: Error
    nft?: {
      description: string
      image: string
      imageType: "image" | "video" | "unknown"
      name: string
      owner: string
      metadataUrl?: string
      rawData: Record<string, unknown> | null
    }
  }

const SingleNFT: React.FC<{
  index: number;
  nftd: NftData;
  nftds: Array<NftData>;
  setNftds: React.Dispatch<React.SetStateAction<Array<NftData>>>;
}> = ({ index, nftd, nftds, setNftds }) => {

    function Nft() {
        const { loading, error, nft } = useNft(
          nftd.address,
          nftd.tid.toString()
        )
        if (loading) return <>Loading…</>
        if (error || !nft) return <>Error.</>
        return (
          <section>
            <h1>{nft.name}</h1>
            <img src={nft.image} alt="" />
            <p>{nft.description}</p>
            <p>Owner: {nft.owner}</p>
            <p>Metadata URL: {nft.metadataUrl}</p>
          </section>
        )
      };

    const ethersConfig: any = {
        provider: getDefaultProvider("etherscan"),
      };

  const handleDelete = (id: string) => {
    setNftds(nftds.filter((nftd) => nftd.id !== id)); 
  };

  return (
    <Draggable draggableId={nftd.id.toString()} index={index}>
      <NftProvider fetcher={["ethers", ethersConfig]}>
        <Nft />
      </NftProvider>
      <span className="icon" onClick={() => handleDelete(nftd.id)}>
        <AiFillDelete />
      </span>
    </Draggable>
  );
};

export default SingleNFT;

