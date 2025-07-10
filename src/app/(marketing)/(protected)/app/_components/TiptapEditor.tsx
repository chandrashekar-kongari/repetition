import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";

export const TiptapEditor = ({
  content,
  onUpdate,
  onBlur,
  onFocus,
}: {
  content: string;
  onUpdate: (content: string) => void;
  onBlur: () => void;
  onFocus: () => void;
}) => {
  const processContent = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(
      urlRegex,
      '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
    );
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: true,
        autolink: true,
        linkOnPaste: true,
        HTMLAttributes: {
          class: "underline cursor-pointer font-medium text-foreground",
        },
        protocols: ["http", "https", "mailto"],
      }),
    ],
    onUpdate: ({ editor }) => {
      onUpdate(editor.getText());
    },
    onBlur: () => {
      onBlur();
    },
    onFocus: () => {
      onFocus();
    },
    content: processContent(content),
    editable: true,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "w-full px-3 min-h-[32px] border-b bg-transparent text-base focus:outline-none focus:ring-0 focus-visible:ring-0 cursor-text",
      },
    },
  });

  return (
    <div className="flex-1">
      <EditorContent editor={editor} />
    </div>
  );
};
