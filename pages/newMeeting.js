'use client'
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function NewMeeting() {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [meetingLink, setMeetingLink] = useState('');
    const [status, setStatus] = useState('');

    const joinMeetingHandler = async () => {
        if (!loading) {
            setStatus('Loading ...')
            setLoading(true);
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/joinMeetingBot`, { meetingLink }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (data?.status) {
                setStatus('Bot will join in few seconds....')
            } else {
                setStatus('Error in joining provided link...')
            }

            setLoading(false);
        }
    }

    return (
        <div>
            <button onClick={() => router.push("/")}>Go Back</button>
            <h1>Add meeting bot:</h1>
            <input
                placeholder="Paste meeting link"
                onChange={(e) => setMeetingLink(e.target.value)}
            />
            <button onClick={joinMeetingHandler}>Join</button>
            {status && <span> {status} </span>}
        </div>
    );
}
