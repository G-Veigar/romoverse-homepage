import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import RinkebyContractABI from './abi/rinkeby3.json';
import MainnetContractABI from './abi/mainnet.json';

// const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID;
const CHAIN_ID = 0;
const NETWORK = CHAIN_ID === '1' ? 'mainnet' : 'rinkeby';
let contractABI = CHAIN_ID === '1' ? MainnetContractABI : RinkebyContractABI;
// const NEXT_PUBLIC_CONTRACT_ADDRESS = '0x2fEfAc504D506255257a7D11811E084F53a0F0b0';
// let NEXT_PUBLIC_CONTRACT_ADDRESS = '0xfd178c17f2c879608d277000ed5d1d5008ea174c'; // 这次
let NEXT_PUBLIC_CONTRACT_ADDRESS = '0x4A650C25a2BE26BA28daa0C3146c9b7880108DbF'; // 花生
const NEXT_PUBLIC_INFURA_PROJECT_ID = 'b7fcab074360449dac3869b2d62a0154';

console.log('contractABI', contractABI);

// // TODO: delete
// if (window.abi) {
//   contractABI = window.abi;
// }
// if (window.address) {
//   NEXT_PUBLIC_CONTRACT_ADDRESS = window.address;
// }

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
    network: process.env.NEXT_PUBLIC_CHAIN_ID === '1' ? 'mainnet' : 'rinkeby',
    cacheProvider: true,
    providerOptions,
  });
}

let provider;
let signer;
let instance;
let contract;

// eslint-disable-next-line import/prefer-default-export
export async function connectWallet(config) {
  const { address, abi } = config;
  console.log('connectWallet config', config);
  if (address) {
    NEXT_PUBLIC_CONTRACT_ADDRESS = address;
  }
  if (abi) {
    contractABI = abi;
  }
  console.log('connectWallet-address', NEXT_PUBLIC_CONTRACT_ADDRESS);
  console.log('connectWallet-abi', contractABI.abi);
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
  }

  return {
    provider, signer, web3Instance: instance, contract,
  };
}

export async function disconnectWallet() {
  provider = undefined;
  signer = undefined;
  instance = undefined;
  contract = undefined;
  await web3ModelInstance.clearCachedProvider();
}
