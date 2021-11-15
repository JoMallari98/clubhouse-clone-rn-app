import { colorPalette } from './color-palette';

export const colors = {
  /**
   * The palette is available to use, but prefer using the name.
   */
  palette: colorPalette,
  /**
   * A helper for making something see-thru. Use sparingly as many layers of transparency
   * can cause older Android devices to slow down due to the excessive compositing required
   * by their under-powered GPUs.
   */
  transparent: 'rgba(0, 0, 0, 0)',
  /**
   * The screen background.
   */
  background: colorPalette.white,
  /**
   * The main tinting color.
   */
  primary: colorPalette.pink,
  /**
   * The secondary tinting color.
   */
  secondary: colorPalette.white,
  /**
   * The main tinting color, but darker.
   */
  primaryDarker: colorPalette.orangeDarker,
  /**
   * A subtle color used for borders and lines.
   */
  line: colorPalette.offWhite,
  /**
   * The default color of text in many components.
   */
  text: colorPalette.black,
  /**
   * Secondary information.
   */
  dim: colorPalette.darkGray,
  /**
   * Error messages and icons.
   */
  error: colorPalette.angry,
  /**
   * Shadow color
   */
  shadow: colorPalette.black,

  border: colorPalette.lightGreen,
};
