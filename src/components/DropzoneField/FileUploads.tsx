import React from "react";
import { UploadedFile } from ".";
import IconButton from "../Buttons/IconButton";
import DocumentSearchIcon from "../icons/test/DocumentSearchIcon";

import TrashIcon from "../icons/TrashIcon";

interface Props {
  files: UploadedFile[];
  isMultiple: boolean;
  showConfirmationOnDelete: boolean;
  onRemoval: (fileKey: string) => void;
}

const FileUploads = ({
  files,
  isMultiple,
  showConfirmationOnDelete,
  onRemoval,
}: Props) => {
  const handleRemoval = (fileKey: string) => () => onRemoval(fileKey);
  return (
    <>
      {isMultiple ? (
        <p className="font-nunito text-xs text-grey-250 text-opacity-70">
          Uploads
        </p>
      ) : null}

      {files.map((file) => (
        <div
          key={file.name}
          className="w-1/2 max-w-2xl grid grid-cols-12 items-center mt-2.5"
        >
          <a
            href={file.presignedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="col-span-7"
          >
            <p className="font-nunito font-thin text-11px text-grey-420 underline truncate">
              {file.name}
            </p>
          </a>
          <div className="col-span-3 lg:col-span-2 xl:col-span-1 2xl:hidden" />
          <div className="flex flex-nowrap">
            <a
              href={file.presignedUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <DocumentSearchIcon
                label={`${file.name}-open`}
                extraClass="opacity-80"
              />
            </a>

            <IconButton
              icon={<TrashIcon />}
              onClick={() =>
                showConfirmationOnDelete
                  ? console.log(
                      "alertModal.requireConfirmationModal(handleRemoval(file.key))"
                    )
                  : onRemoval(file.key)
              }
              label={`${file.name}-remove`}
              className="ml-3 opacity-80"
            />
          </div>
        </div>
      ))}
    </>
  );
};

FileUploads.defaultProps = {
  isMultiple: false,
};

export default FileUploads;
