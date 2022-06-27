import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { NftData } from "../models/models";
import { Draggable } from "react-beautiful-dnd";
import { getDefaultProvider, } from "ethers"
import { NftProvider, useNft } from "use-nft"

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
    const { status, loading, error, reload, nft } = useNft(
        nftd.address,
        String(nftd.tid)
      )

  const handleDelete = (id: string) => {
    setNftds(nftds.filter((nftd) => nftd.id !== id)); 
  };

  return (
    <Draggable draggableId={nftd.id.toString()} index={index}>
      {(provided: any, snapshot: any) => (
        <form
          onSubmit={(e) => handleEdit(e, nftd.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`nfts__single ${snapshot.isDragging ? "drag" : ""}`}
        >
          <div>
            <span
              className="icon"
              onClick={() => {
                if (!edit && !todo.isDone) {
                  setEdit(!edit);
                }
              }}
            >
              <AiFillEdit />
            </span>
            <span className="icon" onClick={() => handleDelete(todo.id)}>
              <AiFillDelete />
            </span>
            <span className="icon" onClick={() => handleDone(todo.id)}>
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
