
export function speak(val) {
    const synth = window.speechSynthesis;
    if (synth.speaking) {
      console.error("speechSynthesis.speaking");
      return;
    }
  
      const utterThis = new SpeechSynthesisUtterance(val);
  
      utterThis.onend = function (event) {
        console.log("SpeechSynthesisUtterance.onend");
      };
  
      utterThis.onerror = function (event) {
        console.error("SpeechSynthesisUtterance.onerror");
      };
  
  
      //Temporary Solution for only the male english voice
      voices = synth.getVoices();
  
      utterThis.voice = voices[0];
  
      synth.speak(utterThis);
  
      // document.querySelector("#start").disabled = false;
      //Re-enables the user's speech button.
    }
  