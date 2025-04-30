import { ethers } from 'ethers';

export async function getEnsData(name) {
  const provider = new ethers.JsonRpcProvider('https://eth-mainnet.g.alchemy.com/v2/innCpgwBD8GBgVLWJV1cLq41vhob1He1');

  // Resolve ENS name to address
  const address = await provider.resolveName(name);
  if (!address) {
    throw new Error('Could not resolve ENS name');
  }

  // Fetch ENS avatar
  const avatar = await provider.getAvatar(name);

  // Fetch EFP stats
  const efpResponse = await fetch(`https://api.ethfollow.xyz/api/v1/stats/${address}`);
  const efpData = await efpResponse.json();

  return {
    name,
    address,
    avatar,
    efp: {
      followers: efpData.followers || 0,
      following: efpData.following || 0,
    },
  };
}
