import ModulePage from "@/components/layout/ModulePage";
import { TRIAGE_VITALS } from "@/lib/data/prototypeModules";

export default function Page() {
  return <ModulePage config={TRIAGE_VITALS} />;
}
