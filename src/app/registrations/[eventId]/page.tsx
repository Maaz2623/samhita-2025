import React from "react";
import { RegistrationsContainer } from "../_components/registrations-container";

interface Props {
  params: Promise<{
    eventId: number;
  }>;
}

type EventInfo = {
  id: number;
  name: string;
  type: string;
  description: string;
};

type EventsByStar = Record<string, EventInfo[]>;

export const eventsData: EventsByStar = {
  "5 Star": [
    {
      id: 0,
      name: "Personality Hunt",
      type: "Individual",
      description: "Showcase your confidence, communication, and charisma.",
    },
    {
      id: 1,
      name: "Duologue",
      type: "Group (2 in a team)",
      description: "Perform an engaging dialogue with your partner.",
    },
    {
      id: 2,
      name: "Solo Singing",
      type: "Individual",
      description:
        "Sing your heart out and impress the judges with your vocal performance.",
    },
    {
      id: 3,
      name: "Solo Dance",
      type: "Individual",
      description:
        "Showcase your best moves and rhythm within a limited time frame.",
    },
    {
      id: 4,
      name: "Ramp Walk",
      type: "Individual",
      description:
        "Walk the ramp with confidence, style, and elegance while following the rules.",
    },
  ],
  "4 Star": [
    {
      id: 5,
      name: "BGMI",
      type: "Individual",
      description:
        "No teams, no backup just you, your skills, and the battleground in this solo BGMI showdown",
    },
    {
      id: 6,
      name: "Murder Mystery",
      type: "Group (2 in a team)",
      description:
        "Solve a thrilling murder case by analyzing clues and working as a team.",
    },
    {
      id: 7,
      name: "Entertainment Quiz",
      type: "Group (2 in a team)",
      description:
        "Test your knowledge in entertainment, movies, and pop culture.",
    },
    {
      id: 8,
      name: "Air Crash",
      type: "Individual",
      description:
        "Step into a fictional air crash scenario and defend your character’s survival story.",
    },
    {
      id: 9,
      name: "Debate",
      type: "Individual",
      description:
        "Engage in a structured argument on current topics and showcase your debating skills.",
    },
    {
      id: 10,
      name: "Crisis Management",
      type: "Group (2 in a team)",
      description:
        "Present a professional solution to a crisis scenario through teamwork and strategy.",
    },
    {
      id: 11,
      name: "Shark Tank",
      type: "Group (2 in a team)",
      description:
        "Pitch your innovative business idea to potential investors in a competitive format.",
    },
  ],
  "3 Star": [
    {
      id: 12,
      name: "On-Spot Photography",
      type: "Individual",
      description:
        "Capture the perfect shot within the given time using your own camera or phone.",
    },
    {
      id: 13,
      name: "Treasure Hunt",
      type: "Group (3 in a team)",
      description:
        "Solve clues and race against time to uncover hidden treasures around the campus.",
    },
    {
      id: 14,
      name: "Reel Making",
      type: "Individual",
      description:
        "Create an engaging and original short reel that captures creativity and relevance.",
    },
    {
      id: 15,
      name: "Doodle Art",
      type: "Individual",
      description:
        "Express your creativity by creating a themed doodle using your own art supplies.",
    },
    {
      id: 16,
      name: "Poster Making",
      type: "Individual",
      description:
        "Design a digital poster on a given theme using tools like Photoshop or Canva.",
    },
  ],
};

const EventIdPage = async ({ params }: Props) => {
  const { eventId } = await params;

  const numericId =
    typeof eventId === "string" ? parseInt(eventId, 10) : eventId;

  const matchingEvent = Object.values(eventsData)
    .flat()
    .find((event) => event.id === numericId);

  if (!matchingEvent) return <div>Error: Event Not Found</div>;

  return <RegistrationsContainer matchingEvent={matchingEvent} />;
};

export default EventIdPage;
