import React, { useEffect, useState } from "react";
import Template1 from "../templates/Template1/Template1";
import Template2 from "../templates/Template2/Template2";
import Template3 from "../templates/Template3/Template3";
import Template4 from "../templates/Template4/Template4";

/* ✅ NEW */
import Template5 from "../templates/Template5/Template5";
import Template6 from "../templates/Template6/Template6";

import html2pdf from "html2pdf.js";

const Preview = () => {
  const [data, setData] = useState(null);

  // ===== LOAD (backend + fallback) =====
  useEffect(() => {
    fetch("http://localhost:5000/get")
      .then((res) => res.json())
      .then((dbData) => {
        if (dbData && dbData._id) {
          setData(dbData);
        } else {
          const saved = localStorage.getItem("portfolioData");
          if (saved) setData(JSON.parse(saved));
        }
      })
      .catch(() => {
        const saved = localStorage.getItem("portfolioData");
        if (saved) setData(JSON.parse(saved));
      });
  }, []);

  const downloadPDF = () => {
    const element = document.getElementById("cv-template");
    if (!element) {
      console.error("CV template not found!");
      return;
    }

    element.classList.add("pdf-mode");

    setTimeout(() => {
      html2pdf()
        .set({
          margin: 0,
          filename: `${data?.name || "CV"}.pdf`,
          image: { type: "jpeg", quality: 1 },
          html2canvas: {
            scale: 2,
            useCORS: true,
            scrollY: 0,
          },
          jsPDF: {
            unit: "mm",
            format: "a4",
            orientation: "portrait",
          },
          pagebreak: {
            mode: ["css"],
          },
        })
        .from(element)
        .toPdf()
        .get("pdf")
        .then((pdf) => {
          const total = pdf.internal.getNumberOfPages();
          if (total > 1) pdf.deletePage(total);
        })
        .save()
        .then(() => {
          element.classList.remove("pdf-mode");
        });
    }, 300);
  };

  if (!data) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  return (
    <div>

      {/* ================= UI ================= */}
      {data.template === "template5" ? (
        <Template5 data={data} downloadPDF={downloadPDF} />
      ) : data.template === "template3" ? (
        <Template3 data={data} downloadPDF={downloadPDF} />
      ) : (
        <Template1 data={data} downloadPDF={downloadPDF} />
      )}

      {/* ================= HIDDEN PDF ================= */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "210mm",
          visibility: "hidden",
          pointerEvents: "none",
        }}
      >
        {data.template === "template5" ? (
          <Template6 data={data} />
        ) : data.template === "template3" ? (
          <Template4 data={data} />
        ) : (
          <Template2 data={data} />
        )}
      </div>

    </div>
  );
};

export default Preview;