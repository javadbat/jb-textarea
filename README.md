# jb-textarea

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/jb-textarea)
[![GitHub license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://raw.githubusercontent.com/javadbat/jb-textarea/main/LICENSE)
[![NPM Version](https://img.shields.io/npm/v/jb-textarea)](https://www.npmjs.com/package/jb-textarea)
![GitHub Created At](https://img.shields.io/github/created-at/javadbat/jb-textarea)

Simple textarea web component to input long text

- lightweight
- zero dependency
- advance validation with [jb-validation](https://github.com/javadbat/jb-validation) module
- help you manage validation in easy way
- config auto height grow ability with max height
- web component so you can use it with any framework you need

## When to use

Use `jb-textarea` when the user needs to enter multi-line text, long descriptions, comments, notes, or any free-form text that can span multiple lines.

Use `jb-input` for single-line text fields.

## Demo

- [storybook](https://javadbat.github.io/design-system/?path=/docs/components-form-elements-jbtextarea)
- [codepen](https://codepen.io/javadbat/pen/poRZVXe)

## Using With JS Frameworks
- [<img src="https://img.shields.io/badge/React.js-jb--textarea%2Freact-000.svg?logo=react&logoColor=%2361DAFB" height="30" />](https://github.com/javadbat/jb-textarea/tree/main/react)

## Installation

```sh
npm i jb-textarea
```

```html
<jb-textarea label="description" value="" message="text under the textarea box"></jb-textarea>
```

## API reference

### Attributes

| name | type | default | description |
| --- | --- | --- | --- |
| [`value`](#get-and-set-value) | `string` | `""` | Initial textarea value from markup. Prefer the property for runtime updates. |
| `label` | `string` | `""` | Visible label text and accessible aria label. |
| `message` | `string` | `""` | Helper text shown below the textarea when no validation error is visible. |
| `name` | `string` | `""` | Form field name. |
| `placeholder` | `string` | `""` | Placeholder forwarded to the inner textarea. |
| [`required`](#set-validation) | `boolean` | `false` | Enables required validation. |
| [`error`](#set-validation) | `string` | `""` | External validation error message. |

### Properties

| name | type | readonly | description |
| --- | --- | --- | --- |
| [`value`](#get-and-set-value) | `string` | no | Canonical textarea value submitted with forms. |
| [`autoHeight`](#auto-height-grow) | `boolean` | no | Lets the textarea grow between configured min and max height. |
| `validation` | `ValidationHelper<string>` | yes | Validation helper from `jb-validation`; set `validation.list` for custom rules. |
| `disabled` | `boolean` | no | Disables the inner textarea and sets the `disabled` custom state. |
| `required` | `boolean` | no | Enables required validation. |
| `initialValue` | `string` | no | Baseline value used by `isDirty`. |
| `isDirty` | `boolean` | yes | `true` when current `value` differs from `initialValue`. |
| `validationMessage` | `string` | yes | Current native validation message from `ElementInternals`. |

### Methods

| name | returns | description |
| --- | --- | --- |
| `checkValidity()` | `boolean` | Runs validation without showing the error message. Dispatches `invalid` when invalid. |
| `reportValidity()` | `boolean` | Runs validation and shows the first error message. Dispatches `invalid` when invalid. |

## get and set value

```js
document.querySelector("jb-textarea").value;
// return inputted text
document.querySelector("jb-textarea").value = "hello";
set value to hello
```
### set validation

jb-textarea use [jb-validation](https://github.com/javadbat/jb-validation) inside to handle validation so for more information you can read it's documentation.  
for simple usage you can set validation to your input:

```js
//you have 2 ways: 
//1- set list directly 
    description.validation.list = [
        {
            validator: /.{3}/g,
            message: 'description must have 3 char at least'
        },
    //you can use function as a validator too
        {
            validator: (valueString)=>{return valueString == "hello"},
            message: 'you can only type hello in the box'
        },
    //you can also return string in validator if you want custom error message in some edge cases
        {
            validator: (valueString)=>{
               if(valueString.includes("*")){
                return 'you cant write * in your text'
               }
               return true;
            },
            message: 'default error when return false'
        },
    ];
//2- pass a function that returns the validation list so on each validation process we execute your callback function and get the needed validation list
const result = document.querySelector('jb-textarea').validation.addValidationListGetter(getterFunction)
```

### check validation

like any other jb design system you can access validation by `validation` property:

```js
//access validation module
document.querySelector('jb-textarea').validation
// check if input pass all the validations. showError is a boolean that determine your intent to show error to user on invalid status.
const result = document.querySelector('jb-textarea').validation.checkValidity({showError})

```

## Events

| event | cancelable | when it fires |
| --- | --- | --- |
| `input` | native behavior | On each user edit after `value` is updated. |
| `beforeinput` | yes | Before the inner textarea value changes. Call `event.preventDefault()` to block the edit. |
| `change` | yes | When the user commits the textarea value. |
| `keydown` | yes | Re-dispatched from the inner textarea. |
| `keyup` | yes | Re-dispatched from the inner textarea. |
| `keypress` | yes | Re-dispatched from the inner textarea. |
| `enter` | yes | From `keypress` when Enter is pressed. |
| `invalid` | no | When `checkValidity()` or `reportValidity()` finds an invalid value. |

```js
document.querySelector("jb-textarea").addEventListener('change',func);
document.querySelector("jb-textarea").addEventListener('keydown',func);
document.querySelector("jb-textarea").addEventListener('keyup',func);
document.querySelector("jb-textarea").addEventListener('keypress',func);
document.querySelector("jb-textarea").addEventListener('input',func);
// custom Keyboard event that raise when user press enter (unlike jb-input this enter event raise after keypress because it could be cancelled with prevent default)
document.querySelector("jb-textarea").addEventListener('enter',func);
```

## auto height grow

you can set `autoHeight` to true so when user type something and text overflow a textarea height component will grow by itself in boundary of `--jb-textarea-min-height` and `--jb-textarea-max-height` that you set by CSS variable 

```js
document.querySelector("jb-textarea").autoHeight = true;
```

the good point of set boundary with CSS variable is you can set different min or max based on device by CSS media queries.

## set custom style
you have 2 way to customize style,

1. using selectors like`:states` or `::part` selector
```css
jb-textarea::part(label){
  font-size: 2rem;
}
jb-textarea:states(invalid)::part(label){
  color:red;
}
jb-textarea:states(invalid)::part(textarea-box){
  border-color:red;
}
jb-textarea:states(disabled)::part(textarea){
  cursor:not-allowed;
}
```
we have `label`, `textarea-box`, `textarea`, `message`, `inline-start-section-wrapper`, `inline-end-section-wrapper`, `block-start-section-wrapper`, and `block-end-section-wrapper` as supported parts in our component. you can also combine them with `disabled`, `invalid` states for different style in different states.

2. using CSS variable

| CSS variable name                     | description                                                                                   |
| -------------                         | -------------                                                                                 |
| --jb-textarea-margin                  | web-component margin default is `0 0.75rem`                                                      |
| --jb-textarea-border-radius           | web-component border-radius                                                                   |
| --jb-textarea-border-width            | web-component border-width default is `1px`                                                   |
| --jb-textarea-border-color            | border color of select in normal mode                                                         |
| --jb-textarea-border-color-disabled   | border color when disabled                                                                    |
| --jb-textarea-border-color-focus      | border color of select in normal mode                                                         |
| --jb-textarea-bg-color                 | background color of input                                                                     |
| --jb-textarea-bg-color-disabled        | background color of input when disabled                                                       |
| --jb-textarea-border-bottom-width     | border bottom thickness default is `3px`                                                      |
| --jb-textarea-label-font-size         | font size of input label default is `0.8em`                                                   |
| --jb-textarea-value-font-size         | font size of input value default is `1.1em`                                                   |
| --jb-textarea-value-color             | color of value                                                                                |
| --jb-textarea-value-color-disabled    | color of value when disabled                                                                  |
| --jb-textarea-message-font-size       | font size of message we show under input                                                      |
| --jb-textarea-message-color-error     | change color of error we show under input                                                     |
| --jb-textarea-min-height              | minimum height of text area default is `5rem`                                                 |
| --jb-textarea-max-height              | minimum height of text area default is `none`                                                 |
| --jb-textarea-placeholder-color       | placeholder color default is 'initial'                                                        |
| --jb-textarea-placeholder-font-size   | placeholder font-size default is `initial`                                                    |
| --jb-textarea-label-color             | label color                                                                                   |    
| --jb-textarea-label-color-disabled    | label color when disabled                                                                     |
| --jb-textarea-box-overflow | Customize box overflow. |
| --jb-textarea-height | Customize height. |
| --jb-textarea-input-padding | Customize input padding. |
| --jb-textarea-label-margin | Customize label margin. |
| --jb-textarea-message-color | Customize message color. |

## add custom element in textarea box

in jb-textarea you can put icon or any other custom html DOM in textarea box. to doing so you just have to place custom DOM in `jb-textarea` tag and add `slot="inline-start-section"` or `slot="inline-end-section"` or `slot="block-start-section"` or `slot="block-end-section"` to place it before or after input field.

| slot | description |
| --- | --- |
| `inline-start-section` | Inline content before the textarea. |
| `inline-end-section` | Inline content after the textarea. |
| `block-start-section` | Block content above the textarea inside the textarea box. |
| `block-end-section` | Block content below the textarea inside the textarea box. |

example:

```HTML
<jb-textarea>
    <div slot="inline-start-section">before</div>
    <div slot="inline-end-section">after</div>
    <div slot="block-start-section">in Top</div>
    <div slot="block-end-section">in Bottom</div>
</jb-textarea>
```

## Accessibility notes

- The component is form-associated and submits `value` as its form value.
- `label` is exposed as the component aria label.
- `message` is exposed as the component aria description when no validation error is visible.
- `placeholder` is forwarded to the inner textarea and exposed as aria placeholder.
- `disabled`, `invalid`, and validation state are synchronized with `ElementInternals` where the browser supports it.
- The shadow root uses `delegatesFocus`, so focusing `<jb-textarea>` focuses the inner native textarea.

## Related Docs
- see [`jb-textarea/react`](https://github.com/javadbat/jb-textarea/tree/main/react) if you want to use this component in react.

- see [All JB Design system Component List](https://javadbat.github.io/design-system/) for more components.

- use [Contribution Guide](https://github.com/javadbat/design-system/blob/main/docs/contribution-guide.md) if you want to contribute in this component.

## AI agent notes

This package includes [`custom-elements.json`](./custom-elements.json) so documentation tools, IDEs, and AI coding agents can discover the tag name, attributes, properties, events, slots, CSS parts, CSS variables, and public methods.

The package also exposes `"customElements": "custom-elements.json"` in `package.json`, which gives tools a stable package-level pointer to the manifest. This field is documented by the Custom Elements Manifest project in its [Referencing manifests from npm packages](https://github.com/webcomponents/custom-elements-manifest#referencing-manifests-from-npm-packages) section.

In `custom-elements.json`, the `exports` array describes what this module makes available:

| kind | meaning |
| --- | --- |
| `js` | A JavaScript/TypeScript export from the module, such as `JBTextareaWebComponent`. |
| `custom-element-definition` | The custom element registration for a tag name, such as `jb-textarea`. |

- Import `jb-textarea` once before using `<jb-textarea>`.
- Use `jb-textarea` for multi-line text and `jb-input` for single-line text.
- Use `.value` for the canonical submitted text.
- Use `autoHeight` when the textarea should grow with content, and control bounds with `--jb-textarea-min-height` and `--jb-textarea-max-height`.
- Set `error` for externally controlled validation errors; the component observes the attribute and updates its validation UI.
