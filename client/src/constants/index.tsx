export const MAX_SIZE_UPLOAD = 5 * 1024 * 1024;

export const SUPPORTED_IMAGES = ["image/png", "image/jpg", "image/jpeg"];

export const API_URL = process.env.REACT_APP_API_URL;

export const formDataHeaders = {
  contentType: "multipart/form-data",
  accept: "application/json",
};

export const headers = {
  contentType: "application/json",
  accept: "application/json",
};
