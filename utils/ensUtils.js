import { ethers } from 'ethers';

// Replace with your Alchemy key
const ALCHEMY_KEY = 'innCpgwBD8GBgVLWJV1cLq41vhob1He1';
const provider = new ethers.JsonRpcProvider(`https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}`);

export async function getEnsData(name) {
  if (!name.endsWith('.eth')) {
    throw new Error('Invalid ENS name');
  }

  // Core ENS resolution
  const address = await provider.resolveName(name);
  if (!address) {
    throw new Error('Could not resolve ENS name');
  }

  const resolver = await provider.getResolver(name);
  const avatar = resolver ? await resolver.getText('avatar') : null;

  const reverseName = await provider.lookupAddress(address);
  const isPrimary = reverseName?.toLowerCase() === name.toLowerCase();

  // Web3.bio enhancement
  let records = {};
  let socials = [];
  let efp = null;

  try {
    const res = await fetch(`https://api.web3.bio/profile/${name}`);
    const json = await res.json();

    const ens = json?.data?.ens_domain;

    if (ens) {
      records = ens.records || {};
      socials = ens.identity?.socials || [];

      efp = {
        followers: ens.identity?.followerCount ?? null,
        following: ens.identity?.followingCount ?? null
      };
    }
  } catch (error) {
    console.warn('Web3.bio fetch failed:', error.message);
  }

  return {
    name,
    address,
    avatar,
    isPrimary,
    records,
    socials,
    efp
  };
}
