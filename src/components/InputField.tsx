import React, { useRef } from "react";
import "./styles.css";

interface props {
  slug: string;
  setSlug: React.Dispatch<React.SetStateAction<string>>;
  id: number;
  setId: React.Dispatch<React.SetStateAction<number>>; 
  handleAdd: (e: React.FormEvent) => void;
}

const InputField: React.FC<props> = ({ slug, setSlug, id, setId, handleAdd }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className="input"
      onSubmit={(e) => {
        handleAdd(e);
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
        value={id}
        ref={inputRef}
        onChange={(e) => setId(Number(e.target.value))}
        className="input__box"
      /> 
      <button type="submit" className="input_submit">
        SHOW
      </button>
    </form>
  );
};

export default InputField;
