import axios from "axios";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { data } = await axios.get(`${process.env.RECALL_AI_BASE_URL}/bot`, {
            headers: {
                Authorization: `Token ${process.env.RECALL_AI_API_KEY}`
            }
        })

        if (data) {
            const ids = data?.results?.map((item) => item?.id);
            res.status(200).json({ data: ids });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}