import React from "react";
import { NftData } from "../models/models";
import SingleNFT from "./singleNFT";
import { Droppable } from "react-beautiful-dnd";

interface props {
  nftds: Array<NftData>;
  setNftds: React.Dispatch<React.SetStateAction<Array<NftData>>>;
}

const NFTList: React.FC<props> = ({
  nftds,
  setNftds,
}) => {
  return (
    <div className="container">
      <Droppable droppableId="NFTList">
        {(provided: any, snapshot: any) => (
          <div
            className={`nfts ${snapshot.isDraggingOver ? "dragactive" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="nfts__heading">Queried NFTs</span>
            {nftds?.map((nftd, index) => (
              <SingleNFT
                index={index}
                nftds={nftds}
                nftd={nftd}
                setNftds={setNftds}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default NFTList;
