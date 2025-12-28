import { NextResponse } from 'next/server';
import { HfInference } from '@huggingface/inference';

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY || '');

export async function POST(request: Request) {
  try {
    const { data, analysisType } = await request.json();

    // Convert Excel data to text format for analysis
    const textData = data.map((row: any[]) => row.join(' ')).join('\n');

    let result;
    switch (analysisType) {
      case 'summarize':
        result = await hf.summarization({
          model: 'facebook/bart-large-cnn',
          inputs: textData,
          parameters: {
            max_length: 130,
            min_length: 30,
          },
        });
        break;
      case 'insights':
        result = await hf.textGeneration({
          model: 'gpt2',
          inputs: `Analyze the following data and provide key insights:\n${textData}`,
          parameters: {
            max_new_tokens: 100,
            temperature: 0.7,
          },
        });
        break;
      default:
        return NextResponse.json({ error: 'Invalid analysis type' }, { status: 400 });
    }

    return NextResponse.json({ result });
  } catch (error) {
    console.error('Error analyzing Excel data:', error);
    return NextResponse.json(
      { error: 'Failed to analyze Excel data' },
      { status: 500 }
    );
  }
} 