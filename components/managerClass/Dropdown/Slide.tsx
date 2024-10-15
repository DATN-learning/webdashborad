import { addSlideLessions } from "@/api/chapter";
import React from "react";

const Slide = () => {
  const [file, setFile] = React.useState<any>(null);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    // const formData = new FormData();
    // formData.append("file", file);
    const res = addSlideLessions("1", "1", "1", file);
    console.log(res);
  };

  const handleFile = (e: any) => {
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFile} accept=".pdf" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Slide;