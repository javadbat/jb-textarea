# jb-textarea
simple textarea web component
## usage
```cmd
npm i jb-textarea
```
```html
<jb-textarea label="توضیحات" value="" message="متن زیر باکس"></jb-textarea>
```
## get and set value

```js
document.querySelector("jb-textarea").value;
// retun inputed text
document.querySelector("jb-textarea").value = "salam";
set value to salam
```
### events

```js
document.querySelector("jb-textarea").addEventListener('change',changeFunc);
```

### set custome style

in some cases in your project you need to change defualt style of web-component for example you need zero margin or different border-radius and etc.    
if you want to set a custom style to this web-component all you need is to set css variable in parent scope of web-component 
| css variable name                     | description                                                                                   |
| -------------                         | -------------                                                                                 |
| --jb-textarea-margin                  | web-component margin defualt is `0 12px`                                                      |
| --jb-textarea-border-radius           | web-component border-radius defualt is `16px`                                                 |
| --jb-textarea-border-width            | web-component border-width defualt is `1px`                                                 |
| --jb-textarea-border-color            | border color of select in normal mode                                                         |
| --jb-textarea-border-color-focus      | border color of select in normal mode                                                         |
| --jb-textarea-bgcolor                 | background color of input                                                                     |
| --jb-textarea-border-botton-width     | border bottom thickness desualt is `3px`                                                      |
| --jb-textarea-label-font-size         | font size of input label defualt is `0.8em`                                                   |
| --jb-textarea-message-font-size       | font size of message we show under input                                                      |
| --jb-textarea-message-error-color     | change color of error we show under input defualt is `red`                                    |