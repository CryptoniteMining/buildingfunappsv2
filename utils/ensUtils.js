import { getDefaultProvider } from 'ethers';
import { ENS } from '@ensdomains/ensjs';

const provider = getDefaultProvider('mainnet');

const ens = new ENS({ provider, ensAddress: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e' });

export async function getEnsData(name) {
  try {
    const result = await ens.name(name).getAddress();
    return { name, address: result };
  } catch (error) {
    console.error('ENS Lookup Error:', error);
    throw new Error('Failed to fetch ENS name');
  }
}
