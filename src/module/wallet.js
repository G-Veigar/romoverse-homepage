import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import RinkebyContractABI from './abi/dev.json';
import RinkebyContractABI2 from './abi/dev2.json';

import MainnetContractABI from './abi/mainnet2.json';

// const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID;
// const CHAIN_ID = 1;
// const NETWORK = CHAIN_ID === '1' ? 'mainnet' : 'rinkeby';
const contractABI = RinkebyContractABI;
const NEXT_PUBLIC_CONTRACT_ADDRESS = '0x9ffdd2917d457211ab88d8d99e8fa9c5663b0e04';
const NEXT_PUBLIC_CONTRACT_MERGE_ADDRESS = '0x17982614a27baf2890f41275e3212e00c0b5353e';
const NEXT_PUBLIC_INFURA_PROJECT_ID = 'b7fcab074360449dac3869b2d62a0154';

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: NEXT_PUBLIC_INFURA_PROJECT_ID,
    },
  },
};

let web3ModelInstance;
if (typeof window !== 'undefined') {
  web3ModelInstance = new Web3Modal({
    // network: 'rinkeby',
    network: 'mainnet',
    cacheProvider: true,
    providerOptions,
  });
}

let provider;
let signer;
let instance;
let contract;
let mergeContract;

// eslint-disable-next-line import/prefer-default-export
export async function connectWallet() {
  if (!instance) {
    instance = await web3ModelInstance.connect();
    // https://docs.ethers.io/v5/api/providers/
    provider = new ethers.providers.Web3Provider(instance);
    // https://docs.ethers.io/v5/api/signer/
    signer = provider.getSigner();
    contract = new ethers.Contract(
      NEXT_PUBLIC_CONTRACT_ADDRESS,
      // 大哥，注意 ABI 的大小写 👻
      contractABI.abi,
      provider,
    );

    mergeContract = new ethers.Contract(
      NEXT_PUBLIC_CONTRACT_MERGE_ADDRESS,
      // 大哥，注意 ABI 的大小写 👻
      RinkebyContractABI2.abi,
      provider,
    );
  }

  return {
    provider, signer, web3Instance: instance, contract, mergeContract,
  };
}

export async function disconnectWallet() {
  provider = undefined;
  signer = undefined;
  instance = undefined;
  contract = undefined;
  await web3ModelInstance.clearCachedProvider();
}
