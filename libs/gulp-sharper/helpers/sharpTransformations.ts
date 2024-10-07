import type sharp from "sharp";

import { GulpSharperOptions } from "../types";

interface ApplySharpTransformations {
  pipeline: sharp.Sharp;
  options: GulpSharperOptions;
}

const sharpTransformations = ({ pipeline, options }: ApplySharpTransformations) => {
  if (options.resize) pipeline.resize(options.resize);

  if (options.flip) pipeline.flip();

  if (options.flop) pipeline.flop();

  if (options.median) pipeline.median(options.median);

  if (options.grayscale) pipeline.grayscale();

  if (options.negate) pipeline.negate(options.negate);

  if (options.tint) pipeline.tint(options.tint);

  if (options.extract) pipeline.extract(options.extract);

  if (options.trim) pipeline.trim(options.trim.threshold);

  if (options.composite) pipeline.composite(options.composite);

  if (options.ensureAlpha !== undefined) pipeline.ensureAlpha(options.ensureAlpha);

  if (options.removeAlpha) pipeline.removeAlpha();

  if (options.convolve) pipeline.convolve(options.convolve);

  if (options.flatten) pipeline.flatten(options.flatten);

  if (options.normalise) pipeline.normalise(options.normalise);

  if (options.rotate) {
    const { angle = 0, options: rotateOptions } = options.rotate;

    pipeline.rotate(angle, rotateOptions);
  }

  if (options.sharpen) {
    const { sigma, flat, jagged } = options.sharpen;

    pipeline.sharpen(sigma, flat, jagged);
  }

  if (options.blur) {
    if (typeof options.blur === "boolean") {
      pipeline.blur();
    } else {
      pipeline.blur(options.blur.sigma);
    }
  }

  if (options.threshold) {
    pipeline.threshold(options.threshold.threshold, options.threshold.options);
  }

  if (options.gamma) {
    pipeline.gamma(options.gamma.gamma, options.gamma.gammaOut);
  }

  return pipeline;
};

export default sharpTransformations;
