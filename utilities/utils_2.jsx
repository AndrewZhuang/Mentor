import React, { useEffect } from 'react';
import { pdfjs } from 'pdfjs-dist';

export default function PdfViewer() {
    pdfjs.getDocument('/dist/pdf_assets/azl5929_q1.pdf').promise.then(function(pdf) {
        // Get the first page of the PDF
        pdf.getPage(1).then(function(page) {
            // Get the text content of the page
            page.getTextContent().then(function(textContent) {
                // Extract the text from the text content
                var text = '';
                for (var i = 0; i < textContent.items.length; i++) {
                text += textContent.items[i].str + ' ';
                }
                console.log(text); // Output the text to the console
            });
        });
    });
}
