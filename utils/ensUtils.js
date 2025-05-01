import { ethers } from 'ethers';

const provider = new ethers.JsonRpcProvider('https://eth-mainnet.g.alchemy.com/v2/innCpgwBD8GBgVLWJV1cLq41vhob1He1');

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

  const primary = await provider.lookupAddress(address);
  const isPrimary = primary === name;

  // Get all records
  const recordKeys = [
    'avatar',
    'description',
    'url',
    'com.twitter',
    'com.github',
    'org.telegram',
    'keywords'
  ];

  let records = {};
  if (resolver) {
    for (const key of recordKeys) {
      try {
        const val = await resolver.getText(key);
        if (val) records[key] = val;
      } catch (e) {
        // Skip missing records
      }
    }
  }

  // Web3.bio API for EFP and social handles
  let efp = null;
  try {
    const res = await fetch(`https://api.web3.bio/profile/${name}`);
    const json = await res.json();

    if (json?.data?.profile?.connected_accounts?.length > 0) {
      const accounts = json.data.profile.connected_accounts;
      for (const account of accounts) {
        const { identity, platform } = account;
        if (platform === 'farcaster') {
          records['com.farcaster'] = identity;
        }
        if (platform === 'x') {
          records['com.twitter'] = identity;
        }
        if (platform === 'lens') {
          records['com.lens'] = identity;
        }
      }
    }

    if (json?.data?.profile?.ens_domains?.[0]?.social_stats) {
      const stats = json.data.profile.ens_domains[0].social_stats;
      efp = {
        followers: stats.followers,
        following: stats.following,
      };
    }
  } catch (e) {
    console.warn('Failed to fetch from Web3.bio:', e.message);
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
