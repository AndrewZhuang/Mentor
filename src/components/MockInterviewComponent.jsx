import { speak } from "../../utilities/texttospeech";
// import speechtotext from "../../utilities/speechtotext";
import React from "react";
import { TextField } from "@mui/material";
import { mockInterviewConversation, sendInput } from "../../utilities/openai"
import "./MockInterviewComponent.css"


const MockInterviewComponent = ({ previousConvo, firstMessage }) => {
    const [message, setMessage] = React.useState("");
    const [previousMessages, setPreviousMessages] = React.useState(previousConvo);
    const link_regex = /https:\/\/\S+/g;
    const link_replacement = "<a href=$& target=_blank>$&</a>"

    const handleClick = () => {
        document.getElementById("chatbox").innerHTML += `<p class='chattext'>You: ${message}</p>`;
        sendInput(message, previousMessages).then((res) => {
            setPreviousMessages(res[1]);
            // document.getElementById("chatbox").innerHTML += `<p class='chattext'>Mentor: ${res[0]}</p>`
            // same idea as activateLink helper, couldn't call it explicitly
            document.getElementById("chatbox").innerHTML += `<p class='chattext'>Mentor: ${res[0].replaceAll(link_regex, link_replacement)}</p>`
            setMessage("");
        })
        // mockInterviewConversation(message, previousConvo).then((res) => {
        //     setPreviousMessages(res);
        //     speak(res[0]);
        //     setMessage("");
        // });

    }

    const Enter = (e) => {
        if (e.key == "Enter") {
            // does same thing as handleClick, but couldn't call it explicitly as a helper function
            document.getElementById("chatbox").innerHTML += `<p class='chattext'>You: ${message}</p>`;
            sendInput(message, previousMessages).then((res) => {
                setPreviousMessages(res[1]);
                // document.getElementById("chatbox").innerHTML += `<p class='chattext'>Mentor: ${res[0]}</p>`
                // same idea as activateLink helper, couldn't call it explicitly
                document.getElementById("chatbox").innerHTML += `<p class='chattext'>Mentor: ${res[0].replaceAll(link_regex, link_replacement)}</p>`
                setMessage("");
            })
        }
    }

    return (
        <div>
            <div class="container chatwindow" id="chatbox">
                <p class='chattext'>Mentor: {firstMessage}</p>
                {/* {previousConvo.map((messageObject) => {
                    messageObject.role == "user"
                        ? <p className="userMessage" key={messageObject.content}>{messageObject.content}</p>
                        : <p className="aiMessage" key={messageObject.content}>{messageObject.content}</p>
                })} */}
            </div>
            <div class="input" style={{
                position:"relative"
            }}>
                <div class="input-holder" style={{
                    position:"absolute",
                    right:"0"
                }}  onKeyDown={Enter}>
                    <TextField
                        type="text"
                        placeholder="Enter questions or responses here"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        InputProps={{
                            style: {
                                background: "white",
                                fontSize: "0.8rem",
                                width: "625px",
                                marginRight: "16px",
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