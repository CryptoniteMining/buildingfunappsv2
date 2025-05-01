import { ethers } from 'ethers';

const provider = new ethers.JsonRpcProvider(
  'https://eth-mainnet.g.alchemy.com/v2/innCpgwBD8GBgVLWJV1cLq41vhob1He1'
);

export async function getEnsData(name) {
  if (!name.endsWith('.eth')) {
    throw new Error('Invalid ENS name');
  }

  let address = null;
  let avatar = null;
  let isPrimary = false;
  let records = {};
  let efp = null;

  try {
    address = await provider.resolveName(name);
    if (!address) {
      throw new Error('Could not resolve ENS name');
    }

    const resolver = await provider.getResolver(name);
    avatar = resolver ? await resolver.getText('avatar') : null;

    const reverse = await provider.lookupAddress(address);
    isPrimary = reverse === name;
  } catch (err) {
    console.error('ENS resolution error:', err.message);
  }

  try {
    const bioRes = await fetch(`https://api.web3.bio/profile/${name}`);
    const bioJson = await bioRes.json();

    if (bioJson?.data) {
      records = bioJson.data.records || {};
      efp = bioJson.data.follower || null;
    }
  } catch (err) {
    console.error('Web3.bio fetch error:', err.message);
  }

  return {
    name,
    address,
    avatar,
    isPrimary,
    records,
    efp,
  };
}
