"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Send } from "lucide-react";

import { WhatsAppIcon } from "@/components/site/icons";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { eventTypes } from "@/data/categories";
import { packageTiers } from "@/data/packages";
import { enquirySchema, type EnquiryValues } from "@/lib/schemas";
import { whatsappHref } from "@/lib/site-config";
import { cn } from "@/lib/utils";

/**
 * Composes the enquiry into a WhatsApp message. With no backend, this is how
 * a submitted enquiry actually reaches the business.
 */
function composeMessage(values: EnquiryValues): string {
  const event = eventTypes.find((e) => e.slug === values.eventType);
  const lines = [
    `Namaste! I would like a catering quote.`,
    ``,
    `Name: ${values.name}`,
    `Phone: ${values.phone}`,
    values.email ? `Email: ${values.email}` : null,
    `Event: ${event?.name ?? values.eventType}`,
    `Date: ${values.eventDate}`,
    `Guests: ${values.guestCount}`,
    `City / area: ${values.city}`,
    values.message ? `` : null,
    values.message ? `Notes: ${values.message}` : null,
  ].filter((line): line is string => line !== null);

  return lines.join("\n");
}

export function EnquiryForm() {
  const searchParams = useSearchParams();
  const [submitted, setSubmitted] = React.useState<EnquiryValues | null>(null);

  const presetPackage = packageTiers.find(
    (tier) => tier.id === searchParams.get("package"),
  );
  const presetEvent = eventTypes.find(
    (event) => event.slug === searchParams.get("event"),
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryValues>({
    resolver: zodResolver(enquirySchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      eventType: presetEvent?.slug ?? undefined,
      eventDate: "",
      city: "Pune",
      message: presetPackage
        ? `I am interested in the ${presetPackage.name} package.`
        : "",
    },
  });

  async function onSubmit(values: EnquiryValues) {
    /*
     * INTEGRATION POINT
     * There is no backend in this build, so the enquiry is validated and
     * confirmed client-side, then handed to WhatsApp. To deliver enquiries
     * some other way (Formspree, Web3Forms, a Route Handler, a CRM), POST
     * `values` here and keep the rest of the flow as it is.
     */
    await new Promise((resolve) => setTimeout(resolve, 600));
    setSubmitted(values);
  }

  const today = new Date().toISOString().split("T")[0];

  if (submitted) {
    return (
      <div
        className="glass rounded-[var(--radius-card)] p-8 text-center"
        role="status"
      >
        <CheckCircle2
          className="mx-auto size-12 text-success"
          aria-hidden="true"
        />
        <h2 className="mt-5 font-display text-2xl font-semibold">
          Thank you, {submitted.name.split(" ")[0]}
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
          Your enquiry is ready to send. Tap below to deliver it to us on
          WhatsApp — it is already filled in — and we will come back with a
          per-plate quote, usually the same day.
        </p>

        <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button asChild size="lg">
            <a
              href={whatsappHref(composeMessage(submitted))}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon className="size-5" />
              Send on WhatsApp
            </a>
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => setSubmitted(null)}
          >
            Edit the enquiry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="glass rounded-[var(--radius-card)] p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Your name"
          error={errors.name?.message}
          id="name"
          className="sm:col-span-2"
        >
          {(props) => (
            <Input
              {...props}
              {...register("name")}
              autoComplete="name"
              placeholder="Sneha Deshpande"
            />
          )}
        </Field>

        <Field label="Phone" error={errors.phone?.message} id="phone">
          {(props) => (
            <Input
              {...props}
              {...register("phone")}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="98220 12345"
            />
          )}
        </Field>

        <Field
          label="Email"
          hint="Optional"
          error={errors.email?.message}
          id="email"
        >
          {(props) => (
            <Input
              {...props}
              {...register("email")}
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
            />
          )}
        </Field>

        <Field
          label="Type of event"
          error={errors.eventType?.message}
          id="eventType"
        >
          {(props) => (
            <Controller
              control={control}
              name="eventType"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    id={props.id}
                    aria-invalid={props["aria-invalid"]}
                    aria-describedby={props["aria-describedby"]}
                    onBlur={field.onBlur}
                  >
                    <SelectValue placeholder="Choose an occasion" />
                  </SelectTrigger>
                  <SelectContent>
                    {eventTypes.map((event) => (
                      <SelectItem key={event.slug} value={event.slug}>
                        {event.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          )}
        </Field>

        <Field
          label="Event date"
          error={errors.eventDate?.message}
          id="eventDate"
        >
          {(props) => (
            <Input {...props} {...register("eventDate")} type="date" min={today} />
          )}
        </Field>

        <Field
          label="Number of guests"
          error={errors.guestCount?.message}
          id="guestCount"
        >
          {(props) => (
            <Input
              {...props}
              {...register("guestCount")}
              type="number"
              inputMode="numeric"
              min={10}
              max={5000}
              placeholder="250"
            />
          )}
        </Field>

        <Field label="City or area" error={errors.city?.message} id="city">
          {(props) => (
            <Input
              {...props}
              {...register("city")}
              autoComplete="address-level2"
              placeholder="Kothrud, Pune"
            />
          )}
        </Field>

        <Field
          label="Anything else we should know?"
          hint="Optional"
          error={errors.message?.message}
          id="message"
          className="sm:col-span-2"
        >
          {(props) => (
            <Textarea
              {...props}
              {...register("message")}
              rows={4}
              placeholder="Jain menu for 40 of the guests, venue has no lift, sangeet the evening before..."
            />
          )}
        </Field>
      </div>

      <Button
        type="submit"
        size="lg"
        className="mt-7 w-full sm:w-auto"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" aria-hidden="true" />
            Checking your details
          </>
        ) : (
          <>
            <Send aria-hidden="true" />
            Request a quote
          </>
        )}
      </Button>

      <p className="mt-4 text-xs leading-relaxed text-subtle">
        We use your details only to prepare your quote. No mailing lists, no
        sharing with anyone else.
      </p>
    </form>
  );
}

/* -- field wrapper ------------------------------------------------------- */

interface FieldRenderProps {
  id: string;
  "aria-invalid": boolean;
  "aria-describedby": string | undefined;
}

function Field({
  label,
  hint,
  error,
  id,
  className,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  id: string;
  className?: string;
  children: (props: FieldRenderProps) => React.ReactNode;
}) {
  const errorId = `${id}-error`;

  return (
    <div className={cn("min-w-0", className)}>
      <div className="mb-2 flex items-baseline justify-between gap-2">
        <Label htmlFor={id}>{label}</Label>
        {hint && <span className="text-xs text-subtle">{hint}</span>}
      </div>

      {children({
        id,
        "aria-invalid": Boolean(error),
        "aria-describedby": error ? errorId : undefined,
      })}

      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
