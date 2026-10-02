import Image from "next/image";

// The Bestim Connect lockup: the wordmark + the slanted lime CONNECT tag.
// Replace with the official logo file once it's in public/brand/.
export function ConnectLogo({ inverse, big }: { inverse?: boolean; big?: boolean }) {
  return (
    <span className="flex items-center gap-2" dir="ltr">
      <Image
        src={inverse ? "/brand/logo-word-inverse.png" : "/brand/logo-word.png"}
        alt="Bestim Connect"
        width={900}
        height={inverse ? 198 : 194}
        priority={!big}
        className={`w-auto ${big ? "h-8" : "h-6"}`}
      />
      <span
        aria-hidden
        className={`-skew-x-12 rounded-md bg-lime font-bold text-ink italic ${big ? "px-2.5 py-1 text-sm" : "px-2 py-0.5 text-xs"}`}
      >
        <span className="inline-block skew-x-12">CONNECT</span>
      </span>
    </span>
  );
}
