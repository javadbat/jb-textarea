export function renderHTML(): string {
  return /* html */ `
  <div class="jb-textarea-web-component" part="root">
    <label for="textarea" class="--hide" part="label"><span class="label-value"></span><span aria-hidden="true">:</span></label>
    <div class="control" part="control">
        <div class="block-start-wrapper" part="block-start">
          <slot name="block-start"></slot>
        </div>
        <div class="inline-start-wrapper" part="inline-start">
            <slot name="inline-start"></slot>
        </div>
        <textarea id="textarea" class="textarea-input" part="textarea" aria-describedby="message"></textarea>
        <div class="inline-end-wrapper" part="inline-end">
            <slot name="inline-end"></slot>
        </div>
        <div class="block-end-wrapper" part="block-end">
            <slot name="block-end"></slot>
        </div>
    </div>
    <div id="message" class="message-box" part="message" aria-live="polite" aria-atomic="true"></div>
  </div>
  `;
}
