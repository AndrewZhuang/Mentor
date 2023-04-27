import React from "react";
import { TextField } from "@mui/material";
import { checkQualifications, compareResumeToJD } from "../../utilities/openai";

const JDComponent = ({ previousStep, nextStep, handleChange, setJobDescriptionString, setRes, setPrompt, values }) => {

  const GoBack = (e) => {
    e.preventDefault();
    previousStep();
  };

  const Continue = (e) => {
    e.preventDefault();
    document.getElementById("comparingText").innerHTML = "Processing Job Description..."
    checkQualifications(values.jobDescriptionString, values.prompt).then((res) => {
      setPrompt(res[1]);
      setRes(res[0]);
      console.log(res[0]);
      nextStep();
    })
  };

  return (
    <div class="container text-center">
      <h2 id="comparingText"></h2>
      <div class="row justify-content-center">
        <TextField
          type="text"
          placeholder="Enter Job Description Here"
          // variant="filled"
          value={values.jobDescriptionString}
          // onChange={() => handleChange("jobDescriptionString")}
          onChange={(e) => setJobDescriptionString(e.target.value)}
          hiddenLabel
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
      </div>
      <div class="row justify-content-center">
        {/* <div class="col-4">
          <button class="btn btn-primary" onClick={GoBack}>
            <b>Back</b>
          </button>
        </div> */}
        <div class="col-4">
          <button class="btn btn-primary" onClick={Continue} disabled={values.jobDescriptionString === ''}>
            <b>Continue</b>
          </button>
        </div>
      </div>
    </div>
  );
};

export default JDComponent;