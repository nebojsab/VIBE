"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-7rem)] max-w-2xl flex-col justify-center px-4 py-10">
      <Card>
        <CardHeader>
          <CardTitle>TEST 123 – VIBE</CardTitle>
          <CardDescription>
            A clean base layout powered by Next.js, Tailwind CSS, and shadcn/ui.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <label className="text-sm font-medium" htmlFor="email">
            Join the waitlist
          </label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            className="w-full"
          />
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button>Get notified</Button>
        </CardFooter>
      </Card>
    </section>
  );
}
