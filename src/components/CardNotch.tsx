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

export { NOTCH, FILLET_SIZE };
