"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import React from "react";

type EventInfo = {
  id: number;
  name: string;
  type: string;
  description: string;
};

type RegistrationsContainerProps = {
  matchingEvent: EventInfo;
};

export const RegistrationsContainer = ({
  matchingEvent,
}: RegistrationsContainerProps) => {
  const trpc = useTRPC();

  const { data } = useQuery(
    trpc.registration.getEventRegistrations.queryOptions(
      {
        eventName: matchingEvent.name,
      },
      {
        enabled: !!matchingEvent,
      }
    )
  );

  console.log(data);

  return (
    <div>
      {matchingEvent ? (
        <h2>{JSON.stringify(data, null, 2)}</h2>
      ) : (
        <p>Event not found</p>
      )}
    </div>
  );
};
