import { ethers } from 'ethers';

const ALCHEMY_KEY = 'innCpgwBD8GBgVLWJV1cLq41vhob1He1';
const provider = new ethers.JsonRpcProvider(`https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}`);

export async function getEnsData(name) {
  if (!name.endsWith('.eth')) {
    throw new Error('Invalid ENS name');
  }

  const address = await provider.resolveName(name);
  if (!address) {
    throw new Error('Could not resolve ENS name');
  }

  const resolver = await provider.getResolver(name);
  const avatar = resolver ? await resolver.getText('avatar') : null;

  const reverseName = await provider.lookupAddress(address);
  const isPrimary = reverseName?.toLowerCase() === name.toLowerCase();

  // Add-on data
  let records = {};
  let socials = [];
  let efp = null;
  let poaps = [];

  // Web3.bio enhancements
  try {
    const res = await fetch(`https://api.web3.bio/profile/${name}`);
    const json = await res.json();

    console.log('Web3.bio full response →', json); // helpful for debugging

    const ens = json?.data?.ens_domain;

    if (ens) {
      records = ens.records || {};
      socials = ens.identity?.socials || [];

      efp = {
        followers: ens.identity?.followerCount ?? null,
        following: ens.identity?.followingCount ?? null,
        followersList: ens.identity?.followersList || [],
        followingList: ens.identity?.followingList || [],
      };
    }
  } catch (error) {
    console.warn('Web3.bio fetch failed:', error.message);
  }

  // POAPs
  try {
    const poapRes = await fetch(`https://public-api.poap.tech/actions/scan/${address}`, {
      headers: {
        'X-API-Key': 'demo',
      }
    });
    if (poapRes.ok) {
      poaps = await poapRes.json();
    }
  } catch (err) {
    console.warn('Failed to fetch POAPs:', err.message);
  }

  return {
    name,
    address,
    avatar,
    isPrimary,
    records,
    socials,
    efp,
    poaps,
  };
}
