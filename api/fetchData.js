import fetch from 'node-fetch';

export default async (req, res) => {
    const data = await fetch(`http://localhost:8004/activity`)
    const json = await data.json()
    res.json(json);
}