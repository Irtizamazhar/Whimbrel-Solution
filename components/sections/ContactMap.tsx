"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ExternalLink, Navigation } from "lucide-react";

// United Plaza, Fazl-e-Haq Road, Blue Area, Islamabad
const OFFICE_COORDS: [number, number] = [33.7256, 73.0883];
const OFFICE_ADDRESS = "Office No.09 3rd Floor United Plaza Fazl-e-Haq Road Blue Area Islamabad";
const GMAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(OFFICE_ADDRESS)}`;
const GMAPS_DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(OFFICE_ADDRESS)}`;

export default function ContactMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<{ map: import("leaflet").Map; marker: import("leaflet").Marker } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let mounted = true;

    const init = async () => {
      const L = await import("leaflet");

      if (!containerRef.current || !mounted) return;

      const map = L.map(containerRef.current, {
        attributionControl: false,
        scrollWheelZoom: false,
      }).setView(OFFICE_COORDS, 15);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
      }).addTo(map);

      // Enable scroll zoom only after user clicks on the map
      map.once("click", () => {
        map.scrollWheelZoom.enable();
      });

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

      const officeMarker = L.marker(OFFICE_COORDS, { icon: officeIcon }).addTo(map);
      officeMarker.bindPopup(
        "<strong>Whimbrel Solution</strong><br/>" + OFFICE_ADDRESS.replace(/,/g, ",<br/>"),
        { className: "whimbrel-popup" }
      );

      if (!mounted) {
        map.remove();
        return;
      }
      mapRef.current = { map, marker: officeMarker };

      if (typeof window !== "undefined" && window.location.hash === "#location-map") {
        map.panTo(OFFICE_COORDS);
        officeMarker.openPopup();
      }

      // Fix map size once container is in DOM (handles map below the fold)
      requestAnimationFrame(() => {
        if (mapRef.current?.map) {
          mapRef.current.map.invalidateSize();
          mapRef.current.map.panTo(OFFICE_COORDS);
        }
      });
    };

    init();

    return () => {
      mounted = false;
      if (mapRef.current?.map) {
        mapRef.current.map.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // When map section scrolls into view or window resizes: fix size and keep centered on Islamabad
  useEffect(() => {
    const sectionEl = typeof document !== "undefined" ? document.getElementById("location-map") : null;
    if (!containerRef.current || !sectionEl) return;

    const syncMap = () => {
      if (!mapRef.current?.map) return;
      mapRef.current.map.invalidateSize();
      mapRef.current.map.panTo(OFFICE_COORDS);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setTimeout(syncMap, 100);
        }
      },
      { root: null, rootMargin: "50px", threshold: 0.1 }
    );
    observer.observe(sectionEl);

    const onResize = () => syncMap();
    window.addEventListener("resize", onResize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Hash change ya "Whimbrel Solution" click par map pin par focus + popup
  useEffect(() => {
    const focusMap = () => {
      if (!mapRef.current) return;
      mapRef.current.map.invalidateSize();
      mapRef.current.map.panTo(OFFICE_COORDS);
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
      {/* Click "Whimbrel Solution" → scroll to map + open pin popup */}
      <div className="rounded-lg border border-navy-4 bg-navy-2/80 p-4 shadow-sm">
        <button
          type="button"
          onClick={() => {
            document.getElementById("location-map")?.scrollIntoView({ behavior: "smooth" });
            setTimeout(() => {
              if (mapRef.current) {
                mapRef.current.map.panTo(OFFICE_COORDS);
                mapRef.current.marker.openPopup();
              }
            }, 400);
          }}
          className="text-left font-cormorant text-lg font-semibold text-text transition hover:text-teal focus:outline-none focus:ring-2 focus:ring-teal/50 rounded"
        >
          Whimbrel Solution
        </button>
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
        className="contact-map-container h-[400px] w-full overflow-hidden rounded-lg border border-navy-4 bg-navy-2 shadow-sm"
        aria-label="Map: Whimbrel Solution office location"
      />
    </div>
  );
}
