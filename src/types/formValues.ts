import type { Dayjs } from "dayjs";

export type FormDataValues = {
  name: string;
  nationalId: string;
  dob: string | Dayjs;
  gender: string;
  address: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  email: string;
  maritalStatus: string;
  dependents: string;
  employeeMentStatus: string;
  monthlyIncome: string;
  housingStatus: string;
  currentFinancialSituation: string;
  employmentCircumstances: string;
  applyingReason: string;
};
