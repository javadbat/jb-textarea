# jb-textarea-react

simple textarea react component to input long text

- lightweight
- zero dependency
- help you manage validation in easy way
- config auto height grow ability with max height

Demo : [codeSandbox preview](https://3f63dj.csb.app/samples/jb-textarea) for just see the demo and [codeSandbox editor](https://codesandbox.io/p/sandbox/jb-design-system-3f63dj?file=%2Fsrc%2Fsamples%2FJBTextarea.tsx) if you want to see and play with code

## installation and setup

```cmd
npm i jb-textarea-react
```

```jsx
import {JBTextarea} from 'jb-textarea-react';

<JBTextarea label="label" value={valueState} message="text under the box"></JBTextarea>
```

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
    <JBInput validationList={validationList}></JBInput>
```

## check validation

you can check if an input value meet your validation standard by creating a ref of the element using `React.createRef()`.
```javascript
    const elementRef = React.createRef();
    const isValid = elementRef.current.validation.checkValidity(true).isAllValid;
```
if `isValid` is `true` the value of input is valid.


## events

```js
<JBTextarea  onChange={(e)=>{}}></JBTextarea>
<JBTextarea  onKeydown={(e)=>{}}></JBTextarea>
<JBTextarea  onKeyup={(e)=>{}}></JBTextarea>
<JBTextarea  onKeypress={(e)=>{}}></JBTextarea>
<JBTextarea  onInput={(e)=>{}}></JBTextarea>
```

## auto height grow

you can set `autoHeight` to true so when user type something and text overflow a textarea height component will grow by itself in boundary of `--jb-textarea-min-height` and `--jb-textarea-max-height` that you set by css variable 

```js
<JBTextarea  autoHeight></JBTextarea>
```

the good point of set boundary with css variable is you can set different min or max base on device by CSS media queries.

## set custom style

in some cases in your project you need to change default style of web-component for example you need zero margin or different border-radius and etc.    
if you want to set a custom style to this web-component all you need is to set css variable in parent scope of web-component 
| css variable name                     | description                                                                                   |
| -------------                         | -------------                                                                                 |
| --jb-textarea-margin                  | web-component margin default is `0 12px`                                                      |
| --jb-textarea-border-radius           | web-component border-radius default is `16px`                                                 |
| --jb-textarea-border-width            | web-component border-width default is `1px`                                                   |
| --jb-textarea-border-color            | border color of select in normal mode                                                         |
| --jb-textarea-border-color-focus      | border color of select in normal mode                                                         |
| --jb-textarea-bgcolor                 | background color of input                                                                     |
| --jb-textarea-border-botton-width     | border bottom thickness default is `3px`                                                      |
| --jb-textarea-label-font-size         | font size of input label default is `0.8em`                                                   |
| --jb-textarea-value-font-size         | font size of input value default is `1.1em`                                                   |
| --jb-textarea-value-color             | color of value default in `initial`                                                           |
| --jb-textarea-message-font-size       | font size of message we show under input                                                      |
| --jb-textarea-message-error-color     | change color of error we show under input default is `red`                                    |
| --jb-textarea-min-height              | minimum height of text area default is `80px`                                                 |
| --jb-textarea-max-height              | minimum height of text area default is `none`                                                 |
| --jb-textarea-placeholder-color       | placeholder color default is 'initial'                                                        |
| --jb-textarea-placeholder-font-size   | placeholder font-size default is `initial`                                                    |
| --jb-textarea-label-color             | label color default is `#1f1735`                                                              |    
| --jb-textarea-value-color             | value color                                                                                   |

## Other Related Docs:

- see [jb-textarea](https://github.com/javadbat/jb-textarea) if you want to use this component as a web-component in other frameworks.

- see [All JB Design system Component List](https://github.com/javadbat/design-system/blob/master/docs/component-list.md) for more components.

- use [Contribution Guide](https://github.com/javadbat/design-system/blob/master/docs/contribution-guide.md) if you want to contribute in this component.