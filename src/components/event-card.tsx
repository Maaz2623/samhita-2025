import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

type EventInfo = {
  id: number;
  name: string;
  type: string;
  description: string;
  eventCap: number;
};

interface EventCardProps {
  event: EventInfo;
  isGroup: boolean;
  registeredEvent:
    | {
        event: EventInfo;
        participants: string[];
      }
    | undefined;
  isRegistered: boolean;
  toggleEvent: (event: EventInfo, checked: boolean) => void;
  removeParticipant: (eventName: string, index: number) => void;
  handleParticipantChange: (
    eventName: string,
    index: number,
    value: string
  ) => void;
  addParticipant: (eventName: string) => void;
}

export const EventCard = ({
  removeParticipant,
  handleParticipantChange,
  addParticipant,
  event,
  isGroup,
  registeredEvent,
  isRegistered,
  toggleEvent,
}: EventCardProps) => {
  const trpc = useTRPC();

  const { data, isLoading, error } = useQuery(
    trpc.registration.getEventRegistrations.queryOptions(
      { eventName: event.name },
      { refetchInterval: 5000 }
    )
  );

  if (!data) return;

  const isDisabled = data.length >= event.eventCap;

  return (
    <fieldset disabled={isDisabled}>
      <Card
        key={event.name}
        className={cn(
          "relative border p-5 rounded-2xl transition-all shadow-sm hover:shadow-md",
          isRegistered && "ring-1 ring-gray-400 bg-gray-50",
          isDisabled && "border-red-500 ring-1 ring-red-400 bg-red-50"
        )}
      >
        <div className="flex justify-between items-start mb-3">
          <div>
            <h4 className="font-semibold text-lg mb-1">{event.name}</h4>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Type:</strong> {event.type}
            </p>
            <p className="text-xs text-gray-500 italic">{event.description}</p>
          </div>

          <Checkbox
            checked={isRegistered}
            onCheckedChange={(checked) =>
              toggleEvent(event, checked as boolean)
            }
            disabled={isDisabled} // also disable the checkbox
          />
        </div>

        {isDisabled && (
          <p className="text-red-600 font-medium mb-2">Maxed Out</p>
        )}

        {isGroup && isRegistered && registeredEvent && (
          <div className="mt-3 space-y-2">
            <p className="text-sm font-medium text-gray-700">Participants</p>
            {registeredEvent.participants.map((p, i) => (
              <div key={i} className="flex items-center gap-2">
                <Input
                  type="text"
                  placeholder={`Participant ${i + 1}`}
                  value={p}
                  onChange={(e) =>
                    handleParticipantChange(event.name, i, e.target.value)
                  }
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-700"
                  onClick={() => removeParticipant(event.name, i)}
                >
                  ➖
                </Button>
              </div>
            ))}
            <Button
              type="button"
              size="sm"
              onClick={() => addParticipant(event.name)}
            >
              + Add Participant
            </Button>
          </div>
        )}
      </Card>
    </fieldset>
  );
};
