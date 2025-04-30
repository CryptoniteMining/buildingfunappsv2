import { ethers } from 'ethers';

export async function getEnsData(name) {
  const provider = new ethers.JsonRpcProvider(`https://eth-mainnet.g.alchemy.com/v2/innCpgwBD8GBgVLWJV1cLq41vhob1He1`);
  const address = await provider.resolveName(name);

  if (!address) {
    throw new Error('Could not resolve ENS name');
  }

  return {
    name,
    address,
  };
}
