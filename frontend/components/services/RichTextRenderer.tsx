/**
 * RichTextRenderer Component
 * 
 * Renders rich text content from Payload CMS (Slate editor format)
 * Supports various text formatting, lists, links, and semantic HTML
 * 
 * Validates Requirements: 15.1 (Semantic HTML)
 */

import React from 'react';
import { RichTextContent } from '@/types/service';

interface RichTextRendererProps {
  content: RichTextContent;
  className?: string;
}

/**
 * Render a single Slate node
 */
function renderNode(node: any, index: number): React.ReactNode {
  // Handle text nodes
  if (node.text !== undefined) {
    let text: React.ReactNode = node.text;

    // Apply text formatting
    if (node.bold) {
      text = <strong key={index}>{text}</strong>;
    }
    if (node.italic) {
      text = <em key={index}>{text}</em>;
    }
    if (node.underline) {
      text = <u key={index}>{text}</u>;
    }
    if (node.strikethrough) {
      text = <s key={index}>{text}</s>;
    }
    if (node.code) {
      text = <code key={index} className="px-1.5 py-0.5 bg-gray-100 rounded text-sm font-mono">{text}</code>;
    }

    return text;
  }

  // Handle element nodes
  const children = node.children?.map((child: any, i: number) => renderNode(child, i)) || [];

  switch (node.type) {
    case 'h1':
      return (
        <h1 key={index} className="text-4xl font-bold text-gray-900 mt-8 mb-4">
          {children}
        </h1>
      );
    case 'h2':
      return (
        <h2 key={index} className="text-3xl font-bold text-gray-900 mt-8 mb-4">
          {children}
        </h2>
      );
    case 'h3':
      return (
        <h3 key={index} className="text-2xl font-bold text-gray-900 mt-6 mb-3">
          {children}
        </h3>
      );
    case 'h4':
      return (
        <h4 key={index} className="text-xl font-bold text-gray-900 mt-6 mb-3">
          {children}
        </h4>
      );
    case 'h5':
      return (
        <h5 key={index} className="text-lg font-bold text-gray-900 mt-4 mb-2">
          {children}
        </h5>
      );
    case 'h6':
      return (
        <h6 key={index} className="text-base font-bold text-gray-900 mt-4 mb-2">
          {children}
        </h6>
      );
    case 'blockquote':
      return (
        <blockquote key={index} className="border-l-4 border-blue-500 pl-4 py-2 my-4 italic text-gray-700 bg-gray-50">
          {children}
        </blockquote>
      );
    case 'ul':
      return (
        <ul key={index} className="list-disc list-inside space-y-2 my-4 ml-4">
          {children}
        </ul>
      );
    case 'ol':
      return (
        <ol key={index} className="list-decimal list-inside space-y-2 my-4 ml-4">
          {children}
        </ol>
      );
    case 'li':
      return (
        <li key={index} className="text-gray-700">
          {children}
        </li>
      );
    case 'link':
      return (
        <a
          key={index}
          href={node.url}
          target={node.newTab ? '_blank' : undefined}
          rel={node.newTab ? 'noopener noreferrer' : undefined}
          className="text-blue-600 hover:text-blue-800 underline"
        >
          {children}
        </a>
      );
    case 'indent':
      return (
        <div key={index} className="ml-8">
          {children}
        </div>
      );
    case 'relationship':
      // Handle relationship fields if needed
      return null;
    case 'upload':
      // Handle upload fields if needed
      return null;
    default:
      // Default to paragraph
      return (
        <p key={index} className="text-gray-700 leading-relaxed my-4">
          {children}
        </p>
      );
  }
}

/**
 * RichTextRenderer component
 * 
 * Renders Payload CMS rich text content with proper semantic HTML
 * and Tailwind CSS styling
 */
export default function RichTextRenderer({ content, className = '' }: RichTextRendererProps) {
  // Handle empty or invalid content
  if (!content || !Array.isArray(content)) {
    return null;
  }

  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      {content.map((node: any, index: number) => renderNode(node, index))}
    </div>
  );
}
