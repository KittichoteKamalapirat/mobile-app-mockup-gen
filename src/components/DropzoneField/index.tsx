import React, { useMemo } from "react";
import { Accept, useDropzone } from "react-dropzone";
import FormFieldLabel from "../FormFieldLabel";
import FormHelperText from "../FormHelperText";
import FileUploader from "./FileUploads";
import useUploadFiles from "./useUploadFiles";

const baseStyle = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
  borderWidth: "0.5px",
  borderRadius: 5,
  borderColor: "#677BF7",
  borderStyle: "dashed",
  borderOpacity: 0.7,
  outline: "none",
  height: "140px",
  transition: "border .24s ease-in-out",
  cursor: "pointer",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const rejectStyle = {
  borderColor: "#ef4444",
};

export interface UploadedFile {
  name: string;
  key: string;
  presignedUrl: string;
  uploadedAt: Date;
}

interface Props {
  children: React.ReactNode;
  label: string;
  ariaLabel: string;
  labelFontColour?: string;
  labelClass: string;
  helperText: string;
  displayOptionalLabel: boolean;
  isError: boolean;
  acceptedFileTypes: string | string[];
  maxFiles: number;
  maxSize: number;
  customerId: string;
  fileUploads: UploadedFile[];
  setFileUploads: (files: UploadedFile[]) => void;
  inputClass?: string;
  showConfirmationOnDelete: boolean;
  isDroppable?: boolean;
}

const DropzoneField = ({
  children,
  label,
  ariaLabel,
  labelFontColour,
  labelClass,
  helperText,
  isError,
  displayOptionalLabel,
  acceptedFileTypes,
  maxFiles,
  maxSize,
  customerId,
  fileUploads,
  inputClass,
  setFileUploads,
  showConfirmationOnDelete,
  isDroppable = true,
}: Props) => {
  const isMultiple = maxFiles !== 1;
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isFocused,
    isDragReject,
    fileRejections,
  } = useDropzone({
    accept: acceptedFileTypes as any, // TODO
    maxFiles: maxFiles,
    multiple: isMultiple,
    maxSize: maxSize,
  });

  const { onRemoval, uploadError, uploadIsLoading } = useUploadFiles({
    acceptedFiles,
    isMultiple,
    identifier: customerId,
    savedFiles: fileUploads,
    setSavedFiles: setFileUploads,
  });

  // error handling
  const inputError =
    isDragReject || fileRejections.length > 0
      ? "There was an error with your upload"
      : "";

  const style = useMemo(
    () => ({
      ...(isDroppable && baseStyle),
      ...(isFocused ? focusedStyle : {}),
      ...(!!inputError || !!uploadError ? rejectStyle : {}),
    }),
    [isFocused, inputError, uploadError]
  );

  return (
    <>
      {label ? (
        <FormFieldLabel
          label={label}
          fontColour={labelFontColour}
          displayOptionalLabel={displayOptionalLabel}
          extraClass={labelClass}
        />
      ) : null}
      <div
        {...getRootProps({
          style,
          "aria-label": `${label || ariaLabel}-div`,
          className: inputClass,
        })}
      >
        <input
          {...getInputProps({
            "aria-label": `${label || ariaLabel}-label`,
          })}
        />
        {children}
      </div>
      <FormHelperText
        isError={isError || !!inputError || !!uploadError}
        helperText={uploadError || inputError || helperText}
        spacing="mt-2 mb-3"
      />
      {fileUploads.length ? (
        <FileUploader
          files={fileUploads}
          isMultiple={isMultiple}
          onRemoval={onRemoval}
          showConfirmationOnDelete={showConfirmationOnDelete}
        />
      ) : null}
      {uploadIsLoading ? (
        <p className="mt-2.5 font-nunito font-thin text-11px text-grey-420 text-center">
          Uploading...
        </p>
      ) : null}
    </>
  );
};

DropzoneField.defaultProps = {
  label: "",
  ariaLabel: "",
  labelClass: "mb-2",
  helperText: "",
  displayOptionalLabel: false,
  isError: false,
  acceptedFileTypes: "",
  maxFiles: 0, // 0 means no limit
  maxSize: 10000000, // 10MB
  customerId: "",
};

export default DropzoneField;
