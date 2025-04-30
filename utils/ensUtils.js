import { ethers } from 'ethers';

export async function getEnsData(name) {
  const provider = new ethers.JsonRpcProvider('https://eth-mainnet.g.alchemy.com/v2/innCpgwBD8GBgVLWJV1cLq41vhob1He1');

  if (!name.endsWith('.eth')) {
    throw new Error('Invalid ENS name');
  }

  const address = await provider.resolveName(name);
  if (!address) {
    throw new Error('Could not resolve ENS name');
  }

  let bioData = {};
  try {
    const res = await fetch(`https://api.web3.bio/profile/${name}`);
    if (res.ok) {
      const json = await res.json();
      bioData = json?.data || {};
    }
  } catch (e) {
    console.error('Web3.bio fetch failed:', e.message);
  }

  const resolver = await provider.getResolver(name);
  const fallbackRecords = {};
  if (resolver) {
    const keys = [
      'avatar',
      'description',
      'url',
      'com.twitter',
      'com.github',
      'org.telegram',
      'email',
      'notice',
      'keywords'
    ];

    for (const key of keys) {
      try {
        const val = await resolver.getText(key);
        if (val) fallbackRecords[key] = val;
      } catch (e) {
        continue;
      }
    }
  }

  const avatar =
    bioData.avatar || fallbackRecords.avatar || null;

  const records = bioData.records?.length
    ? Object.fromEntries(bioData.records.map(({ key, value }) => [key, value]))
    : fallbackRecords;

  const primary = await provider.lookupAddress(address);
  const isPrimary = primary === name;

  let efp = {};
  try {
    const efpRes = await fetch(`https://api.ethfollow.xyz/api/v1/stats/${address}`);
    if (efpRes.ok) {
      efp = await efpRes.json();
    }
  } catch (err) {
    efp = {};
  }

  const poaps = []; // placeholder

  return {
    name,
    address,
    avatar,
    isPrimary,
    records,
    efp,
    poaps
  };
}
