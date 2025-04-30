import { ethers } from 'ethers';

export async function getEnsData(name) {
  const provider = new ethers.JsonRpcProvider('https://eth-mainnet.g.alchemy.com/v2/innCpgwBD8GBgVLWJV1cLq41vhob1He1');

  // Resolve ENS name to address
  const address = await provider.resolveName(name);
  if (!address) {
    throw new Error('Could not resolve ENS name');
  }

  // Get reverse record for primary name check
  const reverseName = await provider.lookupAddress(address);

  // Get avatar
  const avatar = await provider.getAvatar(name);

  // Fetch EFP data
  const efpUrl = `https://api.ethfollow.xyz/api/v1/stats/${address}`;
  const efpRes = await fetch(efpUrl);
  const efpData = efpRes.ok ? await efpRes.json() : { followers: 0, following: 0 };

  return {
    name,
    address,
    isPrimary: reverseName?.toLowerCase() === name.toLowerCase(),
    avatar,
    efp: {
      followers: efpData.followers || 0,
      following: efpData.following || 0,
    }
  };
}
