"use client";
import { Circle, CircleDashedIcon, CircleDotIcon, Disc2 } from "lucide-react";
import { useState, useMemo } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";

export interface status {
  toRead: {
    label: string;
    icon: React.ReactNode;
    id: string;
  };
  reRead: {
    label: string;
    icon: React.ReactNode;
    id: string;
  };
  completed: {
    label: string;
    icon: React.ReactNode;
    id: string;
  };
}

const TiptapEditor = ({ content }: { content: string }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: true,
        autolink: true,
        linkOnPaste: true,
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class:
          "w-full min-h-[32px] border-b bg-transparent text-base focus:outline-none focus:ring-0 focus-visible:ring-0 px-1",
      },
    },
  });
  return <EditorContent editor={editor} />;
};

const MainComponent = () => {
  const status = useMemo<status>(
    () => ({
      toRead: {
        label: "To Read",
        icon: <CircleDashedIcon className="w-4 h-4 text-muted-foreground" />,
        id: "toRead",
      },
      reRead: {
        label: "Re-Read",
        icon: <Disc2 className="w-4 h-4 text-muted-foreground" />,
        id: "reRead",
      },
      completed: {
        label: "Completed ",
        icon: (
          <Circle className="w-4 h-4 text-muted-foreground fill-muted-foreground" />
        ),
        id: "completed",
      },
    }),
    []
  );
  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-7xl mx-auto pt-10">
      {Object.entries(status).map(([key, value]) => (
        <div
          key={key}
          className="flex flex-col gap-2 md:w-xl w-full text-left justify-start p-4"
        >
          <div className="py-2 px-4 flex items-center gap-1 text-muted-foreground">
            {value.icon}
            <h1 className="text-lg font-bold">{value.label}</h1>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-row items-start gap-2 px-4 group">
              <div className="flex items-start justify-center pt-1">
                {value.icon}
              </div>
              <TiptapEditor content="link 1 https://console.neon.tech/app/p" />
            </div>

            {key !== "completed" && (
              <div className="flex flex-row items-start gap-2 px-4 group">
                <div className="flex items-start justify-center pt-1">
                  {value.icon}
                </div>
                <TiptapEditor content="link 2 https://console.neon.tech/app/p" />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MainComponent;
