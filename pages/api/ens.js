
import { getEnsData } from '../../../utils/ensUtils';

export default async function handler(req, res) {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ error: 'ENS name is required' });
  }

  try {
    const data = await getEnsData(name);
    return res.status(200).json(data);
  } catch (err) {
    console.error('ENS Fetch Error:', err.message);
    return res.status(500).json({ error: 'Failed to fetch ENS data' });
  }
}
