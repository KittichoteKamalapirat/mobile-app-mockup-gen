import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { UploadedFile } from ".";
import { createUpload } from "../../redux/slices/uploadReducer";
import { roundCloudinaryImg } from "../../utils/roundCloudinaryImg";

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
      console.log("handle cloudinary upload");
      const uploadedFiles: UploadedFile[] = [];
      for (let index = 0; index < acceptedFiles.length; index++) {
        const file = acceptedFiles[index];

        console.log("file", file);
        if (index === 0) {
          setUploadIsLoading(true);
          setUploadError("");
        }

        try {
          //   // fetch presigned url

          const cloudinaryUploadEndPoint =
            "https://api.cloudinary.com/v1_1/mockx/image/upload";

          // const response = await axios.get(
          //   `${process.env.NEXT_PUBLIC_API_URL}/presign_s3`,
          //   {
          //     params: {
          //       key: file.name,
          //       customer_id: identifier,
          //       file_type: file.type,
          //     },
          //   }
          // );

          // // upload file
          // const { url, fields } = response.data;
          const formData = new FormData();

          formData.append("file", file);

          formData.append("upload_preset", "ss_uploads");

          console.log("formdata", formData);
          const options = {
            url: cloudinaryUploadEndPoint,
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json;charset=UTF-8",
            },
            data: {
              file: formData,
              // api_key: process.env.CLOUDINARY_API_KEY,
              // signature: process.env.CLOUDINARY_API_SECRET,
            },
          };

          // const response = await axios(options);

          const response = await fetch(cloudinaryUploadEndPoint, {
            method: "POST",
            body: formData,
          });

          const data = await response.json();

          console.log("data", data);

          dispatch(
            createUpload({
              // key: fields.key, TODO
              key: data.public_id,
              name: `${data.original_filename}.${data.format}`,
              presignedUrl: roundCloudinaryImg(data.secure_url, "r_45"),
              uploadedAt: data.created_at,
            })
          );
        } catch (error) {
          console.log("error", error);
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
