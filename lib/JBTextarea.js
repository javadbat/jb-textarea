import HTML from './JBTextarea.html';
import CSS from './JBTextarea.scss';
class JBTextareaWebComponent extends HTMLElement {
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
        this._textareaElement.value = value;
        if(this.autoHeight){
            this.changeHeightToContentSize();
        }
    }
    constructor() {
        super();
        this.initWebComponent();
        this.initProp();
    }
    initWebComponent() {
        this._shadowRoot = this.attachShadow({
            mode: 'open'
        });
        this._html = `<style>${CSS}</style>` + '\n' + HTML;
        this._element = document.createElement('template');
        this._element.innerHTML = this._html;
        this._shadowRoot.appendChild(this._element.content.cloneNode(true));
        this._textareaElement = this._shadowRoot.querySelector('.textarea-box textarea');
        this.registerEventListener();
    }
    registerEventListener() {
        this._textareaElement.addEventListener('change', this.onInputChange.bind(this));
        this._textareaElement.addEventListener('keypress', this.onInputKeyPress.bind(this));
        this._textareaElement.addEventListener('keyup', this.onInputKeyup.bind(this));
        this._textareaElement.addEventListener('keydown', this.onInputKeyDown.bind(this));
        this._textareaElement.addEventListener('input', this.onInputInput.bind(this));
    }
    initProp() {
        this.validationList = [];
        this.value = this.getAttribute('value') || '';
        this.autoHeight = false;
        this.validation = {
            isValid: null,
            message: null
        };
    }
    static get observedAttributes() {
        return ['label', 'message', 'value', 'placeholder'];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        // do something when an attribute has changed
        this.onAttributeChange(name, newValue);
    }
    onAttributeChange(name, value) {
        switch (name) {
            case 'label':
                this._shadowRoot.querySelector('label .label-value').innerHTML = value;
                if(value == null || value == undefined || value == ""){
                    this._shadowRoot.querySelector('label').classList.add('--hide');
                }else{
                    this._shadowRoot.querySelector('label').classList.remove('--hide');
                }
                break;
            case 'message':
                this._shadowRoot.querySelector('.message-box').innerHTML = value;
                break;
            case 'placeholder':
                this._textareaElement.setAttribute('placeholder', value);
                break;
            case 'value':
                this.value = value;
                break;
        }

    }
    changeHeightToContentSize() {
        this._textareaElement.style.height = "4px";
        this._textareaElement.style.height = (this._textareaElement.scrollHeight)+"px";
    }
    onInputKeyDown(e){
        const keyDownnInitObj = {
            key:e.key,
            keyCode:e.keyCode,
            code:e.code,
            ctrlKey:e.ctrlKey,
            shiftKey:e.shiftKey,
            altKey:e.altKey,
            charCode:e.charCode,
            which:e.which
        };
        const event = new KeyboardEvent("keydown",keyDownnInitObj);
        this.dispatchEvent(event);
    }
    onInputKeyPress() {
        //TODO: raise keypress event
        const event = new CustomEvent('keypress');
        this.dispatchEvent(event);
    }
    onInputInput(){
        if(this.autoHeight){
            this.changeHeightToContentSize();
        }
    }
    onInputKeyup(e) {
        const inputText = e.target.value;
        //here is the rare  time we update _value directly becuase we want trigger event that may read value directly from dom
        this._value = inputText;
        this.triggerInputValidation(false);
        const keyUpInitObj = {
            key:e.key,
            keyCode:e.keyCode,
            code:e.code,
            ctrlKey:e.ctrlKey,
            shiftKey:e.shiftKey,
            altKey:e.altKey,
            charCode:e.charCode,
            which:e.which,
        };
        const event = new KeyboardEvent('keyup',keyUpInitObj);
        this.dispatchEvent(event);
    }
    onInputChange(e) {
        const inputText = e.target.value;
        this.triggerInputValidation(true);
        //here is the rare  time we update _value directly becuase we want trigger event that may read value directly from dom
        this._value = inputText;
        const validationObject = this.checkInputValidation(inputText);
        const event = new CustomEvent('change',{
            detail: {
                isValid: validationObject.isAllValid,
                validationObject:validationObject,
            },
        });
        this.dispatchEvent(event);
    }
    triggerInputValidation(showError = true) {
        // this method is for use out of component  for example if user click on submit button and developer want to check if all fields are valid
        //takeAction determine if we want to show user error in web component difualtManner or developer will handle it by himself
        const inputText = this._textareaElement.value;
        const validationResult = this.checkInputValidation(inputText);
        if (showError == true && !validationResult.isAllValid) {
            const firstFault = validationResult.validationList.find(x => !x.isValid);
            this.showValidationError(firstFault.message);
        } else if (validationResult.isAllValid) {
            this.clearValidationError();
        }
        return validationResult;
    }
    checkInputValidation(inputText){
        const validationResult = {
            validationList: [],
            isAllValid: true
        };
        this.validationList.forEach((validation) => {
            const res = this.checkValidation(inputText, validation);
            validationResult.validationList.push(res);
            if (!res.isValid) {
                validationResult.isAllValid = false;
            }
        });
        return validationResult;
    }
    checkValidation(text, validation) {
        var testRes = validation.validator.test(text);
        validation.validator.lastIndex = 0;
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
    showValidationError(error) {
        this.validation = {
            isValid: false,
            message: error
        };
        this._shadowRoot.querySelector('.message-box').innerHTML = error;
        this._shadowRoot.querySelector('.message-box').classList.add('error');
    }
    clearValidationError() {
        this.validation = {
            isValid: true,
            message: null
        };
        const text = this.getAttribute('message') || '';
        this._shadowRoot.querySelector('.message-box').innerHTML = text;
        this._shadowRoot.querySelector('.message-box').classList.remove('error');
    }
}

const myElementNotExists = !customElements.get('jb-textarea');
if(myElementNotExists){
    //prevent duplicate registering
    window.customElements.define('jb-textarea', JBTextareaWebComponent);
}