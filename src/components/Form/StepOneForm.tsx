import type { Dayjs } from "dayjs";
import { useTranslation } from "react-i18next";
import { type Control } from "react-hook-form";
import FormField from "../../common/form/FormField";
import { Form } from "antd";
import type { FormDataValues } from "../../types/formValues";

interface StepOneFormProps {
  control: Control<FormDataValues>;
}

const StepOneForm = ({ control }: StepOneFormProps) => {
  const { t } = useTranslation();
  return (
    <Form layout="vertical" requiredMark={true}>
      <FormField
        name="name"
        control={control}
        label={t("personalInfoForm.name.title")}
        placeholder={t("personalInfoForm.name.namePlaceholder")}
        rules={{
          required: t("personalInfoForm.name.nameRequired"),
          minLength: {
            value: 2,
            message: t("personalInfoForm.name.nameLengthValidation"),
          },
          pattern: {
            value: /^[a-zA-Z\s]+$/,
            message: "t('personalInfoForm.name.namePatterValidation')",
          },
        }}
      />
      <FormField
        name="nationalId"
        control={control}
        label={t("personalInfoForm.nationalId.title")}
        placeholder={t("personalInfoForm.nationalId.nationalIdPlaceholder")}
        rules={{
          required: t("personalInfoForm.nationalId.nationalIdRequired"),
          pattern: {
            value: /^[A-Z0-9-]+$/,
            message: t(
              "personalInfoForm.nationalId.nationalIdPatternValidation",
            ),
          },
        }}
      />
      <FormField
        name="dob"
        control={control}
        label={t("personalInfoForm.dob.title")}
        placeholder={t("personalInfoForm.dob.dobPlaceholder")}
        component="datePicker"
        rules={{
          required: t("personalInfoForm.dob.dobRequired"),
          validate: (value: unknown) => {
            if (!value) return true;

            let date: Date;

            if (
              typeof value === "object" &&
              value !== null &&
              "toDate" in value
            ) {
              date = (value as Dayjs).toDate();
            } else if (typeof value === "string") {
              date = new Date(value);
            } else {
              return true;
            }

            const age = new Date().getFullYear() - date.getFullYear();
            return age >= 18 || t("personalInfoForm.dob.dobPatternValidation");
          },
        }}
      />
      <FormField
        name="gender"
        control={control}
        label={t("personalInfoForm.gender.title")}
        placeholder={t("personalInfoForm.gender.genderPlaceholder")}
        component="select"
        options={[
          { label: t("personalInfoForm.gender.male"), value: "male" },
          { label: t("personalInfoForm.gender.female"), value: "female" },
          { label: t("personalInfoForm.gender.other"), value: "other" },
        ]}
        rules={{
          required: t("personalInfoForm.gender.genderRequired"),
        }}
      />
      <FormField
        name="address"
        control={control}
        label={t("personalInfoForm.address.title")}
        placeholder={t("personalInfoForm.address.addressPlaceholder")}
        rules={{
          required: t("personalInfoForm.address.addressRequired"),
          minLength: {
            value: 10,
            message: t("personalInfoForm.address.addressPatternValidation"),
          },
        }}
      />
      <FormField
        name="city"
        control={control}
        label={t("personalInfoForm.city.title")}
        placeholder={t("personalInfoForm.city.cityPlaceholder")}
        rules={{
          required: t("personalInfoForm.city.cityRequired"),
          pattern: {
            value: /^[a-zA-Z\s]+$/,
            message: t("personalInfoForm.city.cityPatternValidation"),
          },
        }}
      />
      <FormField
        name="state"
        control={control}
        label={t("personalInfoForm.state.title")}
        placeholder={t("personalInfoForm.state.statePlaceholder")}
        rules={{
          required: t("personalInfoForm.state.stateRequired"),
          pattern: {
            value: /^[a-zA-Z\s]+$/,
            message: t("personalInfoForm.state.statePatternValidation"),
          },
        }}
        required={false}
      />
      <FormField
        name="country"
        control={control}
        label={t("personalInfoForm.country.title")}
        placeholder={t("personalInfoForm.country.countryPlaceholder")}
        rules={{
          required: t("personalInfoForm.country.countryRequired"),
          pattern: {
            value: /^[a-zA-Z\s]+$/,
            message: t("personalInfoForm.country.countryPatternValidation"),
          },
        }}
      />
      <FormField
        name="phone"
        control={control}
        label={t("personalInfoForm.phone.title")}
        placeholder={t("personalInfoForm.phone.phonePlaceholder")}
        rules={{
          required: t("personalInfoForm.phone.phoneRequired"),
          pattern: {
            value:
              /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/,
            message: t("personalInfoForm.phone.phonePatternValidation"),
          },
        }}
      />
      <FormField
        name="email"
        control={control}
        label={t("personalInfoForm.email.title")}
        placeholder={t("personalInfoForm.email.emailPlaceholder")}
        rules={{
          required: t("personalInfoForm.email.emailRequired"),
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: t("personalInfoForm.email.emailPatternValidation"),
          },
        }}
      />
    </Form>
  );
};

export default StepOneForm;
