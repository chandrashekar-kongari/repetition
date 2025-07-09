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
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-7xl mx-auto pt-10">
      <StatusSection
        statusConfig={statusConfig.toRead}
        items={toRead || []}
        showAddNew={true}
      />
      <StatusSection
        statusConfig={statusConfig.reRead}
        items={reRead || []}
        showAddNew={true}
      />
      <StatusSection
        statusConfig={statusConfig.completed}
        items={completed || []}
        showAddNew={false}
      />
    </div>
  );
};

export default MainComponent;
