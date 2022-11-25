import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import RinkebyContractABI from './abi/dev.json';
import RinkebyContractABI2 from './abi/dev2.json';

import MaskABI from './abi/mask-dev.json';
import VaccineABI from './abi/vaccine-dev.json';
import MergeABI from './abi/merge-dev.json';

import MainnetContractABI from './abi/mainnet2.json';

// const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID;
// const CHAIN_ID = 1;
// const NETWORK = CHAIN_ID === '1' ? 'mainnet' : 'rinkeby';
// const contractABI = RinkebyContractABI;

const VaccineAddressDev = '0x033f5fbc95b67ae1e09f2d3bd72b707245bf65c7';
const MergeAddressDev = '0xdf25155c96e677b80add590137b96f9c30915f3e';

const MaskAddress = '0x9Fbf34a4062a3D6CdBFa8c3D217a638a40F91f88';
const VaccineAddress = '0xa18b096dc95ac878c77b08661a8b59a53ef6f8e7';
const MergeAddress = '0x51c2985b5e52729f786abe6005f0df1c8f04cd42';

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
let MaskContract;
let VaccineContract;
let MergeContract;

export { MergeAddress };

// eslint-disable-next-line import/prefer-default-export
export async function connectWallet() {
  if (!instance) {
    instance = await web3ModelInstance.connect();
    // https://docs.ethers.io/v5/api/providers/
    provider = new ethers.providers.Web3Provider(instance);
    // https://docs.ethers.io/v5/api/signer/
    signer = provider.getSigner();

    MaskContract = new ethers.Contract(
      MaskAddress,
      // 大哥，注意 ABI 的大小写 👻
      MaskABI.abi,
      provider,
    );

    VaccineContract = new ethers.Contract(
      VaccineAddress,
      // 大哥，注意 ABI 的大小写 👻
      VaccineABI.abi,
      provider,
    );

    MergeContract = new ethers.Contract(
      MergeAddress,
      // 大哥，注意 ABI 的大小写 👻
      MergeABI.abi,
      provider,
    );

    // MaskContract = VaccineContract;
  }

  return {
    provider, signer, web3Instance: instance, MaskContract, VaccineContract, MergeContract,
  };
}

export async function disconnectWallet() {
  provider = undefined;
  signer = undefined;
  instance = undefined;
  VaccineContract = undefined;
  await web3ModelInstance.clearCachedProvider();
}
