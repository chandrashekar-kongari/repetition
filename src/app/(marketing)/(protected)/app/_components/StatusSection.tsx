import { resource } from "@prisma/client";
import { TiptapEditor } from "./TiptapEditor";
import { trpc } from "@/lib/trpc-client";
import { useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const StatusSection = ({
  statusConfig,
  items,
  showAddNew = true,
}: {
  statusConfig: resource & {
    icon: React.ReactNode;
    label: string;
  };
  items: resource[];
  showAddNew?: boolean;
}) => {
  const utils = trpc.useUtils();

  const [currentNewIndex, setCurrentNewIndex] = useState<number>(0);

  const [newResources, setNewResources] = useState(() => {
    return Array.from({ length: 1000 }, (_, index) => ({
      id: uuidv4(),
      content: "",
      status: statusConfig.status,
      order: index,
    }));
  });
  const updateResource = trpc.resources.upsert.useMutation({
    onSuccess: () => {
      void utils.resources.list.invalidate();
    },
  });

  const handleUpdate = (id: string, content: string) => {
    const existingItemIndex = items.findIndex((item) => item.id === id);
    const order = existingItemIndex !== -1 ? existingItemIndex : items.length;

    updateResource.mutate({
      id,
      content,
      status: statusConfig.status,
      order,
    });
  };

  const handleBlur = () => {};

  return (
    <div className="flex flex-col gap-2 md:w-xl w-full text-left justify-start p-4">
      <div className="my-1 py-1 px-4 flex items-center gap-1 text-muted-foreground bg-muted">
        {statusConfig.icon}
        <h1 className="text-lg font-bold">{statusConfig.label}</h1>
      </div>
      <div className="flex flex-col gap-4">
        {items
          .filter(
            (item) => !newResources.some((newItem) => newItem.id === item.id)
          )
          .map((item) => (
            <div
              key={item.id}
              className="flex flex-row items-start gap-2 px-4 group"
            >
              <div className="flex items-start justify-center pt-1">
                {statusConfig.icon}
              </div>
              <TiptapEditor
                content={item.content}
                onUpdate={(content) => handleUpdate(item.id, content)}
                onBlur={() => handleBlur()}
                onFocus={() => {}}
              />
            </div>
          ))}

        {newResources.map((item, index) => {
          if (index <= currentNewIndex) {
            return (
              <div
                key={item.id}
                className="flex flex-row items-start gap-2 px-4 group"
              >
                <div className="flex items-start justify-center pt-1">
                  {statusConfig.icon}
                </div>
                <TiptapEditor
                  content={item.content}
                  onUpdate={(content) => {
                    handleUpdate(item.id, content);
                  }}
                  onBlur={() => handleBlur()}
                  onFocus={() => setCurrentNewIndex(index + 1)}
                />
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
};

export default StatusSection;
