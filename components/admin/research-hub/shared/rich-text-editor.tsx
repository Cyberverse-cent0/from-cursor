"use client";

import { Textarea } from "@/components/ui/textarea";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
  editable?: boolean;
  height?: string;
}

/** Lightweight editor for cPanel (no TipTap dependency) */
export function RichTextEditor({
  content,
  onChange,
  placeholder = "Start typing...",
  className,
  editable = true,
  height = "200px",
}: RichTextEditorProps) {
  return (
    <Textarea
      value={content}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={!editable}
      className={className}
      style={{ minHeight: height }}
    />
  );
}

export function RichTextEditorWithCount(props: RichTextEditorProps) {
  return (
    <div className="space-y-2">
      <RichTextEditor {...props} />
      <p className="text-xs text-muted-foreground">{props.content.length} characters</p>
    </div>
  );
}
