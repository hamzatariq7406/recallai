'use client'
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    getAllTranscriptions();
  }, [])

  const getAllTranscriptions = async () => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/getTranscriptions`, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    if (data?.data) {
      setMeetings(data?.data || [])
    }

    setLoading(false);
  }

  return (
    <div>
      {loading ?
        <h1> Loading meetings....</h1>
        :
        <div>
          <button onClick={() => router.push('/newMeeting')}>Join a meeting</button>
          {meetings?.map((item, index) => {
            return <h3
              key={index}
              style={{ textDecoration: 'underline', color: 'blue', cursor: 'pointer' }}
              onClick={() => router.push(`/meeting/${item}`)}
            >
              Meeting {index} {index === 0 && '(Latest)'}
            </h3>
          })}
        </div>
      }
    </div>
  );
}
