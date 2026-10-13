import Fillet, { FILLET_SIZE } from "./Fillet";
import { ChevronRight } from "./icons";

const NOTCH = 56;

/**
 * Bottom-right cutout holding the card's arrow button. The button sits outside
 * the card silhouette; the card's edge curves into the cutout on both sides.
 */
export default function CardNotch() {
  return (
    <>
      <span
        aria-hidden
        className="absolute bottom-0 right-0 grid place-items-center rounded-tl-[20px] bg-white"
        style={{ width: NOTCH, height: NOTCH }}
      >
        <span className="grid size-9 place-items-center rounded-full bg-ink text-white transition duration-300 group-hover:scale-110">
          <ChevronRight className="size-3" />
        </span>
      </span>
      <Fillet origin="0% 0%" style={{ right: NOTCH, bottom: 0 }} />
      <Fillet origin="0% 0%" style={{ right: 0, bottom: NOTCH }} />
    </>
  );
}

/**
 * The action label for a card with a notch. It sits in a band exactly as tall
 * as the notch, flush with the card's bottom edge, so the label and the arrow
 * button always share one centre line. Use it as the last child of a card
 * whose own bottom padding is zero.
 */
export function CardAction({
  label,
  dark = false,
}: {
  label: string;
  dark?: boolean;
}) {
  return (
    <span
      className={`mt-auto flex items-center pr-16 text-[13px] font-medium transition ${
        dark
          ? "text-white/80 group-hover:text-white"
          : "text-ink/70 group-hover:text-ink"
      }`}
      style={{ height: NOTCH }}
    >
      {label}
    </span>
  );
}

export { NOTCH, FILLET_SIZE };
