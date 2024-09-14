// Type guard to check if an object is of type File.
const checkIsFile = (obj: unknown): obj is FileVinyl => {
  return obj instanceof File;
};

export default checkIsFile;
