'use client'

import { useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
type Language = 'en' | 'fa'

interface RichTextEditorProps {
  value: string
  onChange: (content: string) => void
  language: Language
}

const RichTextEditor = ({ value, onChange, language }: RichTextEditorProps) => {
  // Parse HTML content before initializing the editor
  const parseContent = (content: string) => {
    if (!content) return ''
    const parser = new DOMParser()
    const doc = parser.parseFromString(content, 'text/html')
    return doc.body.innerHTML
  }

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        italic: {},
        bold: {},
        paragraph: {},
      }),
    ],
    content: parseContent(value),
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      onChange(html)
    },
    parseOptions: {
      preserveWhitespace: false,
    },
    editorProps: {
      attributes: {
        dir: language === 'fa' ? 'rtl' : 'ltr',
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none min-h-[200px] p-4 border border-gray-300 rounded-lg',
      },
    },
  })

  // Update editor content when value prop changes
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      const parsedContent = parseContent(value)
      editor.commands.setContent(parsedContent)
    }
  }, [value, editor])

  if (!editor) {
    return null
  }

  return (
    <div className="border border-gray-300 rounded-lg" dir={language === 'fa' ? 'rtl' : 'ltr'}>
      <div className={`flex flex-wrap gap-2 p-2 border-b border-gray-300 ${language === 'fa' ? 'justify-end' : 'justify-start'}`}>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded ${editor.isActive('bold') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
          title={language === 'en' ? 'Bold' : 'پررنگ'}
          type="button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
            <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
          </svg>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded ${editor.isActive('italic') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
          title={language === 'en' ? 'Italic' : 'ایتالیک'}
          type="button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="4" x2="10" y2="4"></line>
            <line x1="14" y1="20" x2="5" y2="20"></line>
            <line x1="15" y1="4" x2="9" y2="20"></line>
          </svg>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 rounded ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
          title={language === 'en' ? 'Heading 1' : 'سربرگ 1'}
          type="button"
        >
          H1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
          title={language === 'en' ? 'Heading 2' : 'سربرگ 2'}
          type="button"
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-2 rounded ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
          title={language === 'en' ? 'Heading 3' : 'سربرگ 3'}
          type="button"
        >
          H3
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded ${editor.isActive('bulletList') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
          title={language === 'en' ? 'Bullet List' : 'لیست نقطه‌ای'}
          type="button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="8" y1="6" x2="21" y2="6"></line>
            <line x1="8" y1="12" x2="21" y2="12"></line>
            <line x1="8" y1="18" x2="21" y2="18"></line>
            <line x1="3" y1="6" x2="3.01" y2="6"></line>
            <line x1="3" y1="12" x2="3.01" y2="12"></line>
            <line x1="3" y1="18" x2="3.01" y2="18"></line>
          </svg>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded ${editor.isActive('orderedList') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
          title={language === 'en' ? 'Numbered List' : 'لیست شماره‌دار'}
          type="button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="10" y1="6" x2="21" y2="6"></line>
            <line x1="10" y1="12" x2="21" y2="12"></line>
            <line x1="10" y1="18" x2="21" y2="18"></line>
            <path d="M4 6h1v4"></path>
            <path d="M4 10h2"></path>
            <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"></path>
          </svg>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded ${editor.isActive('blockquote') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
          title={language === 'en' ? 'Quote' : 'نقل قول'}
          type="button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="p-2 rounded hover:bg-gray-100"
          title={language === 'en' ? 'Horizontal Rule' : 'خط افقی'}
          type="button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          className="p-2 rounded hover:bg-gray-100"
          title={language === 'en' ? 'Undo' : 'بازگشت'}
          type="button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 10h10a5 5 0 0 1 5 5v2"></path>
            <path d="M3 10l6-6"></path>
            <path d="M3 10l6 6"></path>
          </svg>
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          className="p-2 rounded hover:bg-gray-100"
          title={language === 'en' ? 'Redo' : 'انجام مجدد'}
          type="button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10H11a5 5 0 0 0-5 5v2"></path>
            <path d="M21 10l-6-6"></path>
            <path d="M21 10l-6 6"></path>
          </svg>
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  )
}

export default RichTextEditor 