export function renderHTML(): string {
  return /* html */ `
  <div class="jb-textarea-web-component">
    <label class="--hide" part="label"><span class="label-value"></span><span>:</span></label>
    <div class="textarea-box" part="textarea-box">
        <div class="block-start-section-wrapper" part="block-start-section-wrapper">
          <slot name="block-start-section"></slot>
        </div>
        <div class="inline-start-section-wrapper" part="inline-start-section-wrapper">
            <slot name="inline-start-section"></slot>
        </div>
        <textarea class="textarea-input" part="textarea"></textarea>
        <div class="inline-end-section-wrapper" part="inline-end-section-wrapper">
            <slot name="inline-end-section"></slot>
        </div>
        <div class="block-end-section-wrapper" part="block-end-section-wrapper">
            <slot name="block-end-section"></slot>
        </div>
    </div>
    <div class="message-box" part="message"></div>
  </div>
  `;
}