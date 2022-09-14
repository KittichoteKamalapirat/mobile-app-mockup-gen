import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { UploadedFile } from ".";
import { createUpload } from "../../redux/slices/uploadReducer";

interface Props {
  acceptedFiles: File[];
  identifier: string;
  isMultiple: boolean;
  savedFiles: UploadedFile[];
  setSavedFiles: (files: UploadedFile[]) => void;
  onUpload?: (files: UploadedFile[]) => Promise<void>;
}

const useUploadFiles = ({
  acceptedFiles,
  identifier,
  isMultiple,
  savedFiles,
  setSavedFiles,
  onUpload,
}: Props) => {
  const [uploadError, setUploadError] = useState("");
  const [uploadIsLoading, setUploadIsLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const handleS3Upload = async () => {
      const uploadedFiles: UploadedFile[] = [];
      for (let index = 0; index < acceptedFiles.length; index++) {
        const file = acceptedFiles[index];
        if (index === 0) {
          setUploadIsLoading(true);
          setUploadError("");
        }

        try {
          //   // fetch presigned url
          //   const response = await axios.get(
          //     `${process.env.NEXT_PUBLIC_API_URL}/presign_s3`,
          //     {
          //       params: {
          //         key: file.name,
          //         customer_id: identifier,
          //         file_type: file.type,
          //       },
          //     }
          //   );

          //   // upload file
          //   const { url, fields } = response.data;
          //   const formData = new FormData();

          //   // add file to form data
          //   Object.entries(fields).forEach(([key, value]) =>
          //     formData.append(key, value as string)
          //   );
          //   formData.append("file", file);

          //   await axios.post(url, formData);

          // keep track of all uploaded files
          uploadedFiles.push({
            // key: fields.key, TODO
            key: "x",
            name: file.name,
            presignedUrl: URL.createObjectURL(file),
            uploadedAt: new Date(),
          });

          console.log("dispatch!");

          dispatch(
            createUpload({
              // key: fields.key, TODO
              key: "x",
              name: file.name,
              presignedUrl: URL.createObjectURL(file),
              uploadedAt: new Date(),
            })
          );
        } catch (error) {
          setUploadError(`There was an error with your ${file.name} upload`);
        }

        // can only upload one file
        if (savedFiles.length === 1 && !isMultiple) {
          setUploadError(
            "Only 1 image can be uploaded. If you wish to change the image, please delete the current one first."
          );
          setUploadIsLoading(false);
          return;
        }
        // store and run final actions on uploaded files
        if (index === acceptedFiles.length - 1) {
          if (onUpload) await onUpload(uploadedFiles);
          setSavedFiles([...savedFiles, ...uploadedFiles]);
          setUploadIsLoading(false);
        }
      }
    };

    handleS3Upload();
  }, [acceptedFiles]);

  // remove files
  const onRemoval = useCallback(
    (fileKey: string) => {
      setSavedFiles(savedFiles.filter((file) => file.key !== fileKey));
    },
    [savedFiles]
  );

  return {
    onRemoval,
    uploadError,
    uploadIsLoading,
  };
};

export default useUploadFiles;
