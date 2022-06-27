import React from "react";
import { NftResult } from "../models/models";
import SingleNFT from "./singleNFT";
import { Droppable } from "react-beautiful-dnd";

interface props {
  nftrs: Array<NftResult>;
  setNftrs: React.Dispatch<React.SetStateAction<Array<NftResult>>>;
}

const NFTList: React.FC<props> = ({
  nftrs,
  setNftrs,
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
            {nftrs?.map((nftr, index) => (
              <SingleNFT
                index={index}
                nftrs={nftrs}
                nftr={nftr}
                setNftrs={setNftrs}
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
