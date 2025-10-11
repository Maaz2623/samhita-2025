"use client";

import React, { useState } from "react";
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
import { Loader2, InfoIcon, PhoneIcon, UsersIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

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
  phoneNumber: string;
};

type RegistrationsContainerProps = {
  matchingEvent: EventInfo;
};

export const RegistrationsContainer = ({
  matchingEvent,
}: RegistrationsContainerProps) => {
  const trpc = useTRPC();
  const [selectedReg, setSelectedReg] = useState<Registration | null>(null);

  const { data, isLoading, error } = useQuery(
    trpc.registration.getEventRegistrations.queryOptions(
      { eventName: matchingEvent.name },
      { enabled: !!matchingEvent, refetchInterval: 5000 }
    )
  );

  if (!matchingEvent)
    return (
      <p className="text-center text-muted-foreground mt-10">
        Event not found
      </p>
    );

  if (isLoading)
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );

  if (error)
    return (
      <p className="text-center text-red-500 mt-10">
        Failed to load registrations
      </p>
    );

  const registrations: Registration[] = data ?? [];

  return (
    <div className="flex flex-col items-center w-full px-4 md:px-8 py-8">
      <Card className="w-full max-w-3xl border rounded-2xl shadow-sm">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl font-semibold">
            {matchingEvent.name} Registrations
          </CardTitle>
          <CardDescription className="text-sm mt-1 text-muted-foreground">
            Total Registered: {registrations.length}
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6 space-y-4">
          {registrations.length === 0 ? (
            <p className="text-muted-foreground text-center py-10">
              No registrations found yet.
            </p>
          ) : (
            registrations.map((reg) => (
              <div
                key={reg.id}
                className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 rounded-xl border p-4 hover:bg-muted/40 transition-all duration-150"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{reg.name}</h3>
                  <p className="text-sm text-muted-foreground">{reg.course}</p>

                  {reg.participants.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {reg.participants.map((p, i) => (
                        <Badge
                          key={i}
                          variant="secondary"
                          className="text-xs font-medium"
                        >
                          {p}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <Button
                  onClick={() => setSelectedReg(reg)}
                  variant="outline"
                  size="icon"
                  className="self-start sm:self-center transition hover:scale-105"
                >
                  <InfoIcon className="h-4 w-4" />
                </Button>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <InfoDialog
        registration={selectedReg}
        open={!!selectedReg}
        setOpen={(open) => !open && setSelectedReg(null)}
      />
    </div>
  );
};

const InfoDialog = ({
  registration,
  open,
  setOpen,
}: {
  registration: Registration | null;
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  if (!registration) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md rounded-xl">
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <UsersIcon className="h-5 w-5 text-primary" />
            {registration.name}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {registration.course}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Participants:
            </p>
            {registration.participants.length > 0 ? (
              <div className="mt-2 flex flex-wrap gap-2">
                {registration.participants.map((p, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">
                    {p}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground mt-1">
                No additional participants
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 text-sm">
            <PhoneIcon className="h-4 w-4 text-primary" />
            <span className="font-medium">{registration.phoneNumber}</span>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
