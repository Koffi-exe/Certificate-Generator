import React, { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const CertificateGenerator: React.FC = () => {
  const [certificateName, setCertificateName] = useState("");
  const [certificateDescription, setCertificateDescription] = useState(
    "This is to certify that the individual has successfully completed the required criteria."
  );
  const [receiverName, setReceiverName] = useState<string>("Your Name");
  const [receiverColor, setReceiverColor] = useState<string>("text-yellow-600");
  const [issueDate, setIssueDate] = useState("");
  const [validity, setValidity] = useState(NaN);
  const [exipryDate, setExpiryDate] = useState<string | null>(null);
  const [certificateBackground, setCertificateBackground] = useState<string>("bg-white");
  const [borderColor, setBorderColor] = useState<string>("border-Certificate-yellow");
  const [textColor, setTextColor] = useState<string>("text-black");

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
  }, [validity, certificateBackground]);

  return (
    <>
      {/* Certificate Preview */}
      <div className={`bg-gray-100 ${textColor} px-4 py-10 flex flex-col items-center`}>
        <div
          ref={certificateRef}
          className={`${certificateBackground} border-4 ${borderColor} p-6 sm:p-10 w-full max-w-[900px] h-[500px] sm:h-[600px] rounded-md shadow-md flex flex-col justify-between`}
        >
          <div className="text-2xl sm:text-4xl lg:text-6xl font-bold text-center">
            <h1>{certificateName || "Certificate Title"}</h1>
          </div>

          <div className="text-center px-2">
            <p className="text-sm sm:text-lg">{certificateDescription}</p>
            <h2 className={`text-xl sm:text-3xl lg:text-4xl underline mt-6 ${receiverColor} font-black`}>
              {receiverName}
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row justify-between text-sm sm:text-lg mt-10 gap-2 sm:gap-0">
            <p>Issued on: {issueDate}</p>
            {!isNaN(validity) && <p>Valid until: {exipryDate}</p>}
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="p-4 sm:p-8 bg-gray-200 space-y-4">
        {/* Certificate Name, Description, Receiver */}
        {[
          { label: "Certificate Name", value: certificateName, setter: setCertificateName },
          { label: "Description", value: certificateDescription, setter: setCertificateDescription },
          { label: "Receiver Name", value: receiverName, setter: setReceiverName },
        ].map(({ label, value, setter }, index) => (
          <div key={index} className="flex flex-col sm:flex-row gap-2 sm:gap-6 items-start sm:items-center">
            <label className="sm:w-40 font-medium">{label}:</label>
            <input
              className="p-2 flex-1 rounded w-full"
              type="text"
              value={value}
              onChange={(e) => setter(e.target.value)}
            />
          </div>
        ))}

        {/* Validity */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 items-start sm:items-center">
          <label className="sm:w-40 font-medium">Validity in years:</label>
          <input
            className="p-2 flex-1 rounded w-full"
            type="number"
            value={validity}
            onChange={(e) => setValidity(parseInt(e.target.value))}
          />
        </div>

        {/* Color Selectors */}
        <div className="flex flex-col md:flex-row gap-4 flex-wrap justify-center items-start">
          {[{
            label: "Background color",
            value: certificateBackground,
            setter: setCertificateBackground,
            options: [
              { val: "bg-white", label: "White" },
              { val: "bg-Certificate-red", label: "Red" },
              { val: "bg-Certificate-purple", label: "Purple" },
              { val: "bg-Certificate-green", label: "Green" },
              { val: "bg-Certificate-yellow", label: "Yellow" },
            ],
          },
          {
            label: "Border color",
            value: borderColor,
            setter: setBorderColor,
            options: [
              { val: "border-white", label: "White" },
              { val: "border-Certificate-red", label: "Red" },
              { val: "border-Certificate-purple", label: "Purple" },
              { val: "border-Certificate-green", label: "Green" },
              { val: "border-Certificate-yellow", label: "Yellow" },
            ],
          },
          {
            label: "Text color",
            value: textColor,
            setter: setTextColor,
            options: [
              { val: "text-black", label: "Black" },
              { val: "text-white", label: "White" },
              { val: "text-red-600", label: "Red" },
              { val: "text-purple-600", label: "Purple" },
              { val: "text-green-600", label: "Green" },
              { val: "text-yellow-600", label: "Yellow" },
            ],
          },
          {
            label: "Name color",
            value: receiverColor,
            setter: setReceiverColor,
            options: [
              { val: "text-black", label: "Black" },
              { val: "text-white", label: "White" },
              { val: "text-red-600", label: "Red" },
              { val: "text-purple-600", label: "Purple" },
              { val: "text-green-600", label: "Green" },
              { val: "text-yellow-600", label: "Yellow" },
            ],
          }].map(({ label, value, setter, options }, idx) => (
            <div key={idx} className="flex flex-col">
              <label className="font-medium">{label}:</label>
              <select
                className="p-2 rounded-md"
                value={value}
                onChange={(e) => setter(e.target.value)}
              >
                {options.map((opt, i) => (
                  <option key={i} value={opt.val}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* Download Button */}
        <div className="mt-6 text-center">
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
