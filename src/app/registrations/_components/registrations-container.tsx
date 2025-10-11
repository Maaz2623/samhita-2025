"use client";

import React from "react";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2 } from "lucide-react";

type EventInfo = {
  id: number;
  name: string;
  type: string;
  description: string;
};

type Registration = {
  id: string;
  name: string;
  course: string;
  participants: string[];
};

type RegistrationsContainerProps = {
  matchingEvent: EventInfo;
};

export const RegistrationsContainer = ({
  matchingEvent,
}: RegistrationsContainerProps) => {
  const trpc = useTRPC();

  const { data, isLoading, error } = useQuery(
    trpc.registration.getEventRegistrations.queryOptions(
      { eventName: matchingEvent.name },
      { enabled: !!matchingEvent, refetchInterval: 5000 }
    )
  );

  if (!matchingEvent) {
    return <p className="text-center text-muted-foreground">Event not found</p>;
  }

  if (isLoading)
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );

  if (error)
    return (
      <p className="text-center text-red-500 py-4">
        Failed to load registrations
      </p>
    );

  const registrations: Registration[] = data ?? [];

  return (
    <Card className="shadow-md border rounded-2xl">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          {matchingEvent.name} Registrations
        </CardTitle>
        <CardDescription>
          Total Registered: {registrations.length}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {registrations.length === 0 ? (
          <p className="text-muted-foreground text-center py-6">
            No registrations found yet.
          </p>
        ) : (
          <ScrollArea className="h-[400px] rounded-md border p-2">
            <div className="space-y-3">
              {registrations.map((reg) => (
                <div
                  key={reg.id}
                  className="flex items-start justify-between rounded-lg border p-3 hover:bg-muted/30 transition"
                >
                  <div>
                    <h3 className="font-medium text-lg">{reg.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {reg.course}
                    </p>
                    {reg.participants.length > 0 && (
                      <div className="mt-1 flex flex-wrap gap-1">
                        {reg.participants.map((p, i) => (
                          <Badge key={i} variant="secondary">
                            {p}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    #{reg.id.slice(0, 6)}
                  </span>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};
