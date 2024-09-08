// import { getSubjectClassRoomRequest } from "@/redux/classRoom/actions";
// // import Lottie from "react-lottie";
// import React from "react";
// import { Loading as loading } from "@/assets/json";
// const Loading = () => {
//   // const defaultOptions = {
//   //   loop: true,
//   //   autoplay: true,
//   //   animationData: loading,
//   //   rendererSettings: {
//   //     preserveAspectRatio: "xMidYMid slice",
//   //   },
//   // };
//   return (
//     <div className="flex items-center justify-center h-screen">
//       {/* <Lottie options={defaultOptions} height={400} width={400} /> */}
//       <span>Loading ...</span>
//     </div>
//   );
// };

// export default Loading;
import React, { useState } from "react";

const HomePage: React.FC = () => {
  const [imageOne, setImageOne] = useState<string | null>(null);
  const [imageTwo, setImageTwo] = useState<string | null>(null);

  const handleImageOneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageOne(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageTwoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageTwo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h1>Image Selection</h1>
      <input type="file" accept="image/*" onChange={handleImageOneChange} />
      <input type="file" accept="image/*" onChange={handleImageTwoChange} />

      {imageOne && <img src={imageOne} alt="Image One" />}
      {imageTwo && <img src={imageTwo} alt="Image Two" />}
    </div>
  );
};

export default HomePage;
