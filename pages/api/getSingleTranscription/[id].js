import axios from "axios";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { id } = req.query;
        const { data } = await axios.get(`${process.env.RECALL_AI_BASE_URL}/bot/${id}/transcript?enhanced_diarization=true`, {
            headers: {
                Authorization: `Token ${process.env.RECALL_AI_API_KEY}`
            }
        })

        if (data) {
            const transcriptWithSpeaker = data?.flatMap(item => {
                const speaker = item?.speaker;

                return item?.words?.map(word => ({
                    speaker,
                    word: word?.text
                }));
            });
            res.status(200).json({ data: transcriptWithSpeaker });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}