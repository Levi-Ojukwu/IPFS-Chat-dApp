import { ethers } from "ethers";
import ens from "../ABIs/nameServiceAbi.json";
import chatAbi from "../ABIs/chatAbi.json";

export const getProposalsContract = (providerOrSigner) =>
  new ethers.Contract(
    import.meta.env.VITE_ens_contract_address,
    ens,
    providerOrSigner
  );

export const chatContract = (providerOrSigner) =>
  new ethers.Contract(
    import.meta.env.VITE_chat_contract_address,
    chatAbi,
    providerOrSigner
  );