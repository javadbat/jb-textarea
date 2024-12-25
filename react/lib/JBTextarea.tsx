/* eslint-disable no-inner-declarations */
import React, { useRef, useEffect, useImperativeHandle, useState, CSSProperties } from 'react';
import 'jb-textarea';
// eslint-disable-next-line no-duplicate-imports
import {JBTextareaWebComponent, type ValidationValue} from 'jb-textarea';
import { useEvent } from '../../../common/hooks/use-event.js';
import { type ValidationItem } from "jb-validation";
declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace JSX {
      interface IntrinsicElements {
        'jb-textarea': JBTextareaType;
      }
      interface JBTextareaType extends React.DetailedHTMLProps<React.HTMLAttributes<JBTextareaWebComponent>, JBTextareaWebComponent> {
        class?:string,
        label?: string,
        name?:string,
        message?:string,
        placeholder?:string,
        // ref:React.RefObject<JBDateInputWebComponent>,
      }
    }
}
// eslint-disable-next-line react/display-name
const JBTextarea = React.forwardRef((props:JBTextareaProps, ref) => {
  {
    //we set this state so when ref change we have a render and our event listener will be updated
    const [refChangeCount , refChangeCountSetter] = useState(0);
    const element = useRef<JBTextareaWebComponent>(null);
    useImperativeHandle(
      ref,
      () => (element ? element.current : {}),
      [element],
    );
    useEffect(()=>{
      refChangeCountSetter(refChangeCount+1);
    },[element.current]);
    function onChange(e:JBTextareaEventType<Event>) {
      if (props.onChange) {
        props.onChange(e);
      }
    }
    function onKeydown(e:JBTextareaEventType<KeyboardEvent>) {
      if (props.onKeydown) {
        props.onKeydown(e);
      }
    }
    function onInput(e:JBTextareaEventType<InputEvent>) {
      if (props.onInput) {
        props.onInput(e);
      }
    }
    function onKeyup(e:JBTextareaEventType<KeyboardEvent>) {
      if (props.onKeyup) {
        props.onKeyup(e);
      }
    }
    function onFocus(e:JBTextareaEventType<FocusEvent>) {
      if (props.onFocus && e instanceof FocusEvent) {
        props.onFocus(e);
      }
    }
    function onBlur(e:JBTextareaEventType<FocusEvent>) {
      if (props.onBlur && e instanceof FocusEvent) {
        props.onBlur(e);
      }
    }
    useEffect(() => {
      const value:string = props.value || '';
      if(element.current){
        element.current.value = value;
      }
    }, [props.value]);

    useEffect(() => {
      if(element.current){
        element.current.validation.list = props.validationList || [];
      }
    }, [props.validationList]);
    useEffect(() => {
      if(element.current && props.required!== undefined){
        props.required?element.current.setAttribute("required",''):element.current.removeAttribute("required");
      }
    }, [props.required]);

    useEffect(() => {
      if(element.current){
        element.current.autoHeight = props.autoHeight || false;
      }
    }, [props.autoHeight]);
    useEvent(element.current, 'change', onChange);
    useEvent(element.current, 'keydown', onKeydown);
    useEvent(element.current, 'input', onInput);
    useEvent(element.current, 'keyup', onKeyup);
    useEvent(element.current, 'focus', onFocus);
    useEvent(element.current, 'blur', onBlur);
    return (
      <jb-textarea placeholder={props.placeholder} class={props.className} style={props.style} ref={element} label={props.label} message={props.message} name={props.name}></jb-textarea>
    );
  }
});
export type JBTextareaEventType<T> = T & {
    target: JBTextareaWebComponent
}
type JBTextareaProps = {
    label?: string,
    value?: string | null | undefined,
    onChange?: (e:JBTextareaEventType<Event>)=>void,
    onFocus?:(e:JBTextareaEventType<FocusEvent>)=>void,
    onBlur?:(e:JBTextareaEventType<FocusEvent>)=>void,
    onKeydown?: (e:JBTextareaEventType<KeyboardEvent>)=>void,
    onKeyup?: (e:JBTextareaEventType<KeyboardEvent>)=>void,
    onInput?: (e:JBTextareaEventType<InputEvent>)=>void,
    onBeforeinput?: (e:JBTextareaEventType<InputEvent>)=>void,
    placeholder?:string,
    className?: string,
    style?:CSSProperties,
    validationList?:ValidationItem<ValidationValue>[],
    autoHeight?: boolean,
    message?:string,
    name?:string,
    required?:boolean
}
export {JBTextarea};