import jsPDF from 'jspdf';

export const generatePengajuanPDF = (data) => {
  const doc = new jsPDF();
  
  // Set font
  doc.setFont('helvetica');
  
  // Title
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  const jenisText = data.jenis.charAt(0).toUpperCase() + data.jenis.slice(1);
  doc.text(`FORM PENGAJUAN ${jenisText.toUpperCase()}`, 105, 20, { align: 'center' });
  
  // Line separator
  doc.setLineWidth(0.5);
  doc.line(20, 25, 190, 25);
  
  // Content
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  
  let yPos = 40;
  const lineHeight = 10;
  
  // Nama
  doc.setFont('helvetica', 'bold');
  doc.text('Nama', 30, yPos);
  doc.setFont('helvetica', 'normal');
  doc.text(`: ${data.nama}`, 80, yPos);
  
  // NPM
  yPos += lineHeight;
  doc.setFont('helvetica', 'bold');
  doc.text('NPM', 30, yPos);
  doc.setFont('helvetica', 'normal');
  doc.text(`: ${data.npm}`, 80, yPos);
  
  // Program Studi
  yPos += lineHeight;
  doc.setFont('helvetica', 'bold');
  doc.text('Program Studi', 30, yPos);
  doc.setFont('helvetica', 'normal');
  doc.text(`: ${data.prodi}`, 80, yPos);
  
  // Tanggal
  yPos += lineHeight;
  doc.setFont('helvetica', 'bold');
  doc.text('Tanggal', 30, yPos);
  doc.setFont('helvetica', 'normal');
  const formattedDate = new Date(data.tanggal).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  doc.text(`: ${formattedDate}`, 80, yPos);
  
  // Keperluan
  yPos += lineHeight;
  doc.setFont('helvetica', 'bold');
  doc.text('Keperluan', 30, yPos);
  doc.setFont('helvetica', 'normal');
  
  // Handle long text for keperluan
  const keperluanLines = doc.splitTextToSize(`: ${data.keperluan}`, 110);
  doc.text(keperluanLines, 80, yPos);
  yPos += (keperluanLines.length - 1) * lineHeight;
  
  // Keterangan (if exists)
  if (data.keterangan) {
    yPos += lineHeight;
    doc.setFont('helvetica', 'bold');
    doc.text('Keterangan', 30, yPos);
    doc.setFont('helvetica', 'normal');
    const keteranganLines = doc.splitTextToSize(`: ${data.keterangan}`, 110);
    doc.text(keteranganLines, 80, yPos);
    yPos += (keteranganLines.length - 1) * lineHeight;
  }
  
  // Signatures
  yPos += 30;
  
  // Mengetahui section
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Mengetahui,', 30, yPos);
  
  // Koordinator Lab
  yPos += 10;
  doc.setFont('helvetica', 'normal');
  doc.text('Koordinator Lab', 30, yPos);
  
  yPos += 25;
  doc.text('_______________________', 30, yPos);
  yPos += 7;
  doc.text('( Budi Cahyono )', 30, yPos);
  
  // Kepala Lab
  yPos -= 32;
  doc.text('Kepala Lab', 120, yPos);
  
  yPos += 25;
  doc.text('_______________________', 120, yPos);
  yPos += 7;
  doc.text('( Ir. Titin Yulianti, S.T., M.Eng. )', 120, yPos);
  
  // Footer
  doc.setFontSize(9);
  doc.setFont('helvetica', 'italic');
  doc.text('Laboratorium Komputer - Universitas Lampung', 105, 280, { align: 'center' });
  
  // Save PDF
  const fileName = `Pengajuan_${jenisText}_${data.npm}_${Date.now()}.pdf`;
  doc.save(fileName);
};
