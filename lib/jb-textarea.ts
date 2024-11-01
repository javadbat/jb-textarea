import HTML from './jb-textarea.html';
import CSS from './jb-textarea.scss';
import { ValidationHelper } from 'jb-validation';
import type { ValidationItem, ValidationResult, WithValidation } from 'jb-validation/types';
import type { JBFormInputStandards } from 'jb-form/types';
import { JBTextareaElements, ValidationValue } from './types';
//export all internal type for user easier access
export { ValidationValue };

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
    this.#validation.checkValidity(false);
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
      mode: 'open'
    });
    const html = `<style>${CSS}</style>` + '\n' + HTML;
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
  #validation = new ValidationHelper<ValidationValue>(this.showValidationError.bind(this), this.clearValidationError.bind(this), () => this.value, () => this.#value, this.#getInsideValidation.bind(this), this.#setValidationResult.bind(this));
  get validation() {
    return this.#validation;
  }
  #initProp() {
    this.value = this.getAttribute('value') || '';

  }
  static get observedAttributes() {
    return ['label', 'message', 'value', 'placeholder',"required"];
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
        this.required = value === '' || value ==='true';
        break;
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
    const eventInitDict = {
      bubbles: e.bubbles,
      cancelable: e.cancelable,
      composed: e.composed,
      data: e.data,
      isComposing: e.isComposing,
      inputType: e.inputType,
      dataTransfer: e.dataTransfer,
      view: e.view,
      detail: e.detail,
      targetRanges: e.getTargetRanges(),
    };
    const event = new InputEvent('beforeinput', eventInitDict);
    this.dispatchEvent(event);
    if (event.defaultPrevented) {
      e.preventDefault();
    }
    return event.defaultPrevented;
  }
  #onInputKeyDown(e: KeyboardEvent) {
    const keyDownnInitObj: KeyboardEventInit = {
      key: e.key,
      keyCode: e.keyCode,
      code: e.code,
      ctrlKey: e.ctrlKey,
      shiftKey: e.shiftKey,
      altKey: e.altKey,
      charCode: e.charCode,
      which: e.which,
      cancelable: true,
      location: e.location,
      detail: e.detail,
      bubbles: e.bubbles,
      composed: e.composed,
      isComposing: e.isComposing,
      metaKey: e.metaKey,
      repeat: e.repeat,
      view: e.view
    };
    const event = new KeyboardEvent("keydown", keyDownnInitObj);
    const isEventNotPrevented = this.dispatchEvent(event);
    if (!isEventNotPrevented) {
      //if event prevented by e.preventDefault();
      e.preventDefault();
    }
  }
  #onInputKeyPress(e: KeyboardEvent) {
    const keyPressInitObj: KeyboardEventInit = {
      key: e.key,
      keyCode: e.keyCode,
      code: e.code,
      ctrlKey: e.ctrlKey,
      shiftKey: e.shiftKey,
      altKey: e.altKey,
      charCode: e.charCode,
      which: e.which,
      cancelable: true,
      location: e.location,
      detail: e.detail,
      bubbles: e.bubbles,
      composed: e.composed,
      isComposing: e.isComposing,
      metaKey: e.metaKey,
      repeat: e.repeat,
      view: e.view
    };
    const event = new KeyboardEvent('keypress', keyPressInitObj);
    const isEventNotPrevented = this.dispatchEvent(event);
    if (!isEventNotPrevented) {
      //if event prevented by e.preventDefault();
      e.preventDefault();
    }
  }
  #onInputInput(e: InputEvent) {
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
    //here is the rare  time we update _value directly becuase we want trigger event that may read value directly from dom
    this.#value = inputText;
    this.#checkValidity(false);
    const keyUpInitObj: KeyboardEventInit = {
      key: e.key,
      keyCode: e.keyCode,
      code: e.code,
      ctrlKey: e.ctrlKey,
      shiftKey: e.shiftKey,
      altKey: e.altKey,
      charCode: e.charCode,
      which: e.which,
      bubbles: e.bubbles,
      cancelable: e.cancelable,
      composed: e.composed,
      detail: e.detail,
      isComposing: e.isComposing,
      location: e.location,
      metaKey: e.metaKey,
      repeat: e.repeat,
      view: e.view
    };
    const event = new KeyboardEvent('keyup', keyUpInitObj);
    this.dispatchEvent(event);
  }
  #onInputChange(e: Event) {
    const inputText = (e.target as HTMLTextAreaElement).value;
    //here is the rare  time we update #value directly because we want trigger event that may read value directly from dom
    this.#value = inputText;
    this.#checkValidity(true);
    const event = new Event('change');
    this.dispatchEvent(event);
  }

  showValidationError(error: string) {
    this.#elements.messageBox.innerHTML = error;
    this.#elements.messageBox.classList.add('error');
  }
  clearValidationError() {
    const text = this.getAttribute('message') || '';
    this.#elements.messageBox.innerHTML = text;
    this.#elements.messageBox.classList.remove('error');
  }
  #getInsideValidation(): ValidationItem<ValidationValue>[] {
    const validationList: ValidationItem<ValidationValue>[] = [];
    if (this.required) {
      validationList.push({
        validator: /.{1}/g,
        message: this.getAttribute("label") +" "+ "میبایست حتما وارد شود",
        stateType: "valueMissing"
      });
    }
    return validationList;
  }
  #checkValidity(showError: boolean) {
    if (!this.isAutoValidationDisabled) {
      return this.#validation.checkValidity(showError);
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
    const validationResult = this.#validation.checkValidity(false);
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
    const validationResult = this.#validation.checkValidity(true);
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