import { Button, Flex, Steps, message } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";

import StepOneForm from "../Form/StepOneForm";
import { useEffect } from "react";
import { useForm, useWatch, FormProvider } from "react-hook-form";
import StepTwoForm from "../Form/StepTwoForm";
import type { FormDataValues } from "../../types/formValues";
import StepThreeForm from "../Form/StepThreeForm";
import { FORM_KEY, STEP_KEY } from "../../utils/constants";
import { useLazyPostFormDataQuery } from "../../redux/slices/apiSlices/formSubmitSlice";
import { getErrorMessage } from "../../utils/errorHandler";
import { hasNoEmptyValues } from "../../utils/util";

const stepFields: Record<number, (keyof FormDataValues)[]> = {
  0: [
    "name",
    "nationalId",
    "dob",
    "gender",
    "address",
    "city",
    "state",
    "country",
    "phone",
    "email",
  ],
  1: [
    "maritalStatus",
    "dependents",
    "employeeMentStatus",
    "monthlyIncome",
    "housingStatus",
  ],
  2: ["currentFinancialSituation", "employmentCircumstances", "applyingReason"],
};

// Helper function to serialize form data (convert dayjs to string)
const serializeFormData = (data: FormDataValues) => {
  const serialized = { ...data };
  // Convert dayjs objects to ISO strings
  if (
    serialized.dob &&
    typeof serialized.dob === "object" &&
    serialized.dob.format
  ) {
    serialized.dob = serialized.dob.format("YYYY-MM-DD");
  }
  return JSON.stringify(serialized);
};

// Helper function to deserialize form data (convert string back to dayjs)
const deserializeFormData = (jsonString: string) => {
  const data = JSON.parse(jsonString);

  if (data.dob && typeof data.dob === "string") {
    data.dob = dayjs(data.dob);
  }

  return data;
};

const Stepper = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { stepId } = useParams<{ stepId: string }>();
  const saved = localStorage.getItem(FORM_KEY);
  const [postFormData, { isLoading }] = useLazyPostFormDataQuery();
  
  const currentStep = stepId ? parseInt(stepId) - 1 : 0;

  const getDefaultValues = () => {
    if (saved) {
      return deserializeFormData(saved);
    }
    return {
      name: "",
      nationalId: "",
      dob: "",
      gender: "",
      address: "",
      city: "",
      state: "",
      country: "",
      phone: "",
      email: "",
      maritalStatus: "",
      dependents: "",
      employeeMentStatus: "",
      monthlyIncome: "",
      housingStatus: "",
      currentFinancialSituation: "",
      employmentCircumstances: "",
      applyingReason: "",
    };
  };

  const methods = useForm({
    defaultValues: getDefaultValues(),
    mode: "all",
  });

  const { control, trigger, reset } = methods;

  const items = [
    {
      title: t("stepperFormLabels.personalInfo"),
    },
    {
      title: t("stepperFormLabels.familyAndFinancialInfo"),
    },
    {
      title: t("stepperFormLabels.situationDescription"),
    },
  ];

  const enterLabels = [
    { title: "personalInfo" },
    { title: "familyAndFinancialInfo" },
    { title: "situationDescription" },
  ];

  const formValues = useWatch({ control });

  useEffect(() => {
    try {
      localStorage.setItem(FORM_KEY, serializeFormData(formValues));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }, [formValues]);

  useEffect(() => {
    const savedStep = localStorage.getItem(STEP_KEY);
    
    if (!stepId) {
      const targetStep = savedStep ? parseInt(savedStep) : 1;
      navigate(`/step/${targetStep}`, { replace: true });
      return;
    }
    
    if (currentStep < 0 || currentStep >= items.length) {
      navigate("/step/1", { replace: true });
      return;
    }
    localStorage.setItem(STEP_KEY, String(currentStep + 1));
  }, [stepId, currentStep, items.length, navigate]);

  const handleNext = async () => {
    const fieldsToValidate = stepFields[currentStep as keyof typeof stepFields];
    const isValid = await trigger(fieldsToValidate as (keyof FormDataValues)[]);

    if (isValid && currentStep < items.length - 1) {
      navigate(`/step/${currentStep + 2}`);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      navigate(`/step/${currentStep}`);
    }
  };

  const handleSubmit = async () => {
    const formData = JSON.parse(serializeFormData(formValues))
    try{
        const resp = await postFormData(formData).unwrap()
        if(resp) {
            message.success("Form Submitted Successfully.")
            localStorage.removeItem(STEP_KEY)
            localStorage.removeItem(FORM_KEY)

            setTimeout(() => {
                navigate('/')
                localStorage.removeItem(STEP_KEY)
            localStorage.removeItem(FORM_KEY)
            reset({
                name: "",
                nationalId: "",
                dob: "",
                gender: "",
                address: "",
                city: "",
                state: "",
                country: "",
                phone: "",
                email: "",
                maritalStatus: "",
                dependents: "",
                employeeMentStatus: "",
                monthlyIncome: "",
                housingStatus: "",
                currentFinancialSituation: "",
                employmentCircumstances: "",
                applyingReason: "",
              })
            }, 1000)
        }
    } catch(err) {
        message.error(getErrorMessage(err))
    }
  };

  const handleStepChange = (step: number) => {
    navigate(`/step/${step + 1}`);
  };

  return (
    <FormProvider {...methods}>
      <div className="p-6 ml-12 mr-12">
        <Flex vertical gap="large">
          <Steps 
            current={currentStep} 
            items={items} 
            variant="outlined"
            onChange={handleStepChange}
          />
          <div className="border border-gray-300 rounded-lg p-8 bg-white">
            <h4 className="font-bold mb-8 text-lg">
              {t("enterYourLabel", {
                title: t(`stepperFormLabels.${enterLabels[currentStep].title}`),
              })}
            </h4>

            {currentStep === 0 && <StepOneForm control={control} />}
            {currentStep === 1 && (
              <div>
                <StepTwoForm control={control} />
              </div>
            )}
            {currentStep === 2 && <StepThreeForm control={control} />}

            <div className="justify-between flex">
              <Button onClick={handlePrevious} disabled={currentStep === 0}>
                {t("btns.previous")}
              </Button>
              <Button
                type="primary"
                loading={isLoading && currentStep === items.length - 1 ? isLoading : false}
                disabled={currentStep === items.length - 1 && !hasNoEmptyValues(formValues) ? true : false}
                onClick={
                  currentStep === items.length - 1 ? handleSubmit : handleNext
                }
              >
                {currentStep === items.length - 1
                  ? t("btns.submit")
                  : t("btns.next")}
              </Button>
            </div>
          </div>
        </Flex>
      </div>
    </FormProvider>
  );
};

export default Stepper;