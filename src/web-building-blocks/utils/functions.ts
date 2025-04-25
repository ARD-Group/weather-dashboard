export const getS3Path = (path: string) => {
  return `${process.env.REACT_APP_PUBLIC_S3_URL}${path}`;
};
