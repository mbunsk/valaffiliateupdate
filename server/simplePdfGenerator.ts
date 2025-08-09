const { jsPDF } = require('jspdf');

interface ReportData {
  validationData: {
    idea: string;
    targetCustomer: string;
    problemSolved: string;
    feedback: string;
  };
  customerInsights: Array<{
    persona: {
      name: string;
      role: string;
      background: string;
      painPoints: string[];
      priceWillingness: string;
    };
  }>;
  simulationData?: Array<{
    month: number;
    title: string;
    users: number;
    wins?: string[];
    challenges?: string[];
  }>;
}

export class SimplePDFGenerator {
  generateBusinessReportPDF(data: ReportData): Buffer {
    const doc = new jsPDF();
    let yPosition = 20;
    const pageWidth = doc.internal.pageSize.width;
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);

    // Helper function to add text with line wrapping
    const addWrappedText = (text: string, x: number, y: number, maxWidth: number, lineHeight = 7): number => {
      const lines = doc.splitTextToSize(text, maxWidth);
      lines.forEach((line: string, index: number) => {
        doc.text(line, x, y + (index * lineHeight));
      });
      return y + (lines.length * lineHeight);
    };

    // Title
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('Business Validation Report', margin, yPosition);
    yPosition += 15;

    // Idea name
    doc.setFontSize(16);
    doc.setFont('helvetica', 'normal');
    yPosition = addWrappedText(`Startup Idea: ${data.validationData.idea}`, margin, yPosition, contentWidth, 8);
    yPosition += 10;

    // Executive Summary
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Executive Summary', margin, yPosition);
    yPosition += 10;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    yPosition = addWrappedText(
      `Target Customer: ${data.validationData.targetCustomer}\nProblem Solved: ${data.validationData.problemSolved}`,
      margin, yPosition, contentWidth
    );
    yPosition += 15;

    // AI Validation Score
    const scoreMatch = data.validationData.feedback.match(/(\d+)\/100/);
    const score = scoreMatch ? scoreMatch[1] : 'N/A';
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`Validation Score: ${score}/100`, margin, yPosition);
    yPosition += 15;

    // Customer Research
    if (data.customerInsights.length > 0) {
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Customer Research Results', margin, yPosition);
      yPosition += 10;

      data.customerInsights.forEach((insight, index) => {
        if (yPosition > 250) {
          doc.addPage();
          yPosition = 20;
        }

        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(`Customer ${index + 1}: ${insight.persona.name}`, margin, yPosition);
        yPosition += 8;

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        yPosition = addWrappedText(
          `Role: ${insight.persona.role}\nBackground: ${insight.persona.background}\nWillingness to Pay: ${insight.persona.priceWillingness}`,
          margin, yPosition, contentWidth
        );
        yPosition += 10;

        if (insight.persona.painPoints.length > 0) {
          doc.text('Key Pain Points:', margin, yPosition);
          yPosition += 5;
          insight.persona.painPoints.forEach(pain => {
            yPosition = addWrappedText(`• ${pain}`, margin + 10, yPosition, contentWidth - 10);
            yPosition += 2;
          });
        }
        yPosition += 10;
      });
    }

    // Simulation Results
    if (data.simulationData && data.simulationData.length > 0) {
      if (yPosition > 200) {
        doc.addPage();
        yPosition = 20;
      }

      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('6-Month Growth Projection', margin, yPosition);
      yPosition += 10;

      data.simulationData.slice(0, 6).forEach(month => {
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text(`Month ${month.month}: ${month.title}`, margin, yPosition);
        yPosition += 6;

        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.text(`Users: ${month.users?.toLocaleString() || 'N/A'}`, margin + 10, yPosition);
        yPosition += 8;
      });
    }

    // AI Feedback Summary
    if (yPosition > 220) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('AI Analysis Summary', margin, yPosition);
    yPosition += 10;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const cleanFeedback = data.validationData.feedback
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/\n+/g, '\n')   // Clean up newlines
      .trim();
    
    addWrappedText(cleanFeedback.substring(0, 1000) + '...', margin, yPosition, contentWidth);

    return Buffer.from(doc.output('arraybuffer'));
  }
}