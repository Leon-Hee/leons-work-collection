import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="prose prose-invert max-w-none prose-headings:text-text-primary prose-p:text-text-secondary prose-a:text-accent prose-strong:text-text-primary prose-code:text-text-secondary prose-pre:bg-bg-secondary prose-pre:border prose-pre:border-border">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
        {content}
      </ReactMarkdown>
    </div>
  )
}
