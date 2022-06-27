import React, { useRef } from "react";
import "./styles.css";

interface props {
  slug: string;
  setSlug: React.Dispatch<React.SetStateAction<string>>;
  tid: number;
  setTid: React.Dispatch<React.SetStateAction<number>>; 
  HandleAdd: (e: React.FormEvent) => void;
}

const InputField: React.FC<props> = ({slug, setSlug, tid, setTid, HandleAdd }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className="input"
      onSubmit={(e) => {
        HandleAdd(e);
        inputRef.current?.blur();
      }}
    >
      <input
        type="text"
        placeholder="Enter an NFT slug:"
        value={slug}
        ref={inputRef}
        onChange={(e) => setSlug(e.target.value)}
        className="input__box"
      />
      <input
        type="text"
        placeholder="Enter an NFT token id:"
        value={tid}
        ref={inputRef}
        onChange={(e) => setTid(Number(e.target.value))}
        className="input__box"
      /> 
      <button type="submit" className="input_submit">
        SHOW
      </button>
    </form>
  );
};

export default InputField;
