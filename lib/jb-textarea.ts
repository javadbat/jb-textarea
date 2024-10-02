import HTML from './jb-textarea.html';
import CSS from './jb-textarea.scss';
import { JBTextareaElements, JBTextareaValidationItem, ValidationResult, ValidationResultItem, ValidationResultSummary } from './types1';
export { JBTextareaValidationItem };
export class JBTextareaWebComponent extends HTMLElement {
  #value = '';
  get value() {
    return this.#value;
  }
  set value(value) {
    this.#value = value;
    this.#textareaElement.value = value;
    if (this.autoHeight) {
      this.changeHeightToContentSize();
    }
  }
  constructor() {
    super();
    this.initWebComponent();
    this.initProp();
  }
  #textareaElement!: HTMLTextAreaElement;
  #elements!: JBTextareaElements;
  initWebComponent() {
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
    this.registerEventListener();
  }
  registerEventListener() {
    this.#elements.textarea.addEventListener('change', (e) => this.onInputChange(e));
    this.#elements.textarea.addEventListener('beforeinput', this.onInputBeforeInput.bind(this));
    this.#elements.textarea.addEventListener('input', (e) => this.onInputInput((e as unknown as InputEvent)));
    this.#elements.textarea.addEventListener('keypress', this.onInputKeyPress.bind(this));
    this.#elements.textarea.addEventListener('keyup', this.onInputKeyup.bind(this));
    this.#elements.textarea.addEventListener('keydown', this.onInputKeyDown.bind(this));
  }
  validationList: JBTextareaValidationItem[] = [];
  autoHeight = false;
  validation: ValidationResultSummary = {
    isValid: null,
    message: null
  }
  initProp() {
    this.value = this.getAttribute('value') || '';

  }
  static get observedAttributes() {
    return ['label', 'message', 'value', 'placeholder'];
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    // do something when an attribute has changed
    this.onAttributeChange(name, newValue);
  }
  onAttributeChange(name: string, value: string) {
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
    }

  }
  changeHeightToContentSize() {
    this.#textareaElement.style.height = "4px";
    this.#textareaElement.style.height = (this.#textareaElement.scrollHeight) + "px";
  }
  onInputBeforeInput(e: InputEvent) {
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
  onInputKeyDown(e: KeyboardEvent) {
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
  onInputKeyPress(e: KeyboardEvent) {
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
  onInputInput(e: InputEvent) {
    if (this.autoHeight) {
      this.changeHeightToContentSize();
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
  onInputKeyup(e: KeyboardEvent) {
    const inputText = (e.target as HTMLTextAreaElement).value;
    //here is the rare  time we update _value directly becuase we want trigger event that may read value directly from dom
    this.#value = inputText;
    this.triggerInputValidation(false);
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
  onInputChange(e: Event) {
    const inputText = (e.target as HTMLTextAreaElement).value;
    this.triggerInputValidation(true);
    //here is the rare  time we update _value directly becuase we want trigger event that may read value directly from dom
    this.#value = inputText;
    const validationObject = this.checkInputValidation(inputText);
    const event = new CustomEvent('change', {
      detail: {
        isValid: validationObject.isAllValid,
        validationObject: validationObject,
      },
    });
    this.dispatchEvent(event);
  }
  triggerInputValidation(showError = true) {
    // this method is for use out of component  for example if user click on submit button and developer want to check if all fields are valid
    //takeAction determine if we want to show user error in web component difualtManner or developer will handle it by himself
    const inputText = this.#textareaElement.value;
    const validationResult = this.checkInputValidation(inputText);
    if (showError == true && !validationResult.isAllValid) {
      const firstFault = validationResult.validationList.find(x => !x.isValid);
      if (firstFault && firstFault.message) {
        this.showValidationError(firstFault.message);
      }
    } else if (validationResult.isAllValid) {
      this.clearValidationError();
    }
    return validationResult;
  }
  checkInputValidation(inputText: string): ValidationResult {
    const validationResult: ValidationResult = {
      validationList: [],
      isAllValid: true
    };
    this.validationList.forEach((validation: JBTextareaValidationItem) => {
      const res = this.checkValidation(inputText, validation);
      validationResult.validationList.push(res);
      if (!res.isValid) {
        validationResult.isAllValid = false;
      }
    });
    return validationResult;
  }
  checkValidation(text: string, validation: JBTextareaValidationItem) {
    let testRes = true;
    if (validation.validator instanceof RegExp) {
      testRes = validation.validator.test(text);
      validation.validator.lastIndex = 0;
    }
    if (typeof validation.validator == "function") {
      testRes = validation.validator(text);
    }
    if (!testRes) {
      return {
        isValid: false,
        message: validation.message,
        validation: validation
      };
    }
    return {
      isValid: true,
      message: '',
      validation: validation
    };
  }
  showValidationError(error: string) {
    this.validation = {
      isValid: false,
      message: error
    };
    this.#elements.messageBox.innerHTML = error;
    this.#elements.messageBox.classList.add('error');
  }
  clearValidationError() {
    this.validation = {
      isValid: true,
      message: null
    };
    const text = this.getAttribute('message') || '';
    this.#elements.messageBox.innerHTML = text;
    this.#elements.messageBox.classList.remove('error');
  }
}

const myElementNotExists = !customElements.get('jb-textarea');
if (myElementNotExists) {
  //prevent duplicate registering
  window.customElements.define('jb-textarea', JBTextareaWebComponent);
}