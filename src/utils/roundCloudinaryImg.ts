import { urlResolver } from "../lib/UrlResolver";

export const roundCloudinaryImg = (fullUrl: string, radius: string): string => {
  const baseUrl = urlResolver.getCloudinaryImg();

  const matchIndicator = "/image/upload/v";
  const index = fullUrl.indexOf(matchIndicator);

  const relativePath = fullUrl.slice(
    index + matchIndicator.length - 1,
    fullUrl.length
  );

  return `${baseUrl}/${radius}/${relativePath}`;
};
