import ModulePage from "@/components/layout/ModulePage";
import { PATIENT_QUEUE } from "@/lib/data/prototypeModules";

export default function Page() {
  return <ModulePage config={PATIENT_QUEUE} />;
}
