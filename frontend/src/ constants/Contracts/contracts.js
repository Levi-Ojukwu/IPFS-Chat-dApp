import { ethers } from "ethers";
import ens from "./ABIs/nameService.json";

export const getProposalsContract = (providerOrSigner) =>
    new ethers.Contract(
        import.meta.env.VITE_ens_contract_address,
        ens,
        providerOrSigner
    );