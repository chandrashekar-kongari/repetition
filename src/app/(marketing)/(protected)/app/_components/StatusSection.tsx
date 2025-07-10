import { resource, Status } from "@prisma/client";
import { TiptapEditor } from "./TiptapEditor";
import { trpc } from "@/lib/trpc-client";
import { useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Circle, CircleDashedIcon, Disc2, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/_components/ui/dropdown-menu";

// Status configurations
const statusConfigs = {
  [Status.TO_READ]: {
    label: "To Read",
    icon: <CircleDashedIcon className="w-4 h-4 text-muted-foreground" />,
  },
  [Status.RE_READ]: {
    label: "Re-Read",
    icon: <Disc2 className="w-4 h-4 text-muted-foreground" />,
  },
  [Status.COMPLETED]: {
    label: "Completed",
    icon: (
      <Circle className="w-4 h-4 text-muted-foreground fill-muted-foreground" />
    ),
  },
};

// Sortable Item Component
const SortableItem = ({
  id,
  content,
  icon,
  currentStatus,
  onUpdate,
  onStatusChange,
  onDelete,
  onBlur,
  onFocus,
}: {
  id: string;
  content: string;
  icon: React.ReactNode;
  currentStatus: Status;
  onUpdate: (content: string) => void;
  onStatusChange: (status: Status) => void;
  onDelete: () => void;
  onBlur: () => void;
  onFocus: () => void;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : 0,
  };

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex flex-row items-start gap-2 px-4 group"
    >
      <div className="flex items-start justify-center pt-1">
        <DropdownMenu open={isHovered && !isDragging}>
          <DropdownMenuTrigger asChild>
            <button
              className="flex items-center justify-center hover:bg-accent hover:text-accent-foreground rounded-sm p-1 transition-colors cursor-grab active:cursor-grabbing"
              {...attributes}
              {...listeners}
              onClick={(e) => {
                e.stopPropagation();
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {icon}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" side="left">
            {Object.entries(statusConfigs).map(([status, config]) => (
              <DropdownMenuItem
                key={status}
                onClick={() => onStatusChange(status as Status)}
                className={currentStatus === status ? "bg-accent" : ""}
              >
                <div className="flex items-center gap-2">
                  {config.icon}
                  <span>{config.label}</span>
                </div>
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem key={"delete"} onClick={onDelete} className={""}>
              <div className="flex items-center gap-2">
                <Trash2 className="w-4 h-4 text-muted-foreground" />
                <span>Delete</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <TiptapEditor
        content={content}
        onUpdate={onUpdate}
        onBlur={onBlur}
        onFocus={onFocus}
      />
    </div>
  );
};

const NewResourceItem = ({
  item,
  index,
  statusConfig,
  statusConfigs,
  updateResource,
  deleteResource,
  handleUpdate,
  setNewResources,
  setCurrentNewIndex,
}: {
  item: {
    id: string;
    content: string;
    status: Status;
    order: number;
  };
  index: number;
  statusConfig: { status: Status; icon: React.ReactNode };
  statusConfigs: Record<Status, { label: string; icon: React.ReactNode }>;
  updateResource: any;
  deleteResource: any;
  handleUpdate: (id: string, content: string) => void;
  setNewResources: React.Dispatch<React.SetStateAction<any[]>>;
  setCurrentNewIndex: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex flex-row items-start gap-2 px-4 group">
      <div className="flex items-start justify-center pt-1">
        <DropdownMenu open={isHovered}>
          <DropdownMenuTrigger disabled={item.content === ""} asChild>
            <button
              disabled={item.content === ""}
              className="flex items-center justify-center hover:bg-accent hover:text-accent-foreground rounded-sm p-1 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {statusConfigs[item.status]?.icon || statusConfig.icon}
            </button>
          </DropdownMenuTrigger>
          {item.content && (
            <DropdownMenuContent align="start" side="left">
              {Object.entries(statusConfigs).map(([status, config]) => (
                <DropdownMenuItem
                  key={status}
                  onClick={() => {
                    // Update the new resource status
                    setNewResources((prev) => {
                      const newItems = [...prev];
                      newItems[index] = {
                        ...newItems[index],
                        status: status as Status,
                      };
                      return newItems;
                    });
                    // Also update the resource if it has content
                    if (item.content) {
                      updateResource.mutate({
                        id: item.id,
                        content: item.content,
                        status: status as Status,
                        order: item.order,
                      });
                    }
                  }}
                  className={item.status === status ? "bg-accent" : ""}
                >
                  <div className="flex items-center gap-2">
                    {config.icon}
                    <span>{config.label}</span>
                  </div>
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem
                key={"delete"}
                onClick={() => {
                  // Only delete from database if the resource has content (was saved)
                  if (item.content) {
                    deleteResource.mutate({ id: item.id });
                  }
                  setNewResources((prev) => prev.filter((_, i) => i !== index));
                  setCurrentNewIndex((prev) => prev - 1);
                }}
                className={""}
              >
                <div className="flex items-center gap-2">
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          )}
        </DropdownMenu>
      </div>
      <TiptapEditor
        content={item.content}
        onUpdate={(content) => {
          handleUpdate(item.id, content);
        }}
        onBlur={() => {
          setNewResources((prev) => {
            const newItems = [...prev];
            newItems.splice(index, 1);
            return newItems;
          });
          setCurrentNewIndex((prev) => prev - 1);
        }}
        onFocus={() => setCurrentNewIndex(index + 1)}
      />
    </div>
  );
};

const StatusSection = ({
  statusConfig,
  _items,
}: {
  statusConfig: resource & {
    icon: React.ReactNode;
    label: string;
  };
  _items: resource[];
}) => {
  const [items, setItems] = useState<resource[]>(_items);
  const utils = trpc.useUtils();

  const [currentNewIndex, setCurrentNewIndex] = useState<number>(0);
  const [activeId, setActiveId] = useState<string | null>(null);

  const [newResources, setNewResources] = useState(() => {
    return Array.from({ length: 1000 }, (_, index) => ({
      id: uuidv4(),
      content: "",
      status: statusConfig.status,
      order: index,
    }));
  });

  // Sort items by order
  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => (a.order || 0) - (b.order || 0));
  }, [items]);

  const updateResource = trpc.resources.upsert.useMutation({
    onSuccess: () => {
      void utils.resources.list.invalidate();
    },
  });

  const updateOrder = trpc.resources.updateOrder.useMutation({
    onSuccess: () => {
      void utils.resources.list.invalidate();
    },
  });

  const deleteResource = trpc.resources.delete.useMutation({
    onSuccess: () => {
      void utils.resources.list.invalidate();
    },
  });

  const handleUpdate = (id: string, content: string, status?: Status) => {
    const existingItemIndex = sortedItems.findIndex((item) => item.id === id);
    const order =
      existingItemIndex !== -1 ? existingItemIndex : sortedItems.length;

    // Check if this is a new resource
    const newResourceIndex = newResources.findIndex((item) => item.id === id);
    const itemStatus =
      status ||
      (newResourceIndex !== -1
        ? newResources[newResourceIndex].status
        : statusConfig.status);

    updateResource.mutate({
      id,
      content,
      status: itemStatus,
      order,
    });

    setItems((prevItems) => {
      const newItems = [...prevItems];
      if (existingItemIndex !== -1) {
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          content,
        };
      }
      return newItems;
    });
  };

  const handleBlur = () => {};

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    if (activeId !== overId) {
      const oldIndex = sortedItems.findIndex((item) => item.id === activeId);
      const newIndex = sortedItems.findIndex((item) => item.id === overId);

      if (oldIndex !== -1 && newIndex !== -1) {
        // Create the new order array
        const newOrder = arrayMove(sortedItems, oldIndex, newIndex);

        // Update local state optimistically
        setItems((prevItems) => {
          const reorderedItems = arrayMove(prevItems, oldIndex, newIndex);
          return reorderedItems.map((item, index) => ({
            ...item,
            order: index,
          }));
        });

        // Update the order in the database
        const orderUpdates = newOrder.map((item, index) => ({
          id: item.id,
          order: index,
        }));

        updateOrder.mutate({
          updates: orderUpdates,
        });
      }
    }
  };

  const activeItem = sortedItems.find((item) => item.id === activeId);

  useEffect(() => {
    setItems(_items);
  }, [_items]);

  return (
    <div className="flex flex-col gap-2 md:w-xl w-full text-left justify-start p-4">
      <div className="my-1 py-2 px-5 flex items-center text-muted-foreground bg-muted gap-4">
        {statusConfig.icon}
        <h1 className="text-lg font-bold">{statusConfig.label}</h1>
      </div>
      <div className="flex flex-col gap-4 flex-1">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={sortedItems.map((item) => item.id)}
            strategy={verticalListSortingStrategy}
          >
            {sortedItems
              .filter(
                (item) =>
                  !newResources.some((newItem) => newItem.id === item.id)
              )
              .map((item) => (
                <SortableItem
                  key={item.id}
                  id={item.id}
                  content={item.content}
                  icon={statusConfigs[item.status]?.icon || statusConfig.icon}
                  currentStatus={item.status}
                  onUpdate={(content) => handleUpdate(item.id, content)}
                  onStatusChange={(status) => {
                    updateResource.mutate({
                      id: item.id,
                      status,
                      order: item.order,
                      content: item.content,
                    });
                    setItems((prevItems) => {
                      const newItems = [...prevItems];
                      newItems[sortedItems.findIndex((i) => i.id === item.id)] =
                        {
                          ...newItems[
                            sortedItems.findIndex((i) => i.id === item.id)
                          ],
                          status,
                        };
                      return newItems;
                    });
                  }}
                  onDelete={() => {
                    deleteResource.mutate({ id: item.id });
                    setItems((prevItems) =>
                      prevItems.filter((i) => i.id !== item.id)
                    );
                  }}
                  onBlur={() => handleBlur()}
                  onFocus={() => {}}
                />
              ))}
          </SortableContext>

          <DragOverlay>
            {activeItem ? (
              <div className="flex flex-row items-start gap-2 px-4 group bg-background border rounded-lg shadow-lg">
                <div className="flex items-start justify-center pt-1">
                  <div className="flex items-center justify-center rounded-sm p-1 bg-accent">
                    {statusConfigs[activeItem.status]?.icon ||
                      statusConfig.icon}
                  </div>
                </div>
                <TiptapEditor
                  content={activeItem.content}
                  onUpdate={() => {}}
                  onBlur={() => {}}
                  onFocus={() => {}}
                />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>

        {newResources.map((item, index) => {
          if (index <= currentNewIndex) {
            return (
              <NewResourceItem
                key={item.id}
                item={item}
                index={index}
                statusConfig={statusConfig}
                statusConfigs={statusConfigs}
                updateResource={updateResource}
                deleteResource={deleteResource}
                handleUpdate={handleUpdate}
                setNewResources={setNewResources}
                setCurrentNewIndex={setCurrentNewIndex}
              />
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
