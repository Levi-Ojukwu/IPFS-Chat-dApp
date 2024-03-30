import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { getProposalsContract, chatContract } from "../ constants/Contracts/contracts";
import { readOnlyProvider, getProvider } from "../ constants/Contracts/providers";
import { useWeb3ModalProvider, useWeb3ModalAccount} from "@web3modal/ethers/react";

export default function Chat() {
  const [selectedUser, setSelectedUser] = useState();
  const [senderEnsName, setSenderEnsName] = useState("");
  const [receiverEnsName, setReceiverEnsName] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [{ data: messages }, setMessages] = useState({ data: [] });
  const [{ data: registeredUsers }, setRegisteredUsers] = useState({
    data: [],
  });
  const { walletProvider } = useWeb3ModalProvider();
  const { address } = useWeb3ModalAccount();

  console.log(registeredUsers);


  useEffect(() => {
    const contract = chatContract(readOnlyProvider);

    contract
      .getRegisteredUsers()
      .then((res) => {
        const converted = res.map((item) => ({
          ensName: item.ensName,
          DisplayPictureURI: item.DisplayPictureURI,
        }));

        setRegisteredUsers({
          data: converted,
        });
      })
      .catch((err) => {
        console.error("error fetching proposals: ", err);
      });
  }, []);

  const selectReceiver = (selectedUser) => {
    setReceiverEnsName(selectedUser);
    setSelectedUser(selectedUser);
  };

  const sendMessage = async () => {
    const readWriteProvider = getProvider(walletProvider);
    const signer = await readWriteProvider.getSigner();

    const contract = chatContract(signer);
    try {
      const tx = await contract.sendMessage(receiverEnsName, messageContent);
      const txReceipt = await tx.wait();
      console.log("Receipt: ", txReceipt);
      setMessageContent("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    const chat = chatContract(readOnlyProvider);
    const nameService = getProposalsContract(readOnlyProvider);

    async () => {
      const senderName = await nameService.domains(address);
      setSenderEnsName(senderName[0]);

      const history = await chat
        .getMessages(senderEnsName, receiverEnsName)
        .then((res) => {
          const response = res.map((item) => ({
            sender: item.sender,
            receiver: item.receiver,
            content: item.content,
          }));

          setRegisteredUsers({
            data: response,
          });
        })
        .catch((err) => {
          console.error("error fetching proposals: ", err);
        });

      setMessages(history);
    };
  }, []);

  return (
    <div className="flex h-[88vh]">
      {/* Sidebar */}
      <div className="w-1/4 bg-[#0f1536] p-4">
        <h2 className="text-xl text-gray-300 font-semibold mb-4">Contacts</h2>
        <ul>
          {registeredUsers.map((user, index) => (
            <li
              key={index}
              onClick={() => selectReceiver(user)}
              className={`cursor-pointer p-2 rounded-lg hover:bg-gray-300 ${
                selectedUser === user ? "bg-gray-300" : ""
              }`}
            >
              {user}
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col justify-between">
        {/* Chat Header */}
        <div className="bg-[#0f1536] pt-4 py-3 px-4 flex items-center justify-between">
          <span className="text-xl text-gray-300 font-semibold">
            {selectedUser ? "" : "Select a contact"}
          </span>
          <span>{senderEnsName}</span>
        </div>

        {/* Messages */}
        <div className="flex-1 bg-gray-800 px-4 py-2 overflow-y-scroll">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-4 ${
                msg.sender === senderEnsName ? "self-end" : "self-start"
              }`}
            >
              <div
                className={`rounded-lg p-2 max-w-md ${
                  msg.sender === senderEnsName
                    ? "bg-whatsapp-green text-white"
                    : "bg-whatsapp-light"
                }`}
              >
                {msg.content}
              </div>
              <div
                className={`text-xs ${
                  msg.sender === senderEnsName ? "text-right" : ""
                }`}
              >
                {msg.sender}
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="bg-gray-800 gap-2 flex items-center px-4 py-2">
          <input
            type="text"
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 mr-2 bg-gray-600 text-gray-700 focus:outline-none border border-gray-500 rounded-full px-4 py-2"
          />
          <button
            onClick={sendMessage}
            disabled={!selectedUser || !messageContent}
            className={`bg-purple-500 hover:bg-purple-400 transition duration-200 border border-purple-200 text-white font-bold py-1 px-4 rounded-full ${
              !selectedUser || !messageContent
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            <img src="../images/sender.png" alt="Send" className="w-8 h-8" />
          </button>
        </div>
      </div>
    </div>
  );
}