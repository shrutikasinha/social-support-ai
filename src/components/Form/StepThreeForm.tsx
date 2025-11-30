import { type Control, useFormContext } from "react-hook-form";
import FormField from "../../common/form/FormField";
import { Form, Button } from "antd";
import type { FormDataValues } from "../../types/formValues";
import { useState } from "react";
import { HelpMeWriteModal } from "./HelpMeWriteModal";
import { useTranslation } from "react-i18next";
import {
  PROMPT_CURRENT_FINANCIAL_SITUATION,
  PROMPT_EMPLOYMENT_CIRCUMSTANCES,
  PROMPT_REASON,
} from "../../utils/constants";

interface StepOneFormProps {
  control: Control<FormDataValues>;
}

type CurrentField = {
  name: string;
  context: string;
  value?: string;
  label: string;
};

type FieldNames =
  | "currentFinancialSituation"
  | "employmentCircumstances"
  | "applyingReason";

const StepThreeForm = ({ control }: StepOneFormProps) => {
  const { t } = useTranslation();
  const { setValue, getValues } = useFormContext<FormDataValues>(); // Now this will work
  const [modalVisible, setModalVisible] = useState(false);
  const [currentField, setCurrentField] = useState<CurrentField | null>(null);

  const handleHelpMeWrite = (
    fieldName: string,
    context: string,
    label: string,
  ) => {
    const currentValue = getValues(fieldName as FieldNames);
    setCurrentField({
      name: fieldName,
      context,
      value: currentValue,
      label: label,
    });
    setModalVisible(true);
  };

  const handleApplyContent = (content: string) => {
    if (currentField) {
      setValue(currentField.name as FieldNames, content, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  return (
    <>
      <Form layout="vertical">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium">
              {t("situationDescription.currentFinancialSituation.title")}
            </label>
            <Button
              type="link"
              icon={
                <img
                  src={"/ai-technology.png"}
                  width={20}
                  height={10}
                  alt={"Help me write logo"}
                />
              }
              size="small"
              onClick={() =>
                handleHelpMeWrite(
                  "currentFinancialSituation",
                  PROMPT_CURRENT_FINANCIAL_SITUATION,
                  t("situationDescription.currentFinancialSituation.title"),
                )
              }
            >
              {t("situationDescription.helpMeWriteBtn")}
            </Button>
          </div>
          <FormField
            name="currentFinancialSituation"
            control={control}
            rows={4}
            placeholder={t(
              "situationDescription.currentFinancialSituation.currentFinancialSituationPlaceholder",
            )}
            rules={{
              required: t(
                "situationDescription.currentFinancialSituation.currentFinancialSituationRequired",
              ),
            }}
          />
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium">
              {t("situationDescription.employmentCircumstances.title")}
            </label>
            <Button
              type="link"
              icon={
                <img
                  src={"/ai-technology.png"}
                  width={20}
                  height={10}
                  alt={"Help me write logo"}
                />
              }
              size="small"
              onClick={() =>
                handleHelpMeWrite(
                  "employmentCircumstances",
                  PROMPT_EMPLOYMENT_CIRCUMSTANCES,
                  t("situationDescription.employmentCircumstances.title"),
                )
              }
            >
              {t("situationDescription.helpMeWriteBtn")}
            </Button>
          </div>
          <FormField
            name="employmentCircumstances"
            control={control}
            rows={4}
            placeholder={t(
              "situationDescription.employmentCircumstances.employmentCircumstancesPlaceholder",
            )}
            component="input"
            rules={{
              required: t(
                "situationDescription.employmentCircumstances.employmentCircumstancesRequired",
              ),
            }}
          />
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <label className="font-medium">
              {t("situationDescription.applyingReason.title")}
            </label>
            <Button
              type="link"
              icon={
                <img
                  src={"/ai-technology.png"}
                  width={20}
                  height={10}
                  alt={"Help me write logo"}
                />
              }
              size="small"
              onClick={() =>
                handleHelpMeWrite(
                  "applyingReason",
                  PROMPT_REASON,
                  t("situationDescription.applyingReason.title"),
                )
              }
            >
              {t("situationDescription.helpMeWriteBtn")}
            </Button>
          </div>
          <FormField
            name="applyingReason"
            control={control}
            rows={4}
            placeholder={t(
              "situationDescription.applyingReason.applyingReasonPlaceholder",
            )}
            rules={{
              required: t(
                "situationDescription.applyingReason.applyingReasonRequired",
              ),
            }}
          />
        </div>
      </Form>
      {currentField && (
        <HelpMeWriteModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onApply={handleApplyContent}
          fieldName={currentField.name}
          context={currentField.context}
          currentValue={currentField.value}
          fieldLabel={currentField.label}
          formValues={getValues()}
        />
      )}
    </>
  );
};

export default StepThreeForm;
