import { ethers } from 'ethers';

const ALCHEMY_KEY = 'innCpgwBD8GBgVLWJV1cLq41vhob1He1';
const provider = new ethers.JsonRpcProvider(`https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_KEY}`);

export async function getEnsData(name) {
  if (!name.endsWith('.eth')) throw new Error('Invalid ENS name');

  const address = await provider.resolveName(name);
  if (!address) throw new Error('Could not resolve ENS name');

  const resolver = await provider.getResolver(name);
  const avatar = resolver ? await resolver.getText('avatar') : null;

  const reverseName = await provider.lookupAddress(address);
  const isPrimary = reverseName?.toLowerCase() === name.toLowerCase();

  let records = {};
  let socials = [];
  let efp = null;
  let poaps = [];

  // ✅ Web3.bio fetch
  try {
    const res = await fetch(`https://api.web3.bio/profile/${name}`);
    const json = await res.json();
    const ens = json?.data?.ens_domain;

    if (res.ok && ens && typeof ens === 'object') {
      records = ens.records || {};
      socials = ens.identity?.socials || [];

      efp = {
        followers: ens.identity?.followerCount ?? null,
        following: ens.identity?.followingCount ?? null,
        followersList: ens.identity?.followersList || [],
        followingList: ens.identity?.followingList || [],
      };
    } else {
      console.warn(`Web3.bio returned empty or invalid data for ${name}`);
    }
  } catch (err) {
    console.warn('Web3.bio fetch failed:', err.message);
  }

  // ✅ POAP fetch
  try {
    const poapRes = await fetch(`https://public-api.poap.tech/actions/scan/${address}`);
    if (poapRes.ok) {
      poaps = await poapRes.json();
    } else {
      console.warn(`POAP fetch failed with status ${poapRes.status}`);
    }
  } catch (err) {
    console.warn('POAP fetch error:', err.message);
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
