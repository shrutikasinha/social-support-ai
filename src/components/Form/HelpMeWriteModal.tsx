import React, { useState, useEffect, useRef } from "react";
import { Modal, Input, Button, Spin, message, Radio, Space } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useGenerateContentMutation } from "../../redux/slices/apiSlices/suggestionApiSlice";
import { getErrorMessage } from "../../utils/errorHandler";
import { useTranslation } from "react-i18next";
import type { FormDataValues } from "../../types/formValues";

const { TextArea } = Input;

interface AIWritingModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (content: string) => void;
  fieldName: string;
  context: string;
  currentValue?: string;
  fieldLabel: string;
  formValues: FormDataValues;
}

export const HelpMeWriteModal: React.FC<AIWritingModalProps> = ({
  visible,
  onClose,
  onApply,
  fieldName,
  context,
  currentValue,
  fieldLabel,
  formValues,
}) => {
  const { t } = useTranslation();
  const [generateContent, { isLoading, error }] = useGenerateContentMutation();
  const [editedContent, setEditedContent] = useState("");
  const [usePersonalData, setUsePersonalData] = useState<boolean | null>(null);
  const [hasAskedPermission, setHasAskedPermission] = useState(false);
  const hasGeneratedRef = useRef(false);

  const handleGenerate = async (edited?: boolean) => {
    const currentText = !edited ? currentValue : editedContent;
    try {
      const result = await generateContent({
        fieldName,
        context,
        currentValue: currentText,
        usePersonalData: usePersonalData ?? false,
        previousFormData: JSON.stringify(formValues),
      }).unwrap();

      setEditedContent(result.content);
    } catch (err: unknown) {
      const msg = getErrorMessage(err);
      message.error(msg);
      console.error("AI Generation Error:", msg);
    }
  };

  const handlePersonalDataChoice = (choice: boolean) => {
    setUsePersonalData(choice);
    setHasAskedPermission(true);
  };

  useEffect(() => {
    if (visible && !hasGeneratedRef.current && hasAskedPermission) {
      hasGeneratedRef.current = true;
      generateContent({
        fieldName,
        context,
        currentValue,
        usePersonalData: usePersonalData ?? false,
        previousFormData: JSON.stringify(formValues),
      })
        .unwrap()
        .then((result) => {
          setEditedContent(result.content);
        })
        .catch((err: unknown) => {
          const msg = getErrorMessage(err);
          message.error(msg);
          console.error("AI Generation Error:", msg);
        });
    }
  }, [
    visible,
    hasAskedPermission,
    generateContent,
    fieldName,
    context,
    currentValue,
    usePersonalData,
    formValues,
  ]);

  useEffect(() => {
    if (!visible) {
      hasGeneratedRef.current = false;
    }
  }, [visible]);

  const handleDiscard = () => {
    // Reset state when closing
    setHasAskedPermission(false);
    setUsePersonalData(null);
    setEditedContent("");
    onClose();
  };

  const handleDone = () => {
    if (editedContent.trim()) {
      onApply(editedContent);
      onClose();
    } else {
      message.warning("Please enter some content");
    }
  };

  return (
    <Modal
      title={`${t("helpMeWriteModal.title")} - ${fieldLabel}`}
      open={visible}
      onCancel={handleDiscard}
      width={700}
      footer={null}
    >
      <div style={{ minHeight: "300px" }}>
        {!hasAskedPermission ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "300px",
              gap: "24px",
              padding: "24px",
            }}
          >
            <div style={{ textAlign: "center", maxWidth: "500px" }}>
              <h3 style={{ marginBottom: "16px", fontSize: "18px" }}>
                {t("helpMeWriteModal.personalDataTitle")}
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  color: "#666",
                  marginBottom: "24px",
                }}
              >
                {t("helpMeWriteModal.personalDataDescription")}
              </p>
              <Radio.Group
                onChange={(e) => handlePersonalDataChoice(e.target.value)}
                value={usePersonalData}
                style={{ marginBottom: "24px" }}
              >
                <Space size="middle">
                  <Radio value={true} style={{ fontSize: "14px" }}>
                    {t("helpMeWriteModal.usePersonalDataYes")}
                  </Radio>
                  <Radio value={false} style={{ fontSize: "14px" }}>
                    {t("helpMeWriteModal.usePersonalDataNo")}
                  </Radio>
                </Space>
              </Radio.Group>
            </div>
          </div>
        ) : isLoading ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "300px",
              gap: "16px",
            }}
          >
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
              size="large"
            />
            <p style={{ fontSize: "16px", color: "#666" }}>
              {t("generatingAiResult")}
            </p>
          </div>
        ) : error ? (
          <div
            style={{
              padding: "24px",
              textAlign: "center",
              color: "#ff4d4f",
            }}
          >
            <p>Failed to generate content. Please try again.</p>
            <Button
              type="primary"
              onClick={() => handleGenerate()}
              style={{ marginTop: "16px" }}
            >
              Retry
            </Button>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: "12px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: 500,
                }}
              >
                {t("generatedContextEdit")}
              </label>
              <TextArea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                placeholder="AI-generated content will appear here..."
                rows={10}
                style={{ fontSize: "14px" }}
              />
            </div>

            <div
              style={{
                display: "flex",
                gap: "12px",
                justifyContent: "flex-end",
                marginTop: "16px",
              }}
            >
              <Button
                type="primary"
                onClick={handleDone}
                disabled={!editedContent.trim()}
              >
                {t("helpMeWriteModal.acceptBtn")}
              </Button>
              <Button
                type="default"
                onClick={() => handleGenerate(false)}
                loading={isLoading}
              >
                {t("helpMeWriteModal.regenerateBtn")}
              </Button>
              <Button
                type="default"
                onClick={() => handleGenerate(true)}
                loading={isLoading}
              >
                {t("helpMeWriteModal.regenerateWithEdit")}
              </Button>
              <Button onClick={handleDiscard} className="bg-red-500 text-white">
                {t("helpMeWriteModal.discardBtn")}
              </Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};
