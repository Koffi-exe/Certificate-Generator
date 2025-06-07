import React, { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const CertificateGenerator: React.FC = () => {
  const [certificateName, setCertificateName] = useState("");
  const [certificateDescription, setCertificateDescription] = useState(
    "This is to certify that the individual has successfully completed the required criteria."
  );
  const [receiverName, setReceiverName] = useState("Your Name");
  const [issueDate, setIssueDate] = useState("");
  const [validity, setValidity] = useState(NaN)
  const [exipryDate, setExpiryDate] = useState<string | null>(null);




  const certificateRef = useRef<HTMLDivElement>(null);

  const generateCertificate = () => {
    const timestamp = Date.now();
    const date = new Date(timestamp);
    const readable = date.toLocaleDateString();
    setIssueDate(readable);
    const expiry = new Date(date.setFullYear(date.getFullYear() + validity));
    setExpiryDate(expiry.toLocaleDateString());
  };

  const handleDownload = async () => {
    if (!certificateRef.current) return;

    const canvas = await html2canvas(certificateRef.current);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [canvas.width, canvas.height],
    });

    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save(`${receiverName || "certificate"}.pdf`);
  };

  useEffect(() => {
    generateCertificate();
  }, [validity]);

  return (
    <>
      {/* Certificate Preview */}
      <div className="bg-gray-100 p-10 flex flex-col items-center">
        <div
          ref={certificateRef}
          className="bg-white border-4 border-yellow-600 p-10 w-[900px] h-[600px] rounded-md shadow-md flex flex-col justify-between"
        >
          <div className={`text-6xl font-bold text-center`}>
            <h1 className="text-center">{certificateName || "Certificate Title"}</h1>
          </div>

          <div className="text-center">
            <p className="text-lg">{certificateDescription}</p>
            <h2 className="text-4xl font-semibold underline mt-6 text-yellow-600 font-black">{receiverName}</h2>
          </div>

          <div className="flex justify-between text-lg mt-10">
            <p>Issued on: {issueDate}</p>
            {!isNaN(validity)? <p>Valid until: {exipryDate}</p>: <></>}
          </div>
        </div>
      </div>

      {/* Form Inputs */}
      <div className="p-8 bg-gray-200 space-y-4">
        <div className="flex gap-6 items-center">
          <label className="w-40">Certificate Name:</label>
          <input
            className="p-2 flex-1 rounded"
            type="text"
            value={certificateName}
            onChange={(e) => setCertificateName(e.target.value)}
          />
        </div>
        <div className="flex gap-6 items-center">
          <label className="w-40">Description:</label>
          <input
            className="p-2 flex-1 rounded"
            type="text"
            value={certificateDescription}
            onChange={(e) => setCertificateDescription(e.target.value)}
          />
        </div>
        <div className="flex gap-6 items-center">
          <label className="w-40">Receiver Name:</label>
          <input
            className="p-2 flex-1 rounded"
            type="text"
            value={receiverName}
            onChange={(e) => setReceiverName(e.target.value)}
          />
        </div>
        <div className="flex gap-6 items-center">
          <label className="w-40">Validity in years:</label>
          <input
            className="p-2 flex-1 rounded"
            type="number"
            value={validity}
            onChange={(e) => setValidity(parseInt(e.target.value))}
          />
        </div>

        <div className="mt-6">
          <button
            onClick={handleDownload}
            className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Download Certificate
          </button>
        </div>
      </div>
    </>
  );
};

export default CertificateGenerator;
