export default async function handler(req, res) {
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
  
    const { origin, destination } = req.query;
    const GOOGLE_API_KEY = 'AIzaSyDFqp0PGp-vOy_BLx-ljnGZcUks9VbJgXM';
  
    if (!origin || !destination) {
      return res.status(400).json({ error: 'Origin and destination are required.' });
    }
  
    try {
      const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${encodeURIComponent(
        origin
      )}&destinations=${encodeURIComponent(destination)}&key=${GOOGLE_API_KEY}`;
  
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch data from Google API.');
      }
  
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  