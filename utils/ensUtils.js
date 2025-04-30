
export async function getEnsData(name) {
  const response = await fetch(`https://metadata.ens.domains/mainnet/${name}`);
  if (!response.ok) {
    throw new Error('Failed to fetch metadata');
  }
  const data = await response.json();
  return data;
}
