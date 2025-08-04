import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, ArrowDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import jsPDF from "jspdf";

interface SaveResultsProps {
  validationData: {
    idea: string;
    targetCustomer: string;
    problemSolved: string;
    feedback: string;
  };
}

export default function SaveResults({ validationData }: SaveResultsProps) {
  const [generating, setGenerating] = useState(false);
  const { toast } = useToast();

  const generatePDF = async () => {
    setGenerating(true);
    try {
      // Create a clean text version of the feedback with proper sections
      let cleanFeedback = validationData.feedback
        // Remove code blocks and markdown artifacts first
        .replace(/```html/gi, '')
        .replace(/```/g, '')
        .replace(/`/g, '')
        // Replace HTML elements with proper spacing
        .replace(/<div[^>]*>/gi, '\n\n')
        .replace(/<\/div>/gi, '')
        .replace(/<h3[^>]*>/gi, '\n\n**')
        .replace(/<\/h3>/gi, '**\n')
        .replace(/<h4[^>]*>/gi, '\n\n**')
        .replace(/<\/h4>/gi, '**\n')
        .replace(/<p[^>]*>/gi, '\n')
        .replace(/<\/p>/gi, '')
        .replace(/<ul[^>]*>/gi, '\n')
        .replace(/<\/ul>/gi, '')
        .replace(/<li[^>]*>/gi, '\n• ')
        .replace(/<\/li>/gi, '')
        .replace(/<strong[^>]*>/gi, '**')
        .replace(/<\/strong>/gi, '**')
        .replace(/<em[^>]*>/gi, '')
        .replace(/<\/em>/gi, '')
        // Remove any remaining HTML tags
        .replace(/<[^>]*>/g, '')
        // Clean HTML entities
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&hellip;/g, '...')
        // Clean up excessive whitespace
        .replace(/\n{3,}/g, '\n\n')
        .replace(/\s{2,}/g, ' ')
        .trim();

      // Parse feedback into sections - much more aggressive section detection
      const feedbackSections = [];
      
      // Split by common section patterns
      const sectionPatterns = [
        /Overall Fit Score[:\s]/i,
        /What Makes This Special[:\s]/i,
        /Market Reality Check[:\s]/i,
        /Find Your Customers[:\s]/i,
        /Next Steps[:\s]/i,
        /Customer Reality Simulation[:\s]/i,
        /Revenue Potential[:\s&]/i,
        /Business Model[:\s]/i,
        /Launch Timeline[:\s]/i,
        /Risk Assessment[:\s]/i,
        /Success Metrics[:\s]/i,
        /One Suggestion[:\s]/i,
        /Customer #\d+[:\s]/i,
        /Market Analysis[:\s]/i,
        /Pricing Strategy[:\s]/i,
        /Revenue Projections[:\s]/i,
        /Key Milestones[:\s]/i
      ];
      
      // Split the text into chunks based on these patterns
      let remainingText = cleanFeedback;
      
      for (const pattern of sectionPatterns) {
        const matches = Array.from(remainingText.matchAll(new RegExp(pattern.source, 'gi')));
        
        for (const match of matches) {
          const startIndex = match.index!;
          const sectionTitle = match[0].replace(/[:\s]+$/, '').trim();
          
          // Find the end of this section (next section or end of text)
          let endIndex = remainingText.length;
          for (const otherPattern of sectionPatterns) {
            const nextMatch = remainingText.search(new RegExp(otherPattern.source, 'gi'));
            if (nextMatch > startIndex && nextMatch < endIndex) {
              endIndex = nextMatch;
            }
          }
          
          const sectionContent = remainingText.substring(startIndex, endIndex).trim();
          
          if (sectionContent.length > sectionTitle.length + 10) { // Ensure there's actual content
            feedbackSections.push({
              title: sectionTitle,
              content: sectionContent.replace(new RegExp(pattern.source, 'i'), '').trim()
            });
          }
        }
      }
      
      // If no sections found, create manual sections by splitting on common delimiters
      if (feedbackSections.length === 0) {
        const manualSections = cleanFeedback.split(/(?=\b(?:Overall|What|Market|Find|Next|Customer|Revenue|Business|Launch|Risk|Success|One)\b)/i);
        
        for (let i = 0; i < manualSections.length; i++) {
          const section = manualSections[i].trim();
          if (section.length > 50) { // Only include substantial sections
            const lines = section.split('\n');
            const title = lines[0].length < 100 ? lines[0] : `Analysis Part ${i + 1}`;
            const content = lines.slice(1).join('\n').trim();
            
            feedbackSections.push({
              title: title,
              content: content || section
            });
          }
        }
      }
      
      // Create PDF
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.width;
      const pageHeight = doc.internal.pageSize.height;
      const margin = 20;
      const lineHeight = 7;
      let yPosition = margin;

      // Title
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.text("STARTUP IDEA VALIDATION REPORT", pageWidth / 2, yPosition, { align: "center" });
      yPosition += lineHeight * 2;

      // Subtitle
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text("Generated by ValidatorAI.com", pageWidth / 2, yPosition, { align: "center" });
      yPosition += lineHeight;
      doc.text(`Date: ${new Date().toLocaleDateString()}`, pageWidth / 2, yPosition, { align: "center" });
      yPosition += lineHeight * 3;

      // Content sections - include individual feedback sections
      const sections = [
        { title: "IDEA", content: validationData.idea },
        { title: "TARGET CUSTOMER", content: validationData.targetCustomer },
        { title: "PROBLEM SOLVED", content: validationData.problemSolved },
        ...feedbackSections.map(section => ({
          title: `VAL'S ANALYSIS: ${section.title.toUpperCase()}`,
          content: section.content.trim()
        }))
      ];

      sections.forEach((section, index) => {
        // Check if we need a new page
        if (yPosition > pageHeight - 60) {
          doc.addPage();
          yPosition = margin;
        }

        // Add separator line (except for first section)
        if (index > 0) {
          doc.setLineWidth(0.5);
          doc.line(margin, yPosition - 5, pageWidth - margin, yPosition - 5);
          yPosition += 5;
        }

        // Section title with background box
        doc.setFillColor(240, 240, 240);
        doc.rect(margin, yPosition - 5, pageWidth - 2 * margin, 12, 'F');
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(50, 50, 50);
        doc.text(section.title, margin + 5, yPosition + 3);
        yPosition += lineHeight * 2.5;

        // Section content
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        const splitText = doc.splitTextToSize(section.content, pageWidth - 2 * margin - 10);
        splitText.forEach((line: string) => {
          if (yPosition > pageHeight - 25) {
            doc.addPage();
            yPosition = margin;
          }
          doc.text(line, margin + 5, yPosition);
          yPosition += lineHeight;
        });
        yPosition += lineHeight * 2;
      });

      // Footer
      doc.setFontSize(8);
      doc.setFont("helvetica", "italic");
      const footerText = "Generated by ValidatorAI.com - Your AI Startup Mentor";
      doc.text(footerText, pageWidth / 2, pageHeight - 10, { align: "center" });

      // Save the PDF with a short, unique name
      const ideaWords = validationData.idea.split(' ').slice(0, 3).join('-').replace(/[^a-zA-Z0-9-]/g, '').toLowerCase();
      const timestamp = Date.now().toString().slice(-6); // Last 6 digits for uniqueness
      doc.save(`val-report-${ideaWords}-${timestamp}.pdf`);

      toast({
        title: "PDF Downloaded!",
        description: "Your validation report has been saved as a PDF",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate PDF report",
        variant: "destructive",
      });
    } finally {
      setGenerating(false);
    }
  };

  return (
    <Card className="shadow-lg border-2 border-blue-500/20 bg-gradient-to-r from-blue-500/10 to-green-500/10">
      <CardContent className="p-6">
        <h4 className="text-lg font-bold text-blue-600 mb-4 flex items-center gap-2">
          💾 Save Your Results
        </h4>
        <p className="text-sm text-foreground/80 mb-4">
          Download your complete validation report to keep and share with others!
        </p>
        
        <div className="flex justify-center">
          <Button
            onClick={generatePDF}
            disabled={generating}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Download className="w-4 h-4 mr-2" />
{generating ? "Generating PDF..." : "Download PDF Report"}
          </Button>
        </div>
        
        {/* Encouragement section */}
        <div className="mt-8 text-center p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl border border-primary/20">
          <div className="mb-4"></div>
          <div className="mb-4"></div>
          <p className="text-foreground/80 text-lg mb-2">
            <span className="font-semibold">Great work exploring your idea!</span> 🎉
          </p>
          <p className="text-foreground/70 mb-3">
            Here is the next step to validate. Create a free landing page mockup to visualize your idea clearly. It's free.
          </p>
          <div className="flex justify-center">
            <ArrowDown className="w-6 h-6 text-primary animate-bounce" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}