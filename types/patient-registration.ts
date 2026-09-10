import type {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import type {
  PatientRegistrationFormOutput,
  PatientRegistrationFormValues,
} from "@/lib/schemas/patientRegistrationSchema";

export type SectionProps = {
  register: UseFormRegister<PatientRegistrationFormValues>;
  errors: FieldErrors<PatientRegistrationFormValues>;
  control: Control<PatientRegistrationFormValues, unknown, PatientRegistrationFormOutput>;
  watch: UseFormWatch<PatientRegistrationFormValues>;
  setValue: UseFormSetValue<PatientRegistrationFormValues>;
};
