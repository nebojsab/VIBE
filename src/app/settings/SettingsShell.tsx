// VIBE/src/components/settings/SettingsShell.tsx
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NotificationsSettings } from "./NotificationsSettings";

export function SettingsShell() {
    return (
        <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-8">
            <header className="flex flex-col gap-1">
                <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
                <p className="text-sm text-muted-foreground">
                    Configure your profile, security, and notification preferences for this
                    workspace.
                </p>
            </header>

            <Tabs defaultValue="notifications" className="flex flex-col gap-4">
                <TabsList>
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                    <TabsTrigger value="billing">Billing</TabsTrigger>
                </TabsList>

                <TabsContent value="profile">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base font-semibold">Profile</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                            Profile settings will live here (name, contact details, and preferences).
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="notifications">
                    <NotificationsSettings />
                </TabsContent>

                <TabsContent value="security">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base font-semibold">Security</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                            Security controls such as MFA, session management, and API keys will be
                            configured here.
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="billing">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base font-semibold">Billing</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                            Billing contacts, invoice delivery, and payment methods will be managed
                            here.
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}