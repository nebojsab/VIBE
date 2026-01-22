"use client";

import { useState } from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/custom-toast";

type Channel = "email" | "inApp";

type DeliveryOption = "instant" | "delayed" | "end_of_day" | "weekly_digest";

type NotificationCategoryKey =
  | "purchases"
  | "services"
  | "maintenance"
  | "provisioning";

type NotificationEvent = {
  id: string;
  label: string;
};

type NotificationCategory = {
  id: NotificationCategoryKey;
  label: string;
  description: string;
  enabled: boolean;
  delivery: DeliveryOption;
  channels: Record<Channel, boolean>;
  events: Record<string, boolean>;
  eventDefinitions: NotificationEvent[];
};

type NotificationState = Record<NotificationCategoryKey, NotificationCategory>;

const DEFAULT_NOTIFICATION_STATE: NotificationState = {
  purchases: {
    id: "purchases",
    label: "Purchases & Orders",
    description:
      "Control alerts for quotes, orders, and billing events related to new purchases.",
    enabled: true,
    delivery: "instant",
    channels: {
      email: true,
      inApp: true,
    },
    eventDefinitions: [
      { id: "quote_accepted", label: "Quote accepted" },
      { id: "order_submitted", label: "Order submitted to vendor" },
      { id: "order_completed", label: "Order completed / provisioned" },
      { id: "invoice_ready", label: "Monthly invoice ready" },
    ],
    events: {
      quote_accepted: true,
      order_submitted: true,
      order_completed: true,
      invoice_ready: true,
    },
  },
  services: {
    id: "services",
    label: "Services & Subscriptions",
    description:
      "Stay informed about renewals, expirations, and subscription lifecycle changes.",
    enabled: true,
    delivery: "instant",
    channels: {
      email: true,
      inApp: true,
    },
    eventDefinitions: [
      { id: "renewal_upcoming", label: "Renewal upcoming" },
      { id: "renewal_completed", label: "Renewal completed" },
      { id: "subscription_suspended", label: "Subscription suspended" },
      { id: "subscription_canceled", label: "Subscription canceled" },
    ],
    events: {
      renewal_upcoming: true,
      renewal_completed: true,
      subscription_suspended: true,
      subscription_canceled: true,
    },
  },
  maintenance: {
    id: "maintenance",
    label: "Scheduled Maintenance & Incidents",
    description:
      "Get notified about scheduled maintenance windows and real-time incident updates.",
    enabled: true,
    delivery: "instant",
    channels: {
      email: true,
      inApp: true,
    },
    eventDefinitions: [
      { id: "maintenance_scheduled", label: "Maintenance window scheduled" },
      { id: "maintenance_started", label: "Maintenance started" },
      { id: "maintenance_completed", label: "Maintenance completed" },
      { id: "incident_opened", label: "Incident opened" },
      { id: "incident_resolved", label: "Incident resolved" },
    ],
    events: {
      maintenance_scheduled: true,
      maintenance_started: true,
      maintenance_completed: true,
      incident_opened: true,
      incident_resolved: true,
    },
  },
  provisioning: {
    id: "provisioning",
    label: "Provisioning & Tenant Events",
    description:
      "Track provisioning pipelines, tenant health checks, and delegated admin changes.",
    enabled: true,
    delivery: "instant",
    channels: {
      email: true,
      inApp: true,
    },
    eventDefinitions: [
      { id: "tenant_created", label: "New tenant created" },
      { id: "tenant_updated", label: "Tenant configuration changed" },
      { id: "provisioning_delayed", label: "Provisioning delayed" },
      { id: "provisioning_failed", label: "Provisioning failed" },
      { id: "delegated_admin_changed", label: "Delegated admin updated" },
    ],
    events: {
      tenant_created: true,
      tenant_updated: true,
      provisioning_delayed: true,
      provisioning_failed: true,
      delegated_admin_changed: true,
    },
  },
};

export function NotificationsSettings() {
  const [state, setState] = useState<NotificationState>(
    () => structuredClone(DEFAULT_NOTIFICATION_STATE) as NotificationState,
  );
  const { showToast } = useToast();

  const handleToggleCategory = (id: NotificationCategoryKey, value: boolean) => {
    setState((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        enabled: value,
      },
    }));
  };

  const handleChangeDelivery = (
    id: NotificationCategoryKey,
    value: DeliveryOption,
  ) => {
    setState((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        delivery: value,
      },
    }));
  };

  const handleToggleChannel = (
    id: NotificationCategoryKey,
    channel: Channel,
    value: boolean,
  ) => {
    setState((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        channels: {
          ...prev[id].channels,
          [channel]: value,
        },
      },
    }));
  };

  const handleToggleEvent = (
    id: NotificationCategoryKey,
    eventId: string,
    value: boolean,
  ) => {
    setState((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        events: {
          ...prev[id].events,
          [eventId]: value,
        },
      },
    }));
  };

  const handleSave = () => {
    showToast({
      title: "Notification preferences saved",
      description: "Your changes have been applied for this workspace.",
      variant: "success",
    });
  };

  const handleReset = () => {
    setState(
      () => structuredClone(DEFAULT_NOTIFICATION_STATE) as NotificationState,
    );
    showToast({
      title: "Defaults restored",
      description:
        "Notification settings have been reset to recommended defaults.",
      variant: "info",
    });
  };

  return (
    <Card className="border-border bg-card">
      <CardHeader className="border-b border-border pb-4">
        <CardTitle className="text-xl font-semibold">Notification settings</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Accordion
          type="multiple"
          className="divide-y divide-border"
          defaultValue={[
            "purchases",
            "services",
            "maintenance",
            "provisioning",
          ]}
        >
          {Object.values(state).map((category) => (
            <AccordionItem key={category.id} value={category.id}>
              <AccordionPrimitive.Header className="flex items-stretch px-6 py-4">
                <div className="flex flex-1 flex-col gap-2 text-left">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-sm font-medium">
                      {category.label}
                    </span>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Switch
                        checked={category.enabled}
                        onCheckedChange={(checked) =>
                          handleToggleCategory(category.id, !!checked)
                        }
                      />
                      <span>{category.enabled ? "Enabled" : "Disabled"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="whitespace-nowrap">Delivery</span>
                      <Select
                        disabled={!category.enabled}
                        value={category.delivery}
                        onValueChange={(value) =>
                          handleChangeDelivery(
                            category.id,
                            value as DeliveryOption,
                          )
                        }
                      >
                        <SelectTrigger className="h-7 w-48 rounded-md border-border bg-background/60 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent align="end" className="text-xs">
                          <SelectItem value="instant">Instant</SelectItem>
                          <SelectItem value="delayed">
                            Delayed · 15 minutes
                          </SelectItem>
                          <SelectItem value="end_of_day">
                            End of day · 17:00
                          </SelectItem>
                          <SelectItem value="weekly_digest">
                            Weekly digest · Friday 17:00
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {category.description}
                  </p>
                </div>
                <div className="flex items-center gap-2 ml-3">
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="cursor-pointer text-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReset();
                      }}
                    >
                      Reset to defaults
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      className="cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSave();
                      }}
                    >
                      Save changes
                    </Button>
                  </div>
                  <AccordionPrimitive.Trigger
                    className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring data-[state=open]:rotate-180"
                  >
                    <ChevronDownIcon className="size-4" />
                  </AccordionPrimitive.Trigger>
                </div>
              </AccordionPrimitive.Header>
              <AccordionContent>
                <div className="space-y-4 px-6">
                  <div className="grid gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-[0.08em]">
                        Events
                      </p>
                      <div className="space-y-2">
                        {category.eventDefinitions.map((event) => (
                          <label
                            key={event.id}
                            className="flex items-start gap-3 text-sm"
                          >
                            <Checkbox
                              checked={category.events[event.id]}

                              disabled={!category.enabled}
                              onCheckedChange={(checked) =>
                                handleToggleEvent(
                                  category.id,
                                  event.id,
                                  !!checked,
                                )
                              }
                            />
                            <span className="text-foreground">
                              {event.label}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-[0.08em]">
                        Channels
                      </p>
                      <div className="space-y-2">
                        <label className="flex items-center gap-3 text-sm">
                          <Checkbox
                            checked={category.channels.email}
                            disabled={!category.enabled}
                            onCheckedChange={(checked) =>
                              handleToggleChannel(
                                category.id,
                                "email",
                                !!checked,
                              )
                            }
                          />
                          <span>Email</span>
                        </label>
                        <label className="flex items-center gap-3 text-sm">
                          <Checkbox
                            checked={category.channels.inApp}
                            disabled={!category.enabled}
                            onCheckedChange={(checked) =>
                              handleToggleChannel(
                                category.id,
                                "inApp",
                                !!checked,
                              )
                            }
                          />
                          <span>In-app</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}

