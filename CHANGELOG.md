# Changelog

## Unreleased

### Changed

- Added the React `initialValue` prop and forwarded `value` and `initialValue` directly as React 19 custom-element properties.
- Breaking: renamed `--jb-textarea-bgcolor` to `--jb-textarea-bg-color`.
- Breaking: renamed `--jb-textarea-bgcolor-disabled` to `--jb-textarea-bg-color-disabled`.
- Breaking: renamed `--jb-textarea-message-error-color` to `--jb-textarea-message-color-error`.
- Added public inline spacing, inline slot padding, current border color, and current background variables.
- Added styling story and documentation with reusable style recipes.
- Added `component` CSS part.
- Added input-parity CSS variables for width, focus border widths, shadows, label weight, textarea alignment/direction/font weight, message display, and size variants.
- Standardized theme recipes on `jb-textarea.<theme>-style` and removed redundant per-theme textarea hook classes.
- Increased Carbon label and message spacing for clearer separation from the textarea box.
