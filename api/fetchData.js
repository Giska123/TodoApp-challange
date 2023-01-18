import fetch from 'node-fetch';

export default async (req, res) => {
    const data = await fetch(`http://localhost:${process.env.JSON_SERVER_PORT}/activity`)
    const json = await data.json()
    res.json(json);
}