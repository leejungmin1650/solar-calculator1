import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export function PDFButton() {
  const download = () => {
    html2canvas(document.body).then((canvas) => {
      const pdf = new jsPDF();
      const img = canvas.toDataURL('image/png');
      pdf.addImage(img, 'PNG', 0, 20, 210, 0);
      pdf.setFontSize(10);
      pdf.text('www.dabinenc.com', 10, 10);
      pdf.text(
        '※ 본 수지분석표는 추정치를 기반으로 작성된 자료로, 실제 수익과 차이가 발생할 수 있습니다.',
        10,
        pdf.internal.pageSize.getHeight() - 20
      );
      pdf.save('solar-profit.pdf');
    });
  };

  return (
    <button onClick={download} className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white">
      PDF 다운로드
    </button>
  );
}