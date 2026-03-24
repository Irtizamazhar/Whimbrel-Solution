"use client";

import Link from "next/link";
import { MapPin, Navigation } from "lucide-react";

const OFFICE_ADDRESS = "Office No 09, United Plaza, Fazal-E-Haq Road, Blue Area, Islamabad 44000";
const BUSINESS_NAME = "Whimbrel Solution";
const LAT = "33.7089761";
const LON = "73.0561947";
const GMAPS_EMBED = `https://maps.google.com/maps?q=${LAT},${LON}&z=17&output=embed`;
const GMAPS_DIRECTIONS = `https://maps.google.com/?q=${LAT},${LON}`;

export default function ContactMap() {
  return (
    <div className="space-y-5">
      {/* Location card: pin, address, phone, Get Directions */}
      <div className="location-card rounded-2xl border border-navy-4 bg-navy-2/80 p-6 shadow-sm [data-theme='light']:border-[rgba(0,0,0,0.08)] [data-theme='light']:bg-[rgba(0,0,0,0.03)] sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-4">
            <h3 className="font-cormorant text-base font-semibold text-text [data-theme='light']:text-[#111] sm:text-lg">
              {BUSINESS_NAME}
            </h3>

            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-500" aria-hidden>
                <MapPin className="h-5 w-5" strokeWidth={2} />
              </span>
              <div>
                <p className="text-sm font-medium uppercase tracking-wider text-text-muted [data-theme='light']:text-[rgba(0,0,0,0.6)]">
                  Address
                </p>
                <p className="mt-0.5 text-text [data-theme='light']:text-[#111]">
                  {OFFICE_ADDRESS}, Pakistan
                </p>
              </div>
            </div>
          </div>

          <div className="shrink-0 sm:pt-1">
            <Link
              href={GMAPS_DIRECTIONS}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-teal/50 bg-teal/10 px-5 py-3 text-sm font-semibold text-teal transition hover:border-teal hover:bg-teal/20 [data-theme='light']:border-[#0d9488] [data-theme='light']:bg-[#0d9488]/10 [data-theme='light']:text-[#0d9488] [data-theme='light']:hover:bg-[#0d9488]/20"
            >
              <Navigation className="h-4 w-4" />
              Get Directions
            </Link>
          </div>
        </div>
      </div>

      {/* Google Maps iframe — container clips bottom to hide map footer */}
      <div
        className="contact-map-container overflow-hidden rounded-[16px] border border-navy-4 bg-navy-2 shadow-sm [data-theme='light']:border-[rgba(0,0,0,0.08)]"
        style={{ height: 450 }}
        aria-label="Map: Whimbrel Solution office location"
      >
        <iframe
          src={GMAPS_EMBED}
          width="100%"
          height={490}
          style={{ border: 0, borderRadius: 16 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Whimbrel Solution - Office Location"
          className="block w-full"
        />
      </div>
    </div>
  );
}
