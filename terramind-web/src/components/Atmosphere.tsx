type AtmosphereVariant = "meadow" | "mist" | "harvest" | "dusk";

interface AtmosphereProps {
  variant: AtmosphereVariant;
  grain?: boolean;
}

export default function Atmosphere({ variant, grain = false }: AtmosphereProps) {
  return (
    <div
      className={`atmosphere atmosphere-${variant}`}
      aria-hidden="true"
    >
      {grain && <div className="grain-overlay" />}
    </div>
  );
}
