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
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Companies</h1>
      </div>
      <div className="max-w-2xl">
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900">Welcome to VIBE</CardTitle>
            <CardDescription className="text-gray-600">
              A clean base layout powered by Next.js, Tailwind CSS, and shadcn/ui.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <label className="text-sm font-medium text-gray-700" htmlFor="email">
              Join the waitlist
            </label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="w-full bg-white border-gray-200"
            />
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Get notified
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
