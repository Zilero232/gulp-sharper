import { InitialSharp, GulpSharperOptions } from "../../types";

interface CreateSharpTransformationsProps {
  pipeline: InitialSharp;
  options: GulpSharperOptions;
}

export const createSharpTransformations = ({ pipeline, options }: CreateSharpTransformationsProps): InitialSharp => {
  return sharpTransformations({ pipeline, options });
};
