// import { Camera, Loader2 } from "lucide-react";
import { useState } from "react";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getProposalsContract } from "../ constants/Contracts/contracts";
import { getProvider } from "../ constants/Contracts/providers";
import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import Hero from "./Hero";

export default function RegisterENS() {
  const [selectedFile, setSelectedFile] = useState();
  const [ensName, setEnsName] = useState("");
  // const [isLoading, setIsLoading] = useState(false);
  const { walletProvider } = useWeb3ModalProvider();
  const navigate = useNavigate();

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (!selectedFile && !ensName) {
      return toast.error("Please select an image or enter an ensName");
    } else {
      formData.append("file", selectedFile);

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

      const fileUrl = await res.json();

      const readWriteProvider = getProvider(walletProvider);
      const signer = await readWriteProvider.getSigner();

      const contract = getProposalsContract(signer);

      try {
        const tx = await contract.registerNameService(
          ethers.encodeBytes32String(ensName),
          fileUrl.IpfsHash
        );
        const receipt = await tx.wait();

        console.log("receipt: ", receipt);

        let notification;

        if (receipt.status) {
          notification = "Account created successfully";
          navigate("/chat")
        } else {
          return toast.error("Account creation failed");
        }

        toast.success(notification);
      } catch (error) {
        console.log(error);

        let errorMessage;

        if (error.reason === "rejected") {
          errorMessage = "Transaction rejected";
        } else {
          console.log("Error", error);
        }

        return toast.error(errorMessage);
      }
    }

    setEnsName("");
    setSelectedFile();
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const formData = new FormData();

  //   if (!selectedFile && !ensName) {
  //     return toast.error("Please select an image or enter a ensName");
  //   } else {
  //     formData.append("file", selectedFile);

  //     const res = await fetch(
  //       "https://api.pinata.cloud/pinning/pinFileToIPFS",
  //       {
  //         method: "POST",
  //         headers: {
  //           Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
  //         },
  //         body: formData,
  //       }
  //     );

  //     const fileUrl = await res.json();
  //     console.log(fileUrl);

  //     const readWriteProvider = getProvider(walletProvider);
  //     const signer = await readWriteProvider.getSigner();

  //     const contract = getProposalsContract(signer);
  //     console.log(contract);

  //     const data = {
  //       name: ensName,
  //       image: fileUrl.IpfsHash,
  //     };

  //     console.log(data);

  //     try {
  //       const tx = await contract.registerNameService(
  //         ethers.encodeBytes32String(ensName),
  //         fileUrl.IpfsHash
  //       );
  //       const receipt = await tx.wait();

  //       console.log("receipt: ", receipt);

  //       if (receipt.status) {
  //         // navigate("/chat");
  //         return console.log("Successful transaction", {
  //           description: "Account created successfully",
  //         });
  //       } else {
  //         console.log("Failed transaction", {
  //           description: "Failed to create pool",
  //         });
  //       }
  //     } catch (error) {
  //       console.log(error);

  //       if (error.reason === "rejected") {
  //         console.log("Failed transaction", {
  //           description: "You rejected the transaction",
  //         });
  //       } else {
  //         console.log("Error transaction", {
  //           description: error,
  //         });
  //       }
  //     }
  //   }
  // };

  return (
    <div>
      <Hero />
      <div className="ml-20 mt-28">
      <div className="my-12 ml-5 border-2 border-purple-700 bg-purple-300 max-w-lg p-8 rounded-lg">
        <input
          type="file"
          accept="image/*"
          hidden
          className="hidden"
          id="selectFile"
          onChange={(e) => setSelectedFile(e.target.files[0])}
        />
        <label
          htmlFor="selectFile"
          className="rounded-full bg-secondary flex items-center justify-center cursor-pointer"
        >
          {selectedFile ? (
            <img
              src={URL.createObjectURL(selectedFile)}
              className="w--20 h-20 object-cover rounded-xl"
              alt="Selected File"
            />
          ) : (
            <div>
            <img className="w-30 h-20 rounded-md border-purple-600 border-2 border-dashed p-0" src="../images/purple-cloud.png" alt="dApp Logo" />
            <p className="text-purple-800 font-semibold">Upload Image</p>
            </div>
          )}
        </label>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col my-4 w-full gap-4"
        >
          <div className="space-y-2 flex flex-col">
            <label className="text-md font-bold">ENS Name</label>
            <input
              value={ensName}
              placeholder="Code.With.Ojukwu"
              onChange={(e) => setEnsName(e.target.value)}
              className="rounded-md bg-purple-50 text-gray-700 font-medium pl-2 h-10"
            />
          </div>

          <button className="bg-purple-700 hover:bg-purple-600 transition duration-300">Register</button>
        </form>
      </div>
    </div>
    </div>
  );
}





// import React, { useState } from "react";
// // import useRegName from "../hooks/useRegName";

// const registerUser = () => {
//   const [selectedFile, setSelectedFile] = useState();
//   const [image, setImage] = useState("");
//   const changeHandler = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   // const handleReg = useRegName();

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
//       setImage(`${import.meta.env.VITE_GATEWAY_URL}${resData.IpfsHash}`);
//       console.log(resData);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <>
//       <div>
//         <img
//           className="w-20 h-20 rounded-xl"
//           src={image}
//           alt="Rounded avatar"
//         />
//       </div>
//       <label className="form-label"> Choose File</label>
//       <input type="file" onChange={changeHandler} />
//       <button onClick={handleSubmission}>Submit</button>
//     </>
//   );
// };

// export default registerUser;
























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
