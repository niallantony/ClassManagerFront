import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const backendUrl = import.meta.env.VITE_BACKEND_URL
export function Loader() {
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`${backendUrl}`, {
            method:"GET",
            credentials: "include",
        })
        .then((res) => res.json())
        .then((res) => {
            if (res.user) {
                navigate('/dash')
            } else {
                navigate('/splash')
            }
        })
        .catch((e) => console.log(e))
    })
    return (<div>Loading...</div>)
}