import { ethers } from 'ethers';

const ALCHEMY_MAINNET = 'https://eth-mainnet.g.alchemy.com/v2/innCpgwBD8GBgVLWJV1cLq41vhob1He1';
const provider = new ethers.JsonRpcProvider(ALCHEMY_MAINNET);

export async function getEnsData(name) {
  if (!name.endsWith('.eth')) throw new Error('Invalid ENS name');

  let address = null;
  let avatar = null;
  let isPrimary = false;
  let records = {};
  let efp = null;

  try {
    const web3bioRes = await fetch(`https://api.web3.bio/profile/${name}`);
    const web3bio = await web3bioRes.json();

    if (web3bio && web3bio.ens) {
      address = web3bio.ens.address || null;
      avatar = web3bio.ens.avatar || null;
      records = web3bio.ens.records || {};
      efp = web3bio.efp || null;
    }
  } catch (err) {
    console.warn('Web3.bio fallback triggered:', err.message);
  }

  if (!address) {
    try {
      address = await provider.resolveName(name);
    } catch (err) {
      console.warn('Fallback address resolution failed:', err.message);
    }
  }

  if (!avatar) {
    try {
      const resolver = await provider.getResolver(name);
      avatar = resolver ? await resolver.getText('avatar') : null;
    } catch (err) {
      console.warn('Fallback avatar fetch failed:', err.message);
    }
  }

  try {
    const reverse = await provider.lookupAddress(address);
    isPrimary = reverse === name;
  } catch (err) {
    isPrimary = false;
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
