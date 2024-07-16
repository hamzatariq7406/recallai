'use client'

import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Meeting() {
    const router = useRouter();
    const { id } = router.query;

    const [loading, setLoading] = useState(true);
    const [transcription, setTranscription] = useState([]);

    useEffect(() => {
        if (id) {
            getSingleMeetingDetail(id);
        }
    }, [id]);

    const getSingleMeetingDetail = async (meetingId) => {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/getSingleTranscription/${meetingId}`, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (data?.data) {
            setTranscription(data?.data || []);
        }

        setLoading(false);
    }

    return (
        <div>
            {loading ?
                <h1> Loading meeting detail....</h1>
                :
                <div>
                    <button onClick={() => router.push("/")}>Go Back</button>
                    <h1>Meeting Transcription:</h1>
                    {transcription?.map((item, index) => {
                        return <div key={index}>
                            <b>{item?.speaker}:</b>&emsp;
                            <span>{item?.word}</span>
                        </div>
                    })}
                </div>
            }
        </div>
    );
}
