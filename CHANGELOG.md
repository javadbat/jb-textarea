# Changelog

## [3.13.2] - 2026-07-30

### Added

- Added the standard `formDisabledCallback()` to synchronize the component disabled state with disabled forms and fieldsets.

### Fixed

- fix name assignment property

## [3.13.1] - 2026-07-27

### Added

- Added Storybook interaction coverage for initial-value initialization, live-value precedence, explicit `null`, and native form reset.

### Changed

- Added `initialValue` as the default and reset text; it seeds `value` only until the live value is explicitly set.
- Updated the React wrapper so an omitted `value` does not overwrite `initialValue`, while explicit `null` still clears the live value.

### Fixed

- fix redundant outline when focus.

## [3.13.0] - 2026-07-19

### Added

- Added the standard `formResetCallback()` to restore `initialValue` and clear validation state.

### Changed

- Standardized `invalid` custom-state and `ariaInvalid` updates in validation display and cleanup callbacks.
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
