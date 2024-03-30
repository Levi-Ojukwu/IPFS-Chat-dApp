// import { Box, Card, Flex, Text } from "@radix-ui/themes";

const Hero = () => {
  return (
    <div className="flex gap-8 ml-20 mr-20 mt-24 items-center">
        <div className=" ">
            <h1 className="text-6xl -tracking-tighter font-semibold text-gray-300">Connect With People In The <span className="text-purple-400 tracking-widest  font-extrabold">Metaverse.</span></h1>
            <p className="mt-5 text-xl text-gray-200 ml-3 font-medium">Join our Web3Bridge social messaging platform and experience a new level of online communication.</p>
            <div className="ml-4 mt-6">
                {/* <w3m-button /> */}
            </div>
        </div>
        <img className="w-96 h-64" src="../images/God-please.png" alt="dApp Logo" />
    </div>
  );
};

export default Hero;