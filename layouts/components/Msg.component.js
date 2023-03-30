import React, { useEffect, useState } from "react";
// Icons
import { BsInfoCircle } from "react-icons/bs";

const Msg = ({ tasks, filter, loading }) => {
    const [Message, setMessage] = useState(null);
    useEffect(() => {
        if(loading) return;
        if(tasks.length > 0) {
            setMessage(null);
            return;
        }
        if (tasks.length <= 0 && filter === "all") {
            setMessage({
                title: "No items found",
                text: "You haven't added any task. Add one"
            });
        }
        if (tasks.length <= 0 && filter === "active") {
            setMessage({
                title: "No active tasks found",
                text: "¡Great! You don't have active tasks"
            });
        }
        if (tasks.length <= 0 && filter === "completed") {
            setMessage({
                title: "No completed tasks found",
                text: "So bad... You need to get back to work!"
            });
        }
    }, [tasks]);
    return (
        <>
            {
                Message
                    ?
                    <div className="msg">
                        <BsInfoCircle className="icon"/>
                        <h2 className="title">
                            {Message.title}:
                        </h2>
                        <span className="text">{Message.text}</span>
                    </div>
                    : null
            }
        </>
    )
}

export default Msg;
