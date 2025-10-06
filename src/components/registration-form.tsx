"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type EventInfo = {
  name: string;
  type: string;
  description: string;
};

type EventsByStar = Record<string, EventInfo[]>;

const eventsData: EventsByStar = {
  "5 Star": [
    {
      name: "Personality Hunt",
      type: "Individual",
      description: "Showcase your confidence, communication, and charisma.",
    },
    {
      name: "Duologue",
      type: "Group (2 in a team)",
      description:
        "Perform an engaging dialogue with your partner. Creativity counts!",
    },
    {
      name: "Solo Singing",
      type: "Individual",
      description:
        "Sing your heart out and impress the judges with your melody.",
    },
  ],
  "4 Star": [
    {
      name: "FIFA",
      type: "Individual",
      description: "Compete in the ultimate virtual football challenge.",
    },
    {
      name: "Murder Mystery",
      type: "Group (2)",
      description:
        "Solve a thrilling mystery with your teammate using logic and teamwork.",
    },
    {
      name: "Entertainment Quiz",
      type: "Group (2)",
      description:
        "Test your entertainment knowledge in movies, music, and pop culture.",
    },
  ],
  "3 Star": [
    {
      name: "On-Spot Photography",
      type: "Individual",
      description: "Capture the perfect moment with your creative lens.",
    },
    {
      name: "Treasure Hunt",
      type: "Group (3)",
      description:
        "Embark on an adventurous hunt for hidden clues and treasures.",
    },
    {
      name: "Reel Making",
      type: "Individual",
      description:
        "Create an engaging short video that showcases your creativity.",
    },
  ],
};

export function SignupForm() {
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

  const handleChange = (key: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const validateForm = (): boolean => {
    const { name, phone, regNo, course } = formData;

    if (!name.trim()) {
      toast.error("Please enter your full name");
      return false;
    }
    if (!phone.trim()) {
      toast.error("Please enter your phone number");
      return false;
    }
    if (!regNo.trim()) {
      toast.error("Please enter your registration number");
      return false;
    }
    if (!course.trim()) {
      toast.error("Please enter your course");
      return false;
    }
    if (registeredEvents.length === 0) {
      toast.error("Please select at least one event");
      return false;
    }

    for (const { event, participants } of registeredEvents) {
      const isGroup = event.type.toLowerCase().includes("group");
      if (isGroup && participants.length === 0) {
        toast.error(`Add participants for "${event.name}"`);
        return false;
      }
      if (isGroup && participants.some((p) => !p.trim())) {
        toast.error(`Please fill all participant names for "${event.name}"`);
        return false;
      }
    }

    return true;
  };

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = { ...formData, events: registeredEvents };
    console.log(payload);

    router.push(`/success`);
  };

  return (
    <main className="min-h-screen w-full bg-gray-50 text-gray-900">
      <section className="max-w-5xl mx-auto px-6 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2">Samhitha Registration</h1>
          <p className="text-gray-600 max-w-lg mx-auto">
            Fill your details and select the events you want to participate in.
          </p>
          <p className="text-sm text-gray-500 mt-3 italic">
            ⚠️ For group events, only one member from each team needs to
            register. Duplicate team registrations will not be accepted.
          </p>
        </header>

        <Card className="p-8 mb-12 shadow-lg rounded-2xl border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-12">
            <div className="grid sm:grid-cols-2 gap-6">
              <Input
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
              <Input
                name="phone"
                type="number"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
              <Input
                name="regNo"
                placeholder="Registration Number"
                value={formData.regNo}
                onChange={(e) => handleChange("regNo", e.target.value)}
              />
              <Input
                name="course"
                placeholder="Course"
                value={formData.course}
                onChange={(e) => handleChange("course", e.target.value)}
              />
            </div>

            <h2 className="text-2xl font-semibold mt-8 mb-6">
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
                    const isGroup = event.type.toLowerCase().includes("group");

                    return (
                      <Card
                        key={event.name}
                        className={cn(
                          "relative border p-5 rounded-2xl transition-all shadow-sm hover:shadow-md",
                          isRegistered && "ring-1 ring-gray-400 bg-gray-50"
                        )}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold text-lg mb-1">
                              {event.name}
                            </h4>
                            <p className="text-sm text-gray-600 mb-1">
                              <strong>Type:</strong> {event.type}
                            </p>
                            <p className="text-xs text-gray-500 italic">
                              {event.description}
                            </p>
                          </div>

                          <Checkbox
                            checked={isRegistered}
                            onCheckedChange={(checked) =>
                              toggleEvent(event, checked as boolean)
                            }
                          />
                        </div>

                        {isGroup && isRegistered && registeredEvent && (
                          <div className="mt-3 space-y-2">
                            <p className="text-sm font-medium text-gray-700">
                              Participants
                            </p>
                            {registeredEvent.participants.map((p, i) => (
                              <div key={i} className="flex items-center gap-2">
                                <Input
                                  type="text"
                                  placeholder={`Participant ${i + 1}`}
                                  value={p}
                                  onChange={(e) =>
                                    handleParticipantChange(
                                      event.name,
                                      i,
                                      e.target.value
                                    )
                                  }
                                />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="text-red-500 hover:text-red-700"
                                  onClick={() =>
                                    removeParticipant(event.name, i)
                                  }
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
                    );
                  })}
                </div>
              </div>
            ))}

            <div className="pt-10">
              <Button
                type="submit"
                className="w-full text-lg py-5 bg-gray-900 text-white hover:bg-gray-800 transition-all"
              >
                Submit Registration
              </Button>
            </div>
          </form>
        </Card>
      </section>
    </main>
  );
}
