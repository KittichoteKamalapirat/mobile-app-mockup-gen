import { roundCloudinaryImg } from "./roundCloudinaryImg";

describe("roundCloudinaryImg", () => {
  test("should capitalise a lowercase string", () => {
    const fullUrl =
      "https://res.cloudinary.com/mockx/image/upload/v1663219884/ss_uploads/avuyktxasg5sxxfitfrr.png";
    const radius = "r_50";

    const returnedResult = roundCloudinaryImg(fullUrl, radius);

    const expectedResult =
      "https://res.cloudinary.com/mockx/image/upload/r_50/v1663219884/ss_uploads/avuyktxasg5sxxfitfrr.png";

    expect(returnedResult).toEqual(expectedResult);
  });
});
