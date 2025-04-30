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

  const resolver = await provider.getResolver(name);
  const avatar = resolver ? await resolver.getText('avatar') : null;

  const records = {};
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
        if (val) records[key] = val;
      } catch (e) {
        continue;
      }
    }
  }

  const primary = await provider.lookupAddress(address);
  const isPrimary = primary === name;

  // Ethereum Follow Protocol data
  let efp = {};
  try {
    const efpRes = await fetch(`https://api.ethfollow.xyz/api/v1/stats/${address}`);
    if (efpRes.ok) {
      efp = await efpRes.json();
    }
  } catch (err) {
    efp = {};
  }

  // Placeholder for POAPs (future enhancement)
  const poaps = []; // To be filled using POAP API later

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
