import type {
  Sharp,
  SharpOptions,
  ResizeOptions,
  AvifOptions,
  Color,
  FlattenOptions,
  JpegOptions,
  Kernel,
  OverlayOptions,
  PngOptions,
  Region,
  TiffOptions,
  WebpOptions,
  HeifOptions,
  GifOptions,
  JxlOptions,
  Jp2Options,
  TileOptions,
  TimeoutOptions,
  TrimOptions,
  ThresholdOptions,
  NormaliseOptions,
  RotateOptions,
  BlurOptions,
  NegateOptions,
} from "sharp";

// Main sharp object type definition.
export type InitialSharp = Sharp;

// Defines available format options for image output.
export interface FormatOptions {
  jpeg?: JpegOptions; // JPEG-specific encoding options.
  png?: PngOptions; // PNG-specific encoding options.
  webp?: WebpOptions; // WebP-specific encoding options.
  avif?: AvifOptions; // AVIF-specific encoding options.
  heif?: HeifOptions; // HEIF-specific encoding options.
  gif?: GifOptions; // GIF-specific encoding options.
  jxl?: JxlOptions; // JPEG XL-specific encoding options.
  jp2?: Jp2Options; // JPEG 2000-specific encoding options.
  tiff?: TiffOptions; // TIFF-specific encoding options.
}

// Declaring keys as supported formats.
export type SupportedFormatMethod = keyof FormatOptions;

// Complete set of options for configuring image processing in Gulp.
export interface GulpSharperOptions extends SharpOptions {
  format?: SupportedFormatMethod; // Specifies the output format (e.g., jpeg, png).
  resize?: ResizeOptions; // Resizing options such as width, height, and aspect ratio.
  formats?: FormatOptions; // Advanced format-specific options for each image type.
  tile?: TileOptions; // Tiling options for creating zoomable images.
  timeout?: TimeoutOptions; // Sets a timeout for the operation.
  flip?: boolean; // Whether to flip the image vertically.
  flop?: boolean; // Whether to flop the image horizontally.
  median?: number; // Applies a median filter to reduce noise.
  grayscale?: boolean; // Converts the image to grayscale.
  negate?: boolean | NegateOptions; // Inverts the colors of the image.
  tint?: Color; // Applies a tint to the image with a specific color.
  extract?: Region; // Extracts a region of the image.
  trim?: TrimOptions; // Trims edges of the image.
  composite?: OverlayOptions[]; // Composite multiple images over each other.
  ensureAlpha?: number; // Ensures that the image contains an alpha channel (transparency).
  removeAlpha?: boolean; // Removes the alpha channel from the image.
  convolve?: Kernel; // Applies a custom kernel for image filtering.
  flatten?: boolean | FlattenOptions; // Flattens the image, removing transparency and filling with a color.
  normalise?: NormaliseOptions; // Normalizes the image for consistent brightness and contrast.
  rotate?: {
    // Rotates the image with optional angle and settings.
    angle?: number; // The angle to rotate the image.
    options?: RotateOptions; // Additional options for rotation.
  };
  sharpen?: {
    // Sharpens the image with adjustable parameters.
    sigma?: number; // Sharpness intensity.
    flat?: number; // Controls sharpening of flat areas.
    jagged?: number; // Controls sharpening of jagged areas.
  };
  blur?: {
    // Applies a blur effect to the image.
    sigma?: number | boolean | BlurOptions; // The intensity of the blur, or a boolean to enable/disable.
  };
  threshold?: {
    // Applies a threshold to the image.
    threshold?: number; // Threshold value for binary conversion.
    options?: ThresholdOptions; // Additional options for thresholding.
  };
  gamma?: {
    // Adjusts gamma correction.
    gamma?: number; // Gamma correction value.
    gammaOut?: number; // Gamma output value.
  };
  enableFileLogging?: boolean; // Enables logging for individual file processing.
  enableFinalLogging?: boolean; // Enables logging for final processing summary.
}
