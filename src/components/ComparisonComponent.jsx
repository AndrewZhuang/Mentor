import React from "react";


const ComparisonComponent = ({ response, nextStep }) => {

  const Continue = (e) => {
    console.log("wtf");
    e.preventDefault();
    nextStep();
  };

  return (
    <div class="container text-center">
      <h2>Resume and Job Description Comparison</h2>
      <p>{response==='' ? "Comparing Job Description to Resume" : response}</p>
      <div class="align-self-center">
          <button class="btn btn-primary row justify-content-center" onClick={Continue} disabled={response===''}>
            <b>Continue</b>
          </button>
        </div>
    </div>
  );
};

export default ComparisonComponent;