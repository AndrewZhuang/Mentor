function getStringFromVoice(old_convo){
    //Export this function and run when necessary
    if ("webkitSpeechRecognition" in window) {
        // Initialize webkitSpeechRecognition
    
        let speechRecognition = new webkitSpeechRecognition();
    
        // String for the Final Transcript
        let final_transcript = "";
    
        // Set the properties for the Speech Recognition object
        speechRecognition.continuous = true;
        speechRecognition.interimResults = true;
        speechRecognition.lang =  ['en-US', 'United States'];
    
    
        //Change these to where the user input shows up at.
        //     document.querySelector("#final").innerHTML = final_transcript; //Set these to the textbox where we show the user input
    //   document.querySelector("#interim").innerHTML = interim_transcript; //Kinda unnecessary but we can have it
    
        speechRecognition.onresult = (event) => {
            // Create the interim transcript string locally because we don't want it to persist like final transcript
            let interim_transcript = "";
    
            // Loop through the results from the speech recognition object.
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                // If the result item is Final, add it to Final Transcript, Else add it to Interim transcript
                if (event.results[i].isFinal) {
                    final_transcript += event.results[i][0].transcript;
                } else {
                    interim_transcript += event.results[i][0].transcript;
                }
    
            }
    
            console.log(interim_transcript);
    
    
        };
        //Change #start and #stop to whatever the start and stop buttons are
        document.querySelector("#start").onclick = () => {
            // Start the Speech Recognition
            speechRecognition.start();
        };
        // Set the onClick property of the stop button
        document.querySelector("#stop").onclick = () => {
            // Stop the Speech Recognition
            speechRecognition.stop();
            document.querySelector("#start").disabled = true; //Disables control of the start button and passes control to the openai and the other text to speech
            //Run Chat GPT here and grab the text from final or interim transcript and get output
            //run speak() on the output which will re enable the start button.
            //Maybe disable stop button here and re enable in speak() like the start button
            mockInterviewConversation(final_transcript, old_convo).then((res) => {
                let resume_string = res[0];
                let old_convo = new_convo;
                final_transcript = ""; //Reset final_transcript to empty string
                interim_transcript = ""; 
                document.getElementById("gpt-response").innerHTML = reponse_string;
                speak(response_string);
                
              }); //first oldconvo should be from initial resume prompt, every after will be updated here

        };
    
    }
    
    }
   
    