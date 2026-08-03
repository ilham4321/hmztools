'use client';

import { ReactNode } from 'react';
import { AgeCalculator } from './AgeCalculator';
import { DiscountCalculator } from './DiscountCalculator';
import { BMICalculator } from './BMICalculator';
import { DaysBetweenDates } from './DaysBetweenDates';
import { RandomNumberGenerator } from './RandomNumberGenerator';
import { WordCounter } from './WordCounter';
import { PasswordGenerator } from './PasswordGenerator';
import { ImageCompressor } from './ImageCompressor';
import { QRCodeGenerator } from './QRCodeGenerator';
import { UUIDGenerator } from './UUIDGenerator';
import { JSONFormatter } from './JSONFormatter';
import { Base64Encoder } from './Base64Encoder';
import { URLEncoder } from './URLEncoder';
import { ColorConverter } from './ColorConverter';
import { HashGenerator } from './HashGenerator';
import { CodeEditor } from './CodeEditor';
import { PDFToImages } from './PDFTools/PDFToImages';
import { PDFTextExtractor } from './PDFTools/PDFTextExtractor';
import { PDFInfoViewer } from './PDFTools/PDFInfoViewer';
import { PDFRotator } from './PDFTools/PDFRotator';

interface ToolFactoryProps {
  toolId: string;
  title: string;
  description: string;
  article: string;
  dict: any;
}

export function ToolFactory({ toolId, title, description, article, dict }: ToolFactoryProps) {
  // Mapping semua tool dengan ID yang sama dengan slug di data/tools.ts
  const tools: { [key: string]: ReactNode } = {
    'age-calculator': <AgeCalculator title={title} description={description} article={article} dict={dict} />,
    'discount-calculator': <DiscountCalculator title={title} description={description} article={article} dict={dict} />,
    'bmi-calculator': <BMICalculator title={title} description={description} article={article} dict={dict} />,
    'days-between-dates': <DaysBetweenDates title={title} description={description} article={article} dict={dict} />,
    'pdf-to-images': <PDFToImages title={title} description={description} article={article} dict={dict} />,
    'pdf-text-extractor': <PDFTextExtractor title={title} description={description} article={article} dict={dict} />,
    'pdf-info-viewer': <PDFInfoViewer title={title} description={description} article={article} dict={dict} />,
    'pdf-rotator': <PDFRotator title={title} description={description} article={article} dict={dict} />,
    'random-number': <RandomNumberGenerator title={title} description={description} article={article} dict={dict} />,
    'word-counter': <WordCounter title={title} description={description} article={article} dict={dict} />,
    'password-generator': <PasswordGenerator title={title} description={description} article={article} dict={dict} />,
    'image-compressor': <ImageCompressor title={title} description={description} article={article} dict={dict} />,
    'qr-code-generator': <QRCodeGenerator title={title} description={description} article={article} dict={dict} />,
    'uuid-generator': <UUIDGenerator title={title} description={description} article={article} dict={dict} />,
    'json-formatter': <JSONFormatter title={title} description={description} article={article} dict={dict} />,
    'base64-encoder': <Base64Encoder title={title} description={description} article={article} dict={dict} />,
    'url-encoder': <URLEncoder title={title} description={description} article={article} dict={dict} />,
    'color-converter': <ColorConverter title={title} description={description} article={article} dict={dict} />,
    'hash-generator': <HashGenerator title={title} description={description} article={article} dict={dict} />,
    'code-editor': <CodeEditor title={title} description={description} article={article} dict={dict} />,
  };

  const toolComponent = tools[toolId];
  
  if (!toolComponent) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <div className="card-glass p-8">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Tool Not Found</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Maaf, tool yang Anda cari tidak ditemukan. Silakan kembali ke halaman utama.
          </p>
          <button 
            onClick={() => window.location.href = '/'}
            className="btn-primary mt-4"
          >
            Kembali ke Home
          </button>
        </div>
      </div>
    );
  }

  return toolComponent;
}