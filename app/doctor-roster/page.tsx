import ModulePage from "@/components/layout/ModulePage";
import { DOCTOR_ROSTER } from "@/lib/data/prototypeModules";

export default function Page() {
  return <ModulePage config={DOCTOR_ROSTER} />;
}
