import CSS from './jb-textarea.scss';
import { ShowValidationErrorParameters, ValidationHelper, type ValidationItem, type ValidationResult, type WithValidation } from 'jb-validation';
import type { JBFormInputStandards } from 'jb-form';
import { JBTextareaElements, ValidationValue } from './types';
import { registerDefaultVariables } from 'jb-core/theme';
import { createInputEvent, createKeyboardEvent } from 'jb-core';
import { renderHTML } from './render';
//export all internal type for user easier access
export * from './types.js';


export class JBTextareaWebComponent extends HTMLElement implements WithValidation, JBFormInputStandards<string> {
  static get formAssociated() {
    return true;
  }
  #value = '';
  get value() {
    return this.#value;
  }
  set value(value) {
    this.#value = value;
    this.#textareaElement.value = value;
    if (this.autoHeight) {
      this.#changeHeightToContentSize();
    }
  }
  #isAutoValidationDisabled = false;
  get isAutoValidationDisabled(): boolean {
    return this.#isAutoValidationDisabled;
  }
  set isAutoValidationDisabled(value: boolean) {
    this.#isAutoValidationDisabled = value;
  }
  #disabled = false;
  get disabled() {
    return this.#disabled;
  }
  set disabled(value: boolean) {
    this.#disabled = value;
    this.#elements.textarea.disabled = value;
    if (value) {
      //TODO: remove as any when typescript support
      (this.#internals as any).states?.add("disabled");
    } else {
      (this.#internals as any).states?.delete("disabled");
    }
  }
  #required = false;
  set required(value: boolean) {
    this.#required = value;
    this.#validation.checkValiditySync({ showError: false });
  }
  get required() {
    return this.#required;
  }
  #internals?: ElementInternals;

  get name() {
    return this.getAttribute('name') || '';
  }
  initialValue = "";
  get isDirty(): boolean {
    return this.#value !== this.initialValue;
  }
  constructor() {
    super();
    if (typeof this.attachInternals == "function") {
      //some browser dont support attachInternals
      this.#internals = this.attachInternals();
    }
    this.#initWebComponent();
    this.#initProp();
  }
  #textareaElement!: HTMLTextAreaElement;
  #elements!: JBTextareaElements;
  #initWebComponent() {
    const shadowRoot = this.attachShadow({
      mode: 'open',
      delegatesFocus: true
    });
    registerDefaultVariables();
    const html = `<style>${CSS}</style>` + '\n' + renderHTML();
    const element = document.createElement('template');
    element.innerHTML = html;
    shadowRoot.appendChild(element.content.cloneNode(true));
    this.#textareaElement = shadowRoot.querySelector('.textarea-box textarea')!;
    this.#elements = {
      textarea: this.#textareaElement,
      label: shadowRoot.querySelector('label')!,
      labelValue: shadowRoot.querySelector('label .label-value')!,
      messageBox: shadowRoot.querySelector('.message-box')!
    }
    this.#registerEventListener();
  }
  #registerEventListener() {
    this.#elements.textarea.addEventListener('change', (e) => this.#onInputChange(e));
    this.#elements.textarea.addEventListener('beforeinput', this.#onInputBeforeInput.bind(this));
    this.#elements.textarea.addEventListener('input', (e) => this.#onInputInput((e as unknown as InputEvent)));
    this.#elements.textarea.addEventListener('keypress', this.#onInputKeyPress.bind(this));
    this.#elements.textarea.addEventListener('keyup', this.#onInputKeyup.bind(this));
    this.#elements.textarea.addEventListener('keydown', this.#onInputKeyDown.bind(this));
  }
  autoHeight = false;
  #validation = new ValidationHelper<ValidationValue>({
    clearValidationError: this.clearValidationError.bind(this),
    getValue: () => this.#value,
    getValueString: () => this.value,
    getValidations: this.#getInsideValidation.bind(this),
    setValidationResult: this.#setValidationResult.bind(this),
    showValidationError: this.showValidationError.bind(this)
  });
  get validation() {
    return this.#validation;
  }
  #initProp() {
    this.value = this.getAttribute('value') || '';

  }
  static get observedAttributes() {
    return ['label', 'message', 'value', 'placeholder', "required", "error"];
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    // do something when an attribute has changed
    this.#onAttributeChange(name, newValue);
  }
  #onAttributeChange(name: string, value: string) {
    switch (name) {
      case 'label':
        this.#elements.labelValue.innerHTML = value;
        if (value == null || value == undefined || value == "") {
          this.#elements.label.classList.add('--hide');
        } else {
          this.#elements.label.classList.remove('--hide');
        }
        break;
      case 'message':
        this.#elements.messageBox.innerHTML = value;
        break;
      case 'placeholder':
        this.#textareaElement.setAttribute('placeholder', value);
        break;
      case 'value':
        this.value = value;
        break;
      case 'required':
        this.required = value === '' || value === 'true';
        break;
      case "error":
        this.reportValidity();
    }

  }
  #changeHeightToContentSize() {
    this.#textareaElement.style.height = "4px";
    this.#textareaElement.style.height = (this.#textareaElement.scrollHeight) + "px";
  }
  #onInputBeforeInput(e: InputEvent) {
    this.#dispatchBeforeInputEvent(e);
  }
  #dispatchBeforeInputEvent(e: InputEvent): boolean {
    const event = createInputEvent('beforeinput', e, { cancelable: true });
    this.dispatchEvent(event);
    if (event.defaultPrevented) {
      e.preventDefault();
    }
    return event.defaultPrevented;
  }
  #onInputKeyDown(e: KeyboardEvent) {
    const event = createKeyboardEvent("keydown", e, { cancelable: true });
    const isEventNotPrevented = this.dispatchEvent(event);
    if (!isEventNotPrevented) {
      //if event prevented by e.preventDefault();
      e.preventDefault();
    }
  }
  #onInputKeyPress(e: KeyboardEvent) {
    const event = createKeyboardEvent('keypress', e, { cancelable: true });
    const isEventNotPrevented = this.dispatchEvent(event);
    if (!isEventNotPrevented) {
      //if event prevented by e.preventDefault();
      e.preventDefault();
    } else {
      if (e.key == "Enter") {
        this.#onInputEnter(e);
      }
    }
  }
  #onInputInput(e: InputEvent) {
    const inputText = (e.target as HTMLTextAreaElement).value;
    //here is the rare  time we update #value directly because we want trigger event that may read value directly from dom
    this.#value = inputText;
    if (this.autoHeight) {
      this.#changeHeightToContentSize();
    }
    this.#triggerInputEvent(e);
  }
  #triggerInputEvent(e: InputEvent) {
    const inputInitObject: InputEventInit = {
      bubbles: e.bubbles,
      cancelable: e.cancelable,
      composed: e.composed,
      data: e.data,
      dataTransfer: e.dataTransfer,
      detail: e.detail,
      inputType: e.inputType,
      isComposing: e.isComposing,
      targetRanges: e.getTargetRanges(),
      view: e.view
    };
    const event = new InputEvent("input", inputInitObject);
    this.dispatchEvent(event);
  }
  #onInputKeyup(e: KeyboardEvent) {

    const inputText = (e.target as HTMLTextAreaElement).value;
    //here is the rare  time we update #value directly because we want trigger event that may read value directly from dom
    this.#value = inputText;
    this.#checkValidity(false);
    const event = createKeyboardEvent('keyup', e, { cancelable: true });

    this.dispatchEvent(event);
    if (event.defaultPrevented) {
      //if event prevented by e.preventDefault();
      e.preventDefault();
    }

  }
  #onInputEnter(e: KeyboardEvent): void {
    const event = createKeyboardEvent("enter", e, { cancelable: true });
    this.dispatchEvent(event);
    if (event.defaultPrevented) {
      e.preventDefault();
    }
  }
  #onInputChange(e: Event) {
    const inputText = (e.target as HTMLTextAreaElement).value;
    //here is the rare  time we update #value directly because we want trigger event that may read value directly from dom
    this.#value = inputText;
    this.#checkValidity(true);
    const dispatchedEvent = this.#dispatchChangeEvent();
    if (dispatchedEvent.defaultPrevented) {
      e.preventDefault();
    }
  }
  #dispatchChangeEvent() {
    const event = new Event('change', { bubbles: true, cancelable: true });
    this.dispatchEvent(event);
    return event;
  }
  showValidationError(error: ShowValidationErrorParameters | string) {
    const message = typeof error == "string" ? error : error.message;
    this.#internals.states?.add("invalid");
    this.#elements.messageBox.innerHTML = message;
  }
  clearValidationError() {
    const text = this.getAttribute('message') || '';
    this.#internals.states?.delete("invalid");
    this.#elements.messageBox.innerHTML = text;
  }
  #getInsideValidation(): ValidationItem<ValidationValue>[] {
    const validationList: ValidationItem<ValidationValue>[] = [];
    if (this.getAttribute("error") !== null && this.getAttribute("error").trim().length > 0) {
      validationList.push({
        validator: undefined,
        message: this.getAttribute("error"),
        stateType: "customError"
      });
    }
    if (this.required) {
      validationList.push({
        validator: /.{1}/g,
        message: this.getAttribute("label") + " " + "میبایست حتما وارد شود",
        stateType: "valueMissing"
      });
    }
    return validationList;
  }
  #checkValidity(showError: boolean) {
    if (!this.isAutoValidationDisabled) {
      return this.#validation.checkValidity({ showError });
    }
  }
  /**
 * @description this method called on every checkValidity calls and update validation result of #internal
 */
  #setValidationResult(result: ValidationResult<ValidationValue>) {
    if (result.isAllValid) {
      this.#internals.setValidity({}, '');
    } else {
      const states: ValidityStateFlags = {};
      let message = "";
      result.validationList.forEach((res) => {
        if (!res.isValid) {
          if (res.validation.stateType) { states[res.validation.stateType] = true; }
          if (message == '') { message = res.message; }
        }
      });
      this.#internals.setValidity(states, message);
    }
  }
  get validationMessage() {
    return this.#internals.validationMessage;
  }
  /**
 * @public
 * @description this method used to check for validity but doesn't show error to user and just return the result
 * this method used by #internal of component
 */
  checkValidity(): boolean {
    const validationResult = this.#validation.checkValiditySync({ showError: false });
    if (!validationResult.isAllValid) {
      const event = new CustomEvent('invalid');
      this.dispatchEvent(event);
    }
    return validationResult.isAllValid;
  }
  /**
  * @public
 * @description this method used to check for validity and show error to user
 */
  reportValidity(): boolean {
    const validationResult = this.#validation.checkValiditySync({ showError: true });
    if (!validationResult.isAllValid) {
      const event = new CustomEvent('invalid');
      this.dispatchEvent(event);
    }
    return validationResult.isAllValid;
  }
}

const myElementNotExists = !customElements.get('jb-textarea');
if (myElementNotExists) {
  //prevent duplicate registering
  window.customElements.define('jb-textarea', JBTextareaWebComponent);
}