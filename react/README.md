# jb-textarea-react

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/jb-textarea)
[![GitHub license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://raw.githubusercontent.com/javadbat/jb-textarea/main/LICENSE)
[![NPM Version](https://img.shields.io/npm/v/jb-textarea-react)](https://www.npmjs.com/package/jb-textarea-react)
![GitHub Created At](https://img.shields.io/github/created-at/javadbat/jb-textarea)

simple textarea react component to input long text

- lightweight
- zero dependency
- help you manage validation in easy way
- config auto height grow ability with max height

- [codeSandbox preview](https://3f63dj.csb.app/samples/jb-textarea) for just see the demo and [codeSandbox editor](https://codesandbox.io/p/sandbox/jb-design-system-3f63dj?file=%2Fsrc%2Fsamples%2FJBTextarea.tsx) if you want to see and play with code

Storybook: [JBTextarea docs](https://javadbat.github.io/design-system/?path=/docs/components-form-elements-jbtextarea)

## Installation
```sh
npm i jb-textarea-react
```

```jsx
import {JBTextarea} from 'jb-textarea/react';

<JBTextarea label="label" value={valueState} message="text under the box"></JBTextarea>
```

## When to use

Use `JBTextarea` when the user needs to enter multi-line text, long descriptions, comments, notes, or any free-form text that can span multiple lines.

## Props

| prop | type | description |
| --- | --- | --- |
| `value` | `string \| null \| undefined` | Controlled textarea value. `null` and `undefined` are normalized to an empty string. |
| `label` | `string` | Visible label text and accessible label. |
| `message` | `string` | Helper text shown when no validation error is visible. |
| `name` | `string` | Form field name. |
| `placeholder` | `string` | Placeholder forwarded to the inner textarea. |
| `validationList` | `ValidationItem<ValidationValue>[]` | Custom validation rules from `jb-validation`. |
| `autoHeight` | `boolean` | Lets the textarea grow between configured min and max height. |
| `required` | `boolean` | Enables required validation. |
| `error` | `string` | External validation error message. |
| `disabled` | `boolean` | Disables the textarea. |

## get and set value

```jsx
<JBTextarea label="label" value={valueState} onChange={(e)=>{setValueState(e.target.value)}}></JBTextarea>
```
## set validation

you can set validation to your input by creating a validationList array and passing in to validationList props:

``` javascript
    const validationList = [
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
```
```jsx
    <JBTextarea validationList={validationList}></JBTextarea>
```

## check validation

you can check if an input value meet your validation standard by creating a ref of the element using `React.createRef()`.
```javascript
    const elementRef = React.createRef();
    const isValid = elementRef.current.validation.checkValidity(true).isAllValid;
```
if `isValid` is `true` the value of input is valid.


## Events
```JSX
<JBTextarea  onChange={(e)=>{}}></JBTextarea>
<JBTextarea  onKeyDown={(e)=>{}}></JBTextarea>
<JBTextarea  onKeyUp={(e)=>{}}></JBTextarea>
<JBTextarea  onBeforeInput={(e)=>{}}></JBTextarea>
<JBTextarea  onInput={(e)=>{}}></JBTextarea>
<JBTextarea  onFocus={(e)=>{}}></JBTextarea>
<JBTextarea  onBlur={(e)=>{}}></JBTextarea>
// custom event for when user press enter
<JBTextarea  onEnter={(e)=>{}}></JBTextarea>
```

| prop | event |
| --- | --- |
| `onChange` | `change` |
| `onInput` | `input` |
| `onBeforeInput` | `beforeinput` |
| `onKeyDown` | `keydown` |
| `onKeyUp` | `keyup` |
| `onFocus` | `focus` |
| `onBlur` | `blur` |
| `onEnter` | `enter` |
| `onLoad` | `load` |
| `onInit` | `init` |

## auto height grow

you can set `autoHeight` to true so when user type something and text overflow a textarea height component will grow by itself in boundary of `--jb-textarea-min-height` and `--jb-textarea-max-height` that you set by CSS variable 

```js
<JBTextarea  autoHeight></JBTextarea>
```

the good point of set boundary with CSS variable is you can set different min or max based on device by CSS media queries.

## set custom style

 see see [jb-textarea](https://github.com/javadbat/jb-textarea) document. there is no difference between these 2 in styling.


## Shared Documentation

For web-component behavior, events, slots, and CSS variables, see [`jb-textarea`](https://github.com/javadbat/jb-textarea).

## Related Docs
- see [jb-textarea](https://github.com/javadbat/jb-textarea) if you want to use this component as a web-component in other frameworks.

- see [All JB Design system Component List](https://javadbat.github.io/design-system/) for more components.

- use [Contribution Guide](https://github.com/javadbat/design-system/blob/main/docs/contribution-guide.md) if you want to contribute in this component.

## AI agent notes

- Import `JBTextarea` from `jb-textarea/react`; the wrapper imports and registers the underlying `jb-textarea` web component.
- Use `value` for controlled text and `onChange` or `onInput` to update React state.
- Use `autoHeight` for growing textareas and CSS variables for min/max height.
- Use exact React prop casing such as `onKeyDown`, `onKeyUp`, and `onBeforeInput`.
- Use `error` for externally controlled validation errors.
