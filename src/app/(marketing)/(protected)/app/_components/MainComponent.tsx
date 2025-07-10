"use client";

import { Circle, CircleDashedIcon, Disc2 } from "lucide-react";
import { useState, useMemo, useEffect } from "react";

import StatusSection from "./StatusSection";
import { trpc } from "@/lib/trpc-client";
import { resource, Status } from "@prisma/client";

const MainComponent = () => {
  const { data: resources, isLoading } = trpc.resources.list.useQuery(
    undefined,
    {
      enabled: typeof window !== "undefined",
      retry: false,
    }
  );

  const statusConfig = useMemo(
    () => ({
      toRead: {
        id: "toRead",
        content: "",
        status: Status.TO_READ,
        order: 0,
        email: "",
        link: null,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
        label: "To Read",
        icon: <CircleDashedIcon className="w-4 h-4 text-muted-foreground" />,
      },
      reRead: {
        id: "reRead",
        content: "",
        status: Status.RE_READ,
        order: 0,
        email: "",
        link: null,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
        label: "Re-Read",
        icon: <Disc2 className="w-4 h-4 text-muted-foreground" />,
      },
      completed: {
        id: "completed",
        content: "",
        status: Status.COMPLETED,
        order: 0,
        email: "",
        link: null,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
        label: "Completed ",
        icon: (
          <Circle className="w-4 h-4 text-muted-foreground fill-muted-foreground" />
        ),
      },
    }),
    []
  );

  const [toRead, setToRead] = useState<resource[] | undefined>(undefined);
  const [reRead, setReRead] = useState<resource[] | undefined>(undefined);
  const [completed, setCompleted] = useState<resource[] | undefined>(undefined);

  useEffect(() => {
    if (resources) {
      setToRead(
        resources.filter((resource) => resource.status === Status.TO_READ)
      );
      setReRead(
        resources.filter((resource) => resource.status === Status.RE_READ)
      );
      setCompleted(
        resources.filter((resource) => resource.status === Status.COMPLETED)
      );
    }
  }, [resources]);

  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-4 w-full max-w-7xl mx-auto pt-10">
        {/* Loading skeleton for three StatusSection components */}
        {[1, 2, 3].map((sectionIndex) => (
          <div
            key={sectionIndex}
            className="flex flex-col gap-2 md:w-xl w-full text-left justify-start p-4"
          >
            {/* Header skeleton */}
            <div className="my-1 py-3 px-5 flex items-center bg-muted gap-4">
              <div className="w-4 h-4 rounded-full bg-muted-foreground/20 animate-pulse"></div>
              <div className="h-5 w-24 bg-muted-foreground/20 rounded animate-pulse"></div>
            </div>

            {/* Items skeleton */}
            <div className="flex flex-col gap-4 flex-1">
              {[1, 2, 3, 4, 5].map((itemIndex) => (
                <div
                  key={itemIndex}
                  className="flex flex-row items-start gap-2 px-4"
                >
                  {/* Icon skeleton */}
                  <div className="flex items-start justify-center pt-1">
                    <div className="w-4 h-4 rounded-full bg-muted-foreground/20 animate-pulse"></div>
                  </div>

                  {/* Content skeleton */}
                  <div className="flex-1 space-y-2">
                    <div className="h-9 bg-muted-foreground/20 rounded animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-7xl mx-auto pt-10">
      <StatusSection statusConfig={statusConfig.toRead} _items={toRead || []} />
      <StatusSection statusConfig={statusConfig.reRead} _items={reRead || []} />
      <StatusSection
        statusConfig={statusConfig.completed}
        _items={completed || []}
      />
    </div>
  );
};

export default MainComponent;
