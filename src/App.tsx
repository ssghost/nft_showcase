import React, { useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import NFTList from "./components/NFTList";
import { NftProvider, useNft } from "use-nft";
import { DragDropContext, DropResult} from "react-beautiful-dnd";
import { NftResult } from "./models/models";
import { fetch } from "node-fetch";

const App: React.FC = () => {
  const [slug, setSlug] = useState<string>("");
  const [tid, setTid] = useState<number>(0);
  const [nftr, setNftr] = useState<NftResult>();
  const [nftrs, setNftrs] = useState<Array<NftResult>>([]);

  const HandleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    var address : string = "";

    if ((slug !== "") && (tid !== 0)) {
      const url = 'https://api.opensea.io/api/v1/collection/' + slug;
      const options = {method: 'GET'};
      const response = await fetch(url, options);
      const data = await response.json();
      address = data["primary_asset_contracts"]["address"];
    };

    const _nftr: NftResult = useNft(
      address,
      tid.toString()
      );

    setNftr(_nftr);
    setNftrs([...nftrs, _nftr]);
    setSlug("");
    setTid(0);
    };

  return (
    <DragDropContext>
      <div className="App">
        <span className="heading">Opensea NFT Showcase</span>
        <InputField slug={slug} setSlug={setSlug} tid={tid} setTid={setTid} HandleAdd={HandleAdd} />
        <NFTList
          nftrs={nftrs}
          setNftrs={setNftrs}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
