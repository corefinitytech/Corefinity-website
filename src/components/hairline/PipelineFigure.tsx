import HairlineFigure from "./HairlineFigure";

/** The homepage hero's figure: a reading travelling from a device to the admin panel. */
export default function PipelineFigure({ className }: { className?: string }) {
  return (
    <HairlineFigure
      name="pipeline"
      label="A reading travels from a device through a phone and the cloud to an admin panel."
      className={className}
    />
  );
}
