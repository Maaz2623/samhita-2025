import { SignupForm } from "@/components/registration-form";
import Image from "next/image";

export default function Page() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <div className="w-full">
        <SignupForm />
      </div>
    </div>
  );
}
