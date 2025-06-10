import React, { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const CertificateGenerator: React.FC = () => {
  const [certificateName, setCertificateName] = useState("");
  const [certificateDescription, setCertificateDescription] = useState(
    "This is to certify that the individual has successfully completed the required criteria."
  );
  const [receiverName, setReceiverName] = useState<string>("Your Name");
  const [receiverColor, setReceiverColor] = useState<string>("text-yellow-600")
  const [issueDate, setIssueDate] = useState("");
  const [validity, setValidity] = useState(NaN);
  const [exipryDate, setExpiryDate] = useState<string | null>(null);
  const [certificateBackground, setCertificateBackground] =
    useState<string>("white");
  const [borderColor, setBorderColor] = useState<string>('border-Certificate-yellow')
  const [textColor, setTextColor] = useState<string>('text-black')

  const certificateRef = useRef<HTMLDivElement>(null);

  const generateCertificate = () => {
    const timestamp = Date.now();
    const date = new Date(timestamp);
    const readable = date.toLocaleDateString();
    const expiry = new Date(date.setFullYear(date.getFullYear() + validity));
    setIssueDate(readable);
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
    console.log(certificateBackground);
  }, [validity, certificateBackground]);

  return (
    <>
      {/* Certificate Preview */}
      <div className={`bg-gray-100 ${textColor} p-10 flex flex-col items-center`}>
        <div
          ref={certificateRef}
          className={`${certificateBackground} border-4 ${borderColor} p-10 w-[900px] h-[600px] rounded-md shadow-md flex flex-col justify-between`}
        >
          <div className={`text-6xl font-bold text-center`}>
            <h1 className="text-center">
              {certificateName || "Certificate Title"}
            </h1>
          </div>

          <div className="text-center">
            <p className="text-lg">{certificateDescription}</p>
            <h2 className={`text-4xl underline mt-6 ${receiverColor} font-black`}>
              {receiverName}
            </h2>
          </div>

          <div className="flex justify-between text-lg mt-10">
            <p>Issued on: {issueDate}</p>
            {!isNaN(validity) ? <p>Valid until: {exipryDate}</p> : <></>}
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
        {/* Color and Font sections */}
        <div className="flex gap-6 justify-center items-center">
          {/* Background color */}
          <div className="flex gap-1 items-center">
            <label >Background color:</label>
            <select
              className="p-2 rounded-md"
              value={certificateBackground}
              onChange={(e) => setCertificateBackground(e.target.value)}
            >
              <option value="bg-white" className="py-4  bg-white">
                White
              </option>
              <option
                value="bg-Certificate-red"
                className="w-3 h-3 rounded-full bg-Certificate-red"
              >
                Red
              </option>
              <option
                value="bg-Certificate-purple"
                className="w-3 h-3 rounded-full bg-Certificate-purple"
              >
                Purple
              </option>
              <option
                value="bg-Certificate-green"
                className="w-3 h-3 rounded-full bg-Certificate-green"
              >
                Green
              </option>
              <option
                value="bg-Certificate-yellow"
                className="w-3 h-3 rounded-full bg-Certificate-yellow"
              >
                Yellow
              </option>
            </select>
          </div>
          {/* Border color */}
          <div className="flex gap-1 items-center">
            <label>Border color: </label>
            <select
              className="p-2 rounded-md"
              value={borderColor}
              onChange={(e) => setBorderColor(e.target.value)}
            >
              <option
                value="border-white"
                className="w-3 h-3 rounded-full bg-white"
              >
                White
              </option>
              <option
                value="border-Certificate-red"
                className="w-3 h-3 rounded-full bg-Certificate-red"
              >
                Red
              </option>
              <option
                value="border-Certificate-purple"
                className="w-3 h-3 rounded-full bg-Certificate-purple"
              >
                Purple
              </option>
              <option
                value="border-Certificate-green"
                className="w-3 h-3 rounded-full bg-Certificate-green"
              >
                Green
              </option>
              <option
                value="border-Certificate-yellow"
                className="w-3 h-3 rounded-full bg-Certificate-yellow"
              >
                Yellow
              </option>
            </select>
          </div>
          {/* Text color */}
          <div className="flex gap-1 items-center">
            <label>Text color: </label>
            <select
              className="p-2 rounded-md"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
            >
              <option
                value="text-black"
                className="w-3 h-3 rounded-full bg-black text-white"
              >
                Black
              </option>
              <option
                value="text-white"
                className="w-3 h-3 rounded-full bg-white"
              >
                White
              </option>
              <option
                value="text-red-600"
                className="w-3 h-3 rounded-full bg-red-600"
              >
                Red
              </option>
              <option
                value="text-purple-600"
                className="w-3 h-3 rounded-full bg-purple-600"
              >
                Purple
              </option>
              <option
                value="text-green-600"
                className="w-3 h-3 rounded-full bg-green-600"
              >
                Green
              </option>
              <option
                value="text-yellow-600"
                className="w-3 h-3 rounded-full bg-yellow-600"
              >
                Yellow
              </option>
            </select>
          </div>
          {/* Name color */}
          <div className="flex gap-1 items-center">
            <label>Name color: </label>
            <select
              className="p-2 rounded-md"
              value={receiverColor}
              onChange={(e) => setReceiverColor(e.target.value)}
            >
              <option
                value="text-black"
                className="w-3 h-3 rounded-full bg-black text-white"
              >
                Black
              </option>
              <option
                value="text-white"
                className="w-3 h-3 rounded-full bg-white"
              >
                White
              </option>
              <option
                value="text-red-600"
                className="w-3 h-3 rounded-full bg-red-600"
              >
                Red
              </option>
              <option
                value="text-purple-600"
                className="w-3 h-3 rounded-full bg-purple-600"
              >
                Purple
              </option>
              <option
                value="text-green-600"
                className="w-3 h-3 rounded-full bg-green-600"
              >
                Green
              </option>
              <option
                value="text-yellow-600"
                className="w-3 h-3 rounded-full bg-yellow-600"
              >
                Yellow
              </option>
            </select>
          </div>
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
