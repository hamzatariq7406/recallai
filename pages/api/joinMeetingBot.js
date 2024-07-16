import axios from "axios";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { meetingLink } = req.body;

        const { data } = await axios.post(`${process.env.RECALL_AI_BASE_URL}/bot`, {
            meeting_url: meetingLink,
            transcription_options: {
                provider: "meeting_captions"
            }
        },
            {
                headers: {
                    Authorization: `Token ${process.env.RECALL_AI_API_KEY}`
                }
            })

        if (data) {
            res.status(200).json({ status: 'joined' });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}