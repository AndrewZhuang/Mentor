export const convertPdfToString = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const pdfData = event.target.result;
      const loadingTask = pdfjsLib.getDocument({data: pdfData});

      loadingTask.promise.then((pdf) => {
        const numPages = pdf.numPages;
        let text = '';

        for (let i = 1; i <= numPages; i++) {
          pdf.getPage(i).then((page) => {
            page.getTextContent().then((textContent) => {
              text += textContent.items.map(item => item.str).join(' ');
              if (i === numPages) {
                resolve(text);
              }
            });
          });
        }
      });
    };

    reader.onerror = (event) => {
      reject(event.target.error);
    };

    reader.readAsArrayBuffer(file);
  });
};