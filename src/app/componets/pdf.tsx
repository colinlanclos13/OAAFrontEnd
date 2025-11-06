import { Document, Page } from "react-pdf";

//useless
const PDFViewer = (pdfUrl: any) => {
  return (
    <div>
      <Document file={pdfUrl}>
        <Page pageNumber={1} />
      </Document>
    </div>
  );
};

export default PDFViewer;
