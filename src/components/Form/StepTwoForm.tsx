import { useTranslation } from "react-i18next";
import { type Control } from "react-hook-form";
import FormField from "../../common/form/FormField";
import { Form } from "antd";
import type { FormDataValues } from "../../types/formValues";

interface StepOneFormProps {
  control: Control<FormDataValues>;
}

const StepTwoForm = ({ control }: StepOneFormProps) => {
  const { t } = useTranslation();

  return (
    <Form layout="vertical">
      <FormField
        name="maritalStatus"
        control={control}
        label={t("familyAndFinancialInfo.maritalStatus.title")}
        placeholder={t(
          "familyAndFinancialInfo.maritalStatus.maritalStatusPlaceholder",
        )}
        component="select"
        options={[
          {
            label: t("familyAndFinancialInfo.maritalStatus.single"),
            value: "single",
          },
          {
            label: t("familyAndFinancialInfo.maritalStatus.married"),
            value: "married",
          },
          {
            label: t("familyAndFinancialInfo.maritalStatus.divorced"),
            value: "divorced",
          },
          {
            label: t("familyAndFinancialInfo.maritalStatus.widower"),
            value: "widower",
          },
        ]}
        rules={{
          required: t(
            "familyAndFinancialInfo.maritalStatus.maritalStatusRequired",
          ),
        }}
      />
      <FormField
        name="dependents"
        control={control}
        label={t("familyAndFinancialInfo.dependents.title")}
        placeholder={t(
          "familyAndFinancialInfo.dependents.dependentsPlaceholder",
        )}
        rules={{
          required: t("familyAndFinancialInfo.dependents.dependentsRequired"),
        }}
        typeNumber={"number"}
      />
      <FormField
        name="employeeMentStatus"
        control={control}
        label={t("familyAndFinancialInfo.employeeMentStatus.title")}
        placeholder={t(
          "familyAndFinancialInfo.employeeMentStatus.employeeMentStatusPlaceholder",
        )}
        rules={{
          required: t(
            "familyAndFinancialInfo.employeeMentStatus.employeeMentStatusRequired",
          ),
        }}
      />
      <FormField
        name="monthlyIncome"
        control={control}
        label={t("familyAndFinancialInfo.monthlyIncome.title")}
        placeholder={t(
          "familyAndFinancialInfo.monthlyIncome.monthlyIncomePlaceholder",
        )}
        component="input"
        rules={{
          required: t(
            "familyAndFinancialInfo.monthlyIncome.monthlyIncomeRequired",
          ),
        }}
      />
      <FormField
        name="housingStatus"
        control={control}
        label={t("familyAndFinancialInfo.housingStatus.title")}
        placeholder={t(
          "familyAndFinancialInfo.housingStatus.housingStatusPlaceholder",
        )}
        rules={{
          required: t(
            "familyAndFinancialInfo.housingStatus.housingStatusRequired",
          ),
        }}
      />
    </Form>
  );
};

export default StepTwoForm;
