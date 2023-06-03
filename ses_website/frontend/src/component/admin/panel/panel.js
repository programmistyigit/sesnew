import { useContext, useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import Context from "../../../context"
import WithHeaderExample from "../message/message"
import OffcanvasExample from "../navbar/navbar"

function Panel() {
    const [message, setMessage] = useState(false)
    const [admin, setAdmin] = useState(true)
    const { server } = useContext(Context)
    useEffect(() => {
        fetch(server + "message/all", {
            credentials: "include"
        }).then(data => data.json())
            .then(res => {
                if (res.status === "error") return setAdmin(false)
                setMessage(res)
                console.log(res);
            })
    }, [server])
    if (!admin) return <Navigate to={"/"} />


    return (
        <>
            <OffcanvasExample />
            {!message ? (
                <div className='loaderDiv'>
                    <span className="loader"></span>
                </div>
            ) : (

                <footer className="w-100 d-flex justify-content-center">
                    <div className="w-75">
                        {message.map((msg)=>(<WithHeaderExample key={msg._id} {...msg} />))}
                    </div>
                </footer>
            )}
        </>
    )
}

export default Panel