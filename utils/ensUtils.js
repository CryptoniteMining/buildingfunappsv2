import { ethers } from 'ethers';
import { getAvatar, getEnsName } from '@ensdomains/ensjs';

export async function getEnsData(name) {
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

  return {
    name,
    address,
    avatar,
    isPrimary,
  };
}
