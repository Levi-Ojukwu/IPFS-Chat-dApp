import React, { useState } from "react";
// import useRegName from "../hooks/useRegName";

const registerUser = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [image, setImage] = useState("");
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // const handleReg = useRegName();

  const handleSubmission = async () => {
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      const metadata = JSON.stringify({
        name: "File name",
      });
      formData.append("pinataMetadata", metadata);

      const options = JSON.stringify({
        cidVersion: 0,
      });
      formData.append("pinataOptions", options);

      const res = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
          },
          body: formData,
        }
      );
      const resData = await res.json();
      setImage(`${import.meta.env.VITE_GATEWAY_URL}${resData.IpfsHash}`);
      console.log(resData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <img
          className="w-20 h-20 rounded-xl"
          src={image}
          alt="Rounded avatar"
        />
      </div>
      <label className="form-label"> Choose File</label>
      <input type="file" onChange={changeHandler} />
      <button onClick={handleSubmission}>Submit</button>
    </>
  );
};

export default registerUser;
























// import { useState } from "react";

// function registerUser() {
//   const [selectedFile, setSelectedFile] = useState();
//   const [image, setImage] = useState("")
//   const changeHandler = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   const handleSubmission = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("file", selectedFile);
//       const metadata = JSON.stringify({
//         name: "File name",
//       });
//       formData.append("pinataMetadata", metadata);

//       const options = JSON.stringify({
//         cidVersion: 0,
//       });
//       formData.append("pinataOptions", options);

//       const res = await fetch(
//         "https://api.pinata.cloud/pinning/pinFileToIPFS",
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
//           },
//           body: formData,
//         }
//       );
//       const resData = await res.json();

//       setImage(`${resData.ipfsHash}`)

//       console.log(resData);
//       console.log(image)
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <>
//     <div>
//         <img src={image} className="w-50 h-50" alt="IPFS image" />
//     </div>
//       <label className="form-label"> Choose File</label>
//       <input type="file" onChange={changeHandler} />
//       <button onClick={handleSubmission}>Submit</button>
//     </>
//   );
// }

// export default registerUser;
