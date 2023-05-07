import { speak } from "../../utilities/texttospeech";
// import speechtotext from "../../utilities/speechtotext";
import React from "react";
import { TextField } from "@mui/material";
import { mockInterviewConversation, sendInput } from "../../utilities/openai"
import "./MockInterviewComponent.css"

const MockInterviewComponent = ({ previousConvo, firstMessage }) => {
    const [message, setMessage] = React.useState("");
    const [previousMessages, setPreviousMessages] = React.useState(previousConvo);

    const handleClick = () => {
        document.getElementById("chatbox").innerHTML += `<p class='chattext'>You: ${message}</p>`;
        sendInput(message, previousMessages).then((res) => {
            setPreviousMessages(res[1]);
            document.getElementById("chatbox").innerHTML += `<p class='chattext'>Mentor: ${res[0]}</p>`
            setMessage("");
        })
        // mockInterviewConversation(message, previousConvo).then((res) => {
        //     setPreviousMessages(res);
        //     speak(res[0]);
        //     setMessage("");
        // });

    }

    return (
        <div>
            <div class="container chatwindow" id="chatbox">
                <p class='chattext'>GPT: {firstMessage}</p>
                {/* {previousConvo.map((messageObject) => {
                    messageObject.role == "user"
                        ? <p className="userMessage" key={messageObject.content}>{messageObject.content}</p>
                        : <p className="aiMessage" key={messageObject.content}>{messageObject.content}</p>
                })} */}
            </div>
            <div class="input">
                <div>
                    <TextField
                        type="text"
                        placeholder="Enter questions or responses here"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        InputProps={{
                            style: {
                                background: "white",
                                fontSize: "0.8rem",
                                width: "90%",
                                marginLeft: "5%",
                                display: "flex",
                                alignText: "center",
                                borderRadius: "8px",
                                boxShadow: "inset 0 2px 8px #e5e5e5",
                            }
                            // disableUnderline: true,
                        }}
                    />
                    <button class="btn btn-primary" onClick={handleClick}>
                        Enter
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MockInterviewComponent