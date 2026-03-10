"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ExternalLink, Navigation } from "lucide-react";

const ISLAMABAD: [number, number] = [33.6844, 73.0479];
const OFFICE_ADDRESS = "Whimbrel Solution, Islamabad, Pakistan";
const GMAPS_URL = `https://www.google.com/maps?q=${ISLAMABAD[0]},${ISLAMABAD[1]}`;
const GMAPS_DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${ISLAMABAD[0]},${ISLAMABAD[1]}`;

export default function ContactMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<{ map: import("leaflet").Map; marker: import("leaflet").Marker } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const init = async () => {
      const L = await import("leaflet");

      const map = L.map(containerRef.current!).setView(ISLAMABAD, 14);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      const officeIcon = L.divIcon({
        className: "whimbrel-map-marker",
        html: `<span style="
          position: relative;
          width: 32px;
          height: 42px;
          display: block;
        ">
          <span style="
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: 0;
            width: 0;
            height: 0;
            border-left: 16px solid transparent;
            border-right: 16px solid transparent;
            border-top: 20px solid #c62828;
          "></span>
          <span style="
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: 18px;
            width: 22px;
            height: 22px;
            background: #c62828;
            border: 3px solid #fff;
            border-radius: 50%;
            box-shadow: 0 2px 6px rgba(0,0,0,0.25);
          "></span>
        </span>`,
        iconSize: [32, 42],
        iconAnchor: [16, 42],
      });

      const officeMarker = L.marker(ISLAMABAD, { icon: officeIcon }).addTo(map);
      officeMarker.bindPopup(
        "<strong>Whimbrel Solution</strong><br/>Office — Islamabad, Pakistan",
        { className: "whimbrel-popup" }
      );

      mapRef.current = { map, marker: officeMarker };

      // Jab #location-map par aaye (e.g. Whimbrel Solution click) to map pin par focus + popup
      if (typeof window !== "undefined" && window.location.hash === "#location-map") {
        map.panTo(ISLAMABAD);
        officeMarker.openPopup();
      }
    };

    init();
  }, []);

  // Hash change ya "Whimbrel Solution" click par map pin par focus + popup
  useEffect(() => {
    const focusMap = () => {
      if (!mapRef.current) return;
      mapRef.current.map.panTo(ISLAMABAD);
      mapRef.current.marker.openPopup();
    };

    const onHashChange = () => {
      if (window.location.hash === "#location-map") focusMap();
    };

    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("focusMap", focusMap);
    return () => {
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("focusMap", focusMap);
    };
  }, []);

  return (
    <div className="space-y-3">
      {/* Info card — address + Open in map + Directions (turn-by-turn) */}
      <div className="rounded-lg border border-navy-4 bg-navy-2/80 p-4 shadow-sm">
        <p className="font-cormorant text-lg font-semibold text-text">Whimbrel Solution</p>
        <p className="mt-1 text-sm text-text-muted">{OFFICE_ADDRESS}</p>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <Link
            href={GMAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-navy-4 bg-navy text-text transition hover:bg-navy-4 hover:text-teal"
            title="Open in Google Maps"
            aria-label="Open in Google Maps"
          >
            <ExternalLink size={18} />
          </Link>
          <Link
            href={GMAPS_DIRECTIONS}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-teal/60 bg-teal/10 text-teal transition hover:bg-teal/20"
            title="Directions / Turn-by-turn"
            aria-label="Directions / Turn-by-turn"
          >
            <Navigation size={18} />
          </Link>
        </div>
      </div>

      <div
        ref={containerRef}
        className="h-[400px] w-full overflow-hidden rounded-lg border border-navy-4 bg-navy-2 shadow-sm"
        aria-label="Map: Whimbrel Solution office location"
      />
    </div>
  );
}
