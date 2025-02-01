export const BASE_URL = "http://publrealty.publsoft.com/";
export const API_URL = BASE_URL + "api/v1/";
export const IMAGES_URL = BASE_URL + "uploadfiles/images/";

export function getImageUrl(imageName: string) {
  return IMAGES_URL + imageName;
}
