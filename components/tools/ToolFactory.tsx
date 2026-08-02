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

interface ToolFactoryProps {
  toolId: string;
  title: string;
  description: string;
  article: string;
  dict: any;
}

export function ToolFactory({ toolId, title, description, article, dict }: ToolFactoryProps) {
  const tools: { [key: string]: ReactNode } = {
    'age-calculator': <AgeCalculator title={title} description={description} article={article} dict={dict} />,
    'discount-calculator': <DiscountCalculator title={title} description={description} article={article} dict={dict} />,
    'bmi-calculator': <BMICalculator title={title} description={description} article={article} dict={dict} />,
    'days-between-dates': <DaysBetweenDates title={title} description={description} article={article} dict={dict} />,
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
  };

  return tools[toolId] || <div>Tool not found</div>;
}