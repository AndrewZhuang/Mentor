import React from "react";
import { runResponse, findResumeDiff } from "../../utilities/openai"
// import { PdfViewer } from "../../utilities/utils_2"
import { convertPdfToString } from "../../utilities/utils"
import "./ResumeComponent.css";

const ResumeComponent = ({ previousStep, nextStep, handleChange, setResumeString, setPrompt, values }) => {
  // drag state
  const [dragActive, setDragActive] = React.useState(false);
  const [fileExists, setFileExists] = React.useState(false);
  const [resume, setResume] = React.useState("");
  // ref
  const inputRef = React.useRef(null);
  let fileName = "";

  // handle drag events
  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
      // console.log('hell');
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];

      if (!file) {
        alert("Please upload a file!");
      } else {

        let fileName = file.name;
        document.getElementById("uploadButton").innerHTML = fileName;
        let pdfText = convertPdfToString(file).then((text) => {

          values["resumeString"] = text;
          console.log(values);
          console.log(text);
          document.getElementById("instructions").innerHTML = "Processing Resume, Please Wait";
          setResume(text);
          setResumeString(text);

          runResponse(text).then((res) => {
            console.log(res);
            console.log(typeof res[0]);
            let resume_string = res[0];
            findResumeDiff(resume_string, resume);
            setPrompt(res[1]);
            document.getElementById("instructions").innerHTML = "Resume Processed!";
      
            // Write edited resume to 'updated_resume.txt' .
            // fs.writeFile("updated_resume.txt", resume_string, (err) => {
            //   // In case of a error throw err.
            //   if (err) throw err;
            // });
          });
        });
      }
      // setFileExists(true);
      setFileExists(true); ////////////////////////// Use to change button to an active color
    }
  };

  // triggers when file is selected with click
  const handleChangeDrag = function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      console.log(e);
      const file = e.target.files[0];

      if (!file) {
        alert("Please upload a file!");
      } else {
        let fileName = file.name;
        document.getElementById("uploadButton").innerHTML = fileName;
        let pdfText = convertPdfToString(file).then((text) => {
          values["resumeString"] = text;
          console.log(values);
          console.log(text);
          document.getElementById("instructions").innerHTML = "Processing Resume, Please Wait";
          setResume(text);
          setResumeString(text);

          runResponse(text).then((res) => {
            console.log(res);
            console.log(typeof res[0]);
            let resume_string = res[0];
            findResumeDiff(resume_string, resume);
            setPrompt(res[1]);
            document.getElementById("instructions").innerHTML = "Resume Processed!";
      
            // Write edited resume to 'updated_resume.txt' .
            // fs.writeFile("updated_resume.txt", resume_string, (err) => {
            //   // In case of a error throw err.
            //   if (err) throw err;
            // });
          });
        });
        setFileExists(true); ////////////////////////// Use to change button to an active color
      }
      // console.log(pdfText);
      // console.log(file.type);
    }
  };

  // triggers the input when the button is clicked
  const onButtonClick = () => {
    inputRef.current.click();
  };


  const GoBack = (e) => {
    e.preventDefault();
    previousStep();
  };

  const Continue = (e) => {
    console.log("clicky");
    e.preventDefault();

    // gettext("https://cdn.mozilla.net/pdfjs/tracemonkey.pdf").then(
    //   function (text) {
    //     alert("parse " + text);
    //   },
    //   function (reason) {
    //     console.error(reason);
    //   }
    // );

    // setResumeString(resume);
    nextStep();
  };

  return (
    <div class="wrapper">
      <div class="container">
        <h2 class="title" id="instructions">Please Upload Your Resume as a PDF</h2>
      </div>
      <div class="container">
        <form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
          <input ref={inputRef} type="file" id="input-file-upload" multiple={true} onChange={handleChangeDrag} />
          <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : ""}>
            <div>
              <p>Drag and drop your file here or</p>
              <button className="upload-button" onClick={onButtonClick} id="uploadButton">Upload a file</button>
            </div>
          </label>
          {dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>}
        </form>
      </div>
      <div class="container">
        <button type="submit" id="submit-resume-button" onClick={Continue} class="btn btn-primary" disabled={values.resumeString==='' || values.prompt===''}>Continue</button>
      </div>
    </div>
  );
};

export default ResumeComponent;
