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

type Channel = "email" | "inApp" | "sms";

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

type EventChannelConfig = {
  enabled: boolean;
  channels: Record<Channel, boolean>;
};

type NotificationCategory = {
  id: NotificationCategoryKey;
  label: string;
  description: string;
  enabled: boolean;
  delivery: DeliveryOption;
  events: Record<string, EventChannelConfig>;
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
    eventDefinitions: [
      { id: "quote_accepted", label: "Quote accepted" },
      { id: "order_submitted", label: "Order submitted to vendor" },
      { id: "order_completed", label: "Order completed / provisioned" },
      { id: "invoice_ready", label: "Monthly invoice ready" },
    ],
    events: {
      quote_accepted: {
        enabled: true,
        channels: { email: true, inApp: true, sms: false },
      },
      order_submitted: {
        enabled: true,
        channels: { email: true, inApp: true, sms: false },
      },
      order_completed: {
        enabled: true,
        channels: { email: true, inApp: true, sms: false },
      },
      invoice_ready: {
        enabled: true,
        channels: { email: true, inApp: true, sms: false },
      },
    },
  },
  services: {
    id: "services",
    label: "Services & Subscriptions",
    description:
      "Stay informed about renewals, expirations, and subscription lifecycle changes.",
    enabled: true,
    delivery: "instant",
    eventDefinitions: [
      { id: "renewal_upcoming", label: "Renewal upcoming" },
      { id: "renewal_completed", label: "Renewal completed" },
      { id: "subscription_suspended", label: "Subscription suspended" },
      { id: "subscription_canceled", label: "Subscription canceled" },
    ],
    events: {
      renewal_upcoming: {
        enabled: true,
        channels: { email: true, inApp: true, sms: false },
      },
      renewal_completed: {
        enabled: true,
        channels: { email: true, inApp: true, sms: false },
      },
      subscription_suspended: {
        enabled: true,
        channels: { email: true, inApp: true, sms: true },
      },
      subscription_canceled: {
        enabled: true,
        channels: { email: true, inApp: true, sms: false },
      },
    },
  },
  maintenance: {
    id: "maintenance",
    label: "Scheduled Maintenance & Incidents",
    description:
      "Get notified about scheduled maintenance windows and real-time incident updates.",
    enabled: true,
    delivery: "instant",
    eventDefinitions: [
      { id: "maintenance_scheduled", label: "Maintenance window scheduled" },
      { id: "maintenance_started", label: "Maintenance started" },
      { id: "maintenance_completed", label: "Maintenance completed" },
      { id: "incident_opened", label: "Incident opened" },
      { id: "incident_resolved", label: "Incident resolved" },
    ],
    events: {
      maintenance_scheduled: {
        enabled: true,
        channels: { email: true, inApp: true, sms: false },
      },
      maintenance_started: {
        enabled: true,
        channels: { email: true, inApp: true, sms: true },
      },
      maintenance_completed: {
        enabled: true,
        channels: { email: true, inApp: true, sms: false },
      },
      incident_opened: {
        enabled: true,
        channels: { email: true, inApp: true, sms: true },
      },
      incident_resolved: {
        enabled: true,
        channels: { email: true, inApp: true, sms: false },
      },
    },
  },
  provisioning: {
    id: "provisioning",
    label: "Provisioning & Tenant Events",
    description:
      "Track provisioning pipelines, tenant health checks, and delegated admin changes.",
    enabled: true,
    delivery: "instant",
    eventDefinitions: [
      { id: "tenant_created", label: "New tenant created" },
      { id: "tenant_updated", label: "Tenant configuration changed" },
      { id: "provisioning_delayed", label: "Provisioning delayed" },
      { id: "provisioning_failed", label: "Provisioning failed" },
      { id: "delegated_admin_changed", label: "Delegated admin updated" },
    ],
    events: {
      tenant_created: {
        enabled: true,
        channels: { email: true, inApp: true, sms: false },
      },
      tenant_updated: {
        enabled: true,
        channels: { email: true, inApp: true, sms: false },
      },
      provisioning_delayed: {
        enabled: true,
        channels: { email: true, inApp: true, sms: true },
      },
      provisioning_failed: {
        enabled: true,
        channels: { email: true, inApp: true, sms: true },
      },
      delegated_admin_changed: {
        enabled: true,
        channels: { email: true, inApp: true, sms: false },
      },
    },
  },
};

export function NotificationsSettings() {
  const [state, setState] = useState<NotificationState>(
    () => structuredClone(DEFAULT_NOTIFICATION_STATE) as NotificationState,
  );
  const [savedState, setSavedState] = useState<NotificationState>(
    () => structuredClone(DEFAULT_NOTIFICATION_STATE) as NotificationState,
  );
  const { showToast } = useToast();

  // Check if a category has changes compared to saved state
  const hasChanges = (categoryId: NotificationCategoryKey): boolean => {
    const current = state[categoryId];
    const saved = savedState[categoryId];

    // Compare enabled
    if (current.enabled !== saved.enabled) return true;

    // Compare delivery
    if (current.delivery !== saved.delivery) return true;

    // Compare events and their channels
    for (const eventId of Object.keys(current.events)) {
      const currentEvent = current.events[eventId];
      const savedEvent = saved.events[eventId];

      // Compare event enabled state
      if (currentEvent.enabled !== savedEvent.enabled) return true;

      // Compare channels
      if (
        currentEvent.channels.email !== savedEvent.channels.email ||
        currentEvent.channels.inApp !== savedEvent.channels.inApp ||
        currentEvent.channels.sms !== savedEvent.channels.sms
      ) {
        return true;
      }
    }

    return false;
  };

  // Check if a category is at default state
  const isAtDefaults = (categoryId: NotificationCategoryKey): boolean => {
    const current = state[categoryId];
    const defaults = DEFAULT_NOTIFICATION_STATE[categoryId];

    // Compare enabled
    if (current.enabled !== defaults.enabled) return false;

    // Compare delivery
    if (current.delivery !== defaults.delivery) return false;

    // Compare events and their channels
    for (const eventId of Object.keys(current.events)) {
      const currentEvent = current.events[eventId];
      const defaultEvent = defaults.events[eventId];

      // Compare event enabled state
      if (currentEvent.enabled !== defaultEvent.enabled) return false;

      // Compare channels
      if (
        currentEvent.channels.email !== defaultEvent.channels.email ||
        currentEvent.channels.inApp !== defaultEvent.channels.inApp ||
        currentEvent.channels.sms !== defaultEvent.channels.sms
      ) {
        return false;
      }
    }

    return true;
  };

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
          [eventId]: {
            ...prev[id].events[eventId],
            enabled: value,
          },
        },
      },
    }));
  };

  const handleToggleEventChannel = (
    id: NotificationCategoryKey,
    eventId: string,
    channel: Channel,
    value: boolean,
  ) => {
    setState((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        events: {
          ...prev[id].events,
          [eventId]: {
            ...prev[id].events[eventId],
            channels: {
              ...prev[id].events[eventId].channels,
              [channel]: value,
            },
          },
        },
      },
    }));
  };

  const handleSave = (categoryId: NotificationCategoryKey) => {
    // Save the current state as the new saved state for this category
    setSavedState((prev) => ({
      ...prev,
      [categoryId]: structuredClone(state[categoryId]),
    }));
    showToast({
      title: "Notification preferences saved",
      description: "Your changes have been applied for this workspace.",
      variant: "success",
    });
  };

  const handleReset = (categoryId: NotificationCategoryKey) => {
    // Reset this category to default state
    setState((prev) => ({
      ...prev,
      [categoryId]: structuredClone(DEFAULT_NOTIFICATION_STATE[categoryId]),
    }));
    // Also update saved state to defaults
    setSavedState((prev) => ({
      ...prev,
      [categoryId]: structuredClone(DEFAULT_NOTIFICATION_STATE[categoryId]),
    }));
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
                      disabled={isAtDefaults(category.id)}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReset(category.id);
                      }}
                    >
                      Reset to defaults
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      className="cursor-pointer"
                      disabled={!hasChanges(category.id)}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSave(category.id);
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
                  <div className="space-y-4">
                    {category.eventDefinitions.map((event) => {
                      const eventConfig = category.events[event.id];
                      return (
                        <div
                          key={event.id}
                          className="border-b border-border pb-4 last:border-b-0 last:pb-0"
                        >
                          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                            <label className="flex items-start gap-3 text-sm">
                              <Checkbox
                                checked={eventConfig.enabled}
                                disabled={!category.enabled}
                                onCheckedChange={(checked) =>
                                  handleToggleEvent(
                                    category.id,
                                    event.id,
                                    !!checked,
                                  )
                                }
                              />
                              <span className="text-foreground font-medium">
                                {event.label}
                              </span>
                            </label>

                            {eventConfig.enabled && (
                              <div className="md:ml-6">
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                                  <span className="text-xs text-muted-foreground">
                                    Channels:
                                  </span>
                                  <label className="flex items-center gap-2 whitespace-nowrap">
                                    <Checkbox
                                      checked={eventConfig.channels.email}
                                      disabled={!category.enabled}
                                      onCheckedChange={(checked) =>
                                        handleToggleEventChannel(
                                          category.id,
                                          event.id,
                                          "email",
                                          !!checked,
                                        )
                                      }
                                    />
                                    <span>Email</span>
                                  </label>
                                  <label className="flex items-center gap-2 whitespace-nowrap">
                                    <Checkbox
                                      checked={eventConfig.channels.inApp}
                                      disabled={!category.enabled}
                                      onCheckedChange={(checked) =>
                                        handleToggleEventChannel(
                                          category.id,
                                          event.id,
                                          "inApp",
                                          !!checked,
                                        )
                                      }
                                    />
                                    <span>In-app</span>
                                  </label>
                                  <label className="flex items-center gap-2 whitespace-nowrap">
                                    <Checkbox
                                      checked={eventConfig.channels.sms}
                                      disabled={!category.enabled}
                                      onCheckedChange={(checked) =>
                                        handleToggleEventChannel(
                                          category.id,
                                          event.id,
                                          "sms",
                                          !!checked,
                                        )
                                      }
                                    />
                                    <span>Text (SMS)</span>
                                  </label>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
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

