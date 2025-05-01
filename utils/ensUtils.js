import { ethers } from 'ethers';

const ALCHEMY_MAINNET_RPC = 'https://eth-mainnet.g.alchemy.com/v2/innCpgwBD8GBgVLWJV1cLq41vhob1He1';
const provider = new ethers.JsonRpcProvider(ALCHEMY_MAINNET_RPC);

export async function getEnsData(name) {
  if (!name.endsWith('.eth')) throw new Error('Invalid ENS name');

  const address = await provider.resolveName(name);
  if (!address) throw new Error('Could not resolve ENS name');

  const resolver = await provider.getResolver(name);
  const avatar = resolver ? await resolver.getText('avatar').catch(() => null) : null;
  const primary = await provider.lookupAddress(address);
  const isPrimary = primary === name;

  // ENS Records
  let records = {};
  if (resolver) {
    const keys = ['avatar', 'url', 'description', 'com.twitter', 'com.github', 'org.telegram', 'keywords'];
    await Promise.all(
      keys.map(async (key) => {
        try {
          const value = await resolver.getText(key);
          if (value) records[key] = value;
        } catch (_) {}
      })
    );
  }

  // Web3.bio fallback
  let efp = {};
  try {
    const web3bioRes = await fetch(`https://api.web3.bio/profile/${name}`);
    const web3bioJson = await web3bioRes.json();
    if (web3bioJson?.data?.profile) {
      if (!avatar && web3bioJson.data.profile.avatar) records.avatar = web3bioJson.data.profile.avatar;
      if (!records["com.twitter"] && web3bioJson.data.profile.twitter) {
        records["com.twitter"] = web3bioJson.data.profile.twitter;
      }
      if (!records["com.github"] && web3bioJson.data.profile.github) {
        records["com.github"] = web3bioJson.data.profile.github;
      }
    }

    // Add Ethereum Follow Protocol info
    if (web3bioJson?.data?.ens?.ens_follow) {
      efp = {
        followers: web3bioJson.data.ens.ens_follow.follower_count,
        following: web3bioJson.data.ens.ens_follow.following_count,
      };
    }
  } catch (e) {
    console.error('Web3.bio fallback failed:', e);
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
