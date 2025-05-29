import ArchBack from "@/components/general/ArchBack";
import ArchFuzzy from "@/components/general/ArchFuzzy";

export default function NotFound() {
  const hoverIntensity = 0.8;
  const enableHover = true;

  return (
    <div className="arch_notfound">
      <ArchFuzzy
        baseIntensity={0.2}
        hoverIntensity={hoverIntensity}
        enableHover={enableHover}
        fontSize={"15rem"}
      >
        404
      </ArchFuzzy>
      <ArchFuzzy
        baseIntensity={0.2}
        hoverIntensity={0.3}
        enableHover={enableHover}
        fontSize={"6rem"}
      >
        Page not found
      </ArchFuzzy>
      <ArchBack variant="primary" />
    </div>
  );
}
