"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { EventCard } from "./event-card";
import { eventsData } from "@/constants";

type EventInfo = {
  id: number;
  name: string;
  type: string;
  description: string;
  eventCap: number;
};

type EventsByStar = Record<string, EventInfo[]>;
// export const eventsData: EventsByStar = {
//   "5 Star": [
//     {
//       id: 0,
//       name: "Personality Hunt",
//       type: "Individual",
//       description: "Showcase your confidence, communication, and charisma.",
//     },
//     {
//       id: 1,
//       name: "Duologue",
//       type: "Group (2 in a team)",
//       description: "Perform an engaging dialogue with your partner.",
//     },
//     {
//       id: 2,
//       name: "Solo Singing",
//       type: "Individual",
//       description:
//         "Sing your heart out and impress the judges with your vocal performance.",
//     },
//     {
//       id: 3,
//       name: "Solo Dance",
//       type: "Individual",
//       description:
//         "Showcase your best moves and rhythm within a limited time frame.",
//     },
//     {
//       id: 4,
//       name: "Ramp Walk",
//       type: "Individual",
//       description:
//         "Walk the ramp with confidence, style, and elegance while following the rules.",
//     },
//   ],
//   "4 Star": [
//     {
//       id: 5,
//       name: "BGMI",
//       type: "Individual",
//       description:
//         "No teams, no backup just you, your skills, and the battleground in this solo BGMI showdown",
//     },
//     {
//       id: 6,
//       name: "Murder Mystery",
//       type: "Group (2 in a team)",
//       description:
//         "Solve a thrilling murder case by analyzing clues and working as a team.",
//     },
//     {
//       id: 7,
//       name: "Entertainment Quiz",
//       type: "Group (2 in a team)",
//       description:
//         "Test your knowledge in entertainment, movies, and pop culture.",
//     },
//     {
//       id: 8,
//       name: "Air Crash",
//       type: "Individual",
//       description:
//         "Step into a fictional air crash scenario and defend your character’s survival story.",
//     },
//     {
//       id: 9,
//       name: "Debate",
//       type: "Individual",
//       description:
//         "Engage in a structured argument on current topics and showcase your debating skills.",
//     },
//     {
//       id: 10,
//       name: "Crisis Management",
//       type: "Group (2 in a team)",
//       description:
//         "Present a professional solution to a crisis scenario through teamwork and strategy.",
//     },
//     {
//       id: 11,
//       name: "Shark Tank",
//       type: "Group (2 in a team)",
//       description:
//         "Pitch your innovative business idea to potential investors in a competitive format.",
//     },
//   ],
//   "3 Star": [
//     {
//       id: 12,
//       name: "On-Spot Photography",
//       type: "Individual",
//       description:
//         "Capture the perfect shot within the given time using your own camera or phone.",
//     },
//     {
//       id: 13,
//       name: "Treasure Hunt",
//       type: "Group (3 in a team)",
//       description:
//         "Solve clues and race against time to uncover hidden treasures around the campus.",
//     },
//     {
//       id: 14,
//       name: "Reel Making",
//       type: "Individual",
//       description:
//         "Create an engaging and original short reel that captures creativity and relevance.",
//     },
//     {
//       id: 15,
//       name: "Doodle Art",
//       type: "Individual",
//       description:
//         "Express your creativity by creating a themed doodle using your own art supplies.",
//     },
//     {
//       id: 16,
//       name: "Poster Making",
//       type: "Individual",
//       description:
//         "Design a digital poster on a given theme using tools like Photoshop or Canva.",
//     },
//   ],
// };

export function SignupForm() {
  const trpc = useTRPC();
  const router = useRouter();

  const createRegistration = useMutation(
    trpc.registration.create.mutationOptions()
  );

  const [registeredEvents, setRegisteredEvents] = useState<
    { event: EventInfo; participants: string[] }[]
  >([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    regNo: "",
    course: "",
  });

  const toggleEvent = (event: EventInfo, checked: boolean) => {
    setRegisteredEvents((prev) =>
      checked
        ? [...prev, { event, participants: [] }]
        : prev.filter((e) => e.event.name !== event.name)
    );
  };

  const removeParticipant = (eventName: string, index: number) => {
    setRegisteredEvents((prev) =>
      prev.map((e) =>
        e.event.name === eventName
          ? {
              ...e,
              participants: e.participants.filter((_, i) => i !== index),
            }
          : e
      )
    );
  };

  const handleParticipantChange = (
    eventName: string,
    index: number,
    value: string
  ) => {
    setRegisteredEvents((prev) =>
      prev.map((e) =>
        e.event.name === eventName
          ? {
              ...e,
              participants: e.participants.map((p, i) =>
                i === index ? value : p
              ),
            }
          : e
      )
    );
  };

  const addParticipant = (eventName: string) => {
    setRegisteredEvents((prev) =>
      prev.map((e) =>
        e.event.name === eventName
          ? { ...e, participants: [...e.participants, ""] }
          : e
      )
    );
  };

  const handleChange = (key: keyof typeof formData, value: string) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.course) {
      toast.error("Please fill all details");
      return;
    }
    if (registeredEvents.length === 0) {
      toast.error("Select at least one event");
      return;
    }

    const payload = { ...formData, events: registeredEvents };
    createRegistration.mutate(payload, {
      onSuccess: () => {
        router.push(`/success`);
      },
      onError: () => {
        toast.error("Something went wrong. Try again.");
      },
    });
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      {/* Background */}
      <Image
        src="/assets/registration-bg.jpg"
        alt="Background"
        fill
        className="object-cover object-center z-0"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Content */}
      <div className="relative z-20 w-full max-w-5xl px-6 py-20">
        <header className="text-center text-white mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-wide drop-shadow-lg">
            Samhitha Registration
          </h1>
          <p className="text-gray-200 mt-2">
            Fill your details and select the events you wish to participate in.
          </p>
          <p className="text-sm text-gray-400 mt-2 italic">
            ⚠️ Only one team member should register on behalf of their team for
            group events. Make sure to enter the team members names.
          </p>
        </header>

        <Card className="bg-white text-gray-900 border border-gray-200 shadow-2xl rounded-3xl p-10">
          <fieldset disabled={createRegistration.isPending}>
            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Inputs */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="font-medium text-gray-700">Full Name</label>
                  <Input
                    placeholder="Enter your full name"
                    className="bg-gray-100 border-gray-300 text-gray-900 placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-gray-800"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-medium text-gray-700">
                    Phone Number
                  </label>
                  <Input
                    type="number"
                    placeholder="Enter your phone number"
                    className="bg-gray-100 border-gray-300 text-gray-900 placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-gray-800"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-medium text-gray-700">Course</label>
                  <Select
                    onValueChange={(value) => handleChange("course", value)}
                    value={formData.course}
                  >
                    <SelectTrigger className="bg-gray-100 border-gray-300 text-gray-900 focus-visible:ring-2 focus-visible:ring-gray-800">
                      <SelectValue placeholder="Select your course" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BBA">BBA</SelectItem>
                      <SelectItem value="BBA Aviation">BBA Aviation</SelectItem>
                      <SelectItem value="BCOM A">BCOM A</SelectItem>
                      <SelectItem value="BCOM B">BCOM B</SelectItem>
                      <SelectItem value="BCA">BCA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Events */}
              <div>
                <h2 className="text-2xl font-semibold mb-4 text-center">
                  Select Your Events
                </h2>
                {Object.entries(eventsData).map(([star, events]) => (
                  <div key={star} className="mt-6">
                    <h3 className="text-xl font-medium mb-4">{star}</h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {events.map((event) => {
                        const isRegistered = registeredEvents.some(
                          (e) => e.event.name === event.name
                        );
                        const registeredEvent = registeredEvents.find(
                          (e) => e.event.name === event.name
                        );
                        const isGroup = event.type
                          .toLowerCase()
                          .includes("group");
                        return (
                          <EventCard
                            key={event.name}
                            addParticipant={addParticipant}
                            handleParticipantChange={handleParticipantChange}
                            removeParticipant={removeParticipant}
                            toggleEvent={toggleEvent}
                            event={event}
                            isGroup={isGroup}
                            isRegistered={isRegistered}
                            registeredEvent={registeredEvent}
                          />
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Submit */}
              <div className="pt-8">
                <Button
                  type="submit"
                  className="w-full py-5 bg-gray-900 text-white text-lg font-semibold rounded-2xl hover:bg-gray-800 transition-all"
                >
                  Submit Registration
                </Button>
              </div>
            </form>
          </fieldset>
        </Card>
      </div>
    </section>
  );
}
