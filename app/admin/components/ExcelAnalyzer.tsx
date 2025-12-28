'use client';

import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import Spreadsheet from 'react-spreadsheet';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';

interface ExcelAnalyzerProps {
  className?: string;
}

type SpreadsheetData = { value: string | number | null }[][];

export const ExcelAnalyzer: React.FC<ExcelAnalyzerProps> = ({ className }) => {
  const [data, setData] = useState<SpreadsheetData>([]);
  const [analysis, setAnalysis] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const bstr = event.target?.result as string;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const jsonData = XLSX.utils.sheet_to_json(ws, { header: 1 }) as (string | number | null)[][];
      const formattedData: SpreadsheetData = jsonData.map(row =>
        row.map(cell => ({ value: cell }))
      );
      setData(formattedData);
    };
    reader.readAsBinaryString(file);
  };

  const analyzeData = async (type: 'summarize' | 'insights') => {
    try {
      setLoading(true);
      const response = await fetch('/api/excel-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: data.map(row => row.map(cell => cell.value)),
          analysisType: type,
        }),
      });

      const result = await response.json();
      if (result.error) {
        throw new Error(result.error);
      }

      setAnalysis(result.result.generated_text || result.result.summary_text);
    } catch (error) {
      console.error('Error analyzing data:', error);
      alert('Failed to analyze data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const downloadExcel = () => {
    const ws = XLSX.utils.aoa_to_sheet(
      data.map(row => row.map(cell => cell.value))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'analyzed_data.xlsx');
  };

  return (
    <Card className={`p-6 ${className}`}>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileUpload}
            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
          />
          <Button
            onClick={() => analyzeData('summarize')}
            disabled={loading || !data.length}
            variant="outline"
          >
            {loading ? 'Analyzing...' : 'Summarize'}
          </Button>
          <Button
            onClick={() => analyzeData('insights')}
            disabled={loading || !data.length}
            variant="outline"
          >
            {loading ? 'Analyzing...' : 'Get Insights'}
          </Button>
          <Button
            onClick={downloadExcel}
            disabled={!data.length}
            variant="outline"
          >
            Download Excel
          </Button>
        </div>

        {data.length > 0 && (
          <div className="border rounded-lg p-4 overflow-auto max-h-[500px]">
            <Spreadsheet data={data} />
          </div>
        )}

        {analysis && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">Analysis Results:</h3>
            <p className="whitespace-pre-wrap">{analysis}</p>
          </div>
        )}
      </div>
    </Card>
  );
}; 