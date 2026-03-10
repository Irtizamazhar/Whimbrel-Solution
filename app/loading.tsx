import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-navy">
      <div className="text-center">
        <Image
          src="/whimbrel-logo.png"
          alt="Whimbrel Solution logo"
          width={84}
          height={84}
          priority
          className="mx-auto"
        />
        <p className="mt-4 font-cormorant text-3xl text-text">Loading...</p>
      </div>
    </div>
  );
}
