import { ExcelAnalyzer } from '../components/ExcelAnalyzer';

export default function ExcelAnalysisPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Excel Analysis</h1>
      <p className="text-gray-600 mb-8">
        Upload Excel files to analyze and edit them with AI assistance. The analysis is powered by Hugging Face's free AI models.
      </p>
      <ExcelAnalyzer />
    </div>
  );
} 