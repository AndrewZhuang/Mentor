import { useState } from "react";
import "./App.css";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { useDbUpdate, useDbData } from "../../utilities/firebase";
// import storage from "../../utilities/firebase";
// import { parsePDF } from "../utilities/utils.jsx";
import React from "react";
import Form from "./pages/Form";

const App = () => {
  const [count, setCount] = useState(0);

    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration

    const [PDFModal, setPDFModal] = useState(false);
    const openPDFModal = () => {
      console.log('hello');
      setPDFModal(true);
      console.log(PDFModal);
    };
    const closePDFModal = () => setPDFModal(false);
    // Initialize Firebase
    // const app = initializeApp(firebaseConfig);
    // Initialize Cloud Storage and get a reference to the service
    // const storage = getStorage(app);

  return (
    // <Router>
    //   <Routes>
    //     <Route 
    //       path = "/"
    //       element = {<Page1/>}>
    //     </Route>
        
    //   </Routes>
    // </Router>
    <div className="App">
      <header className="App-header">
        {/* <UploadPDF showModal={PDFModal}
          onCloseModal={closePDFModal}>
        </UploadPDF> */}

        <Form />

      {/* <Button onClick={parsePDF()}></Button> */}

      </header>
    </div>
  );
};

export default App;
