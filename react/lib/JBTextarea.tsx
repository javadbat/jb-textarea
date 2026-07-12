'use client'
/* eslint-disable no-inner-declarations */
import React, { useRef, useImperativeHandle, type PropsWithChildren } from 'react';
import 'jb-textarea';
// eslint-disable-next-line no-duplicate-imports
import type {JBTextareaWebComponent} from 'jb-textarea';
import { type EventProps, useEvents } from './events-hook.js';
import { type JBTextareaAttributes, useJBTextareaAttribute } from './attributes-hook.js';
import type { JBElementStandardProps } from 'jb-core/react';
import './module-declaration.js';

// eslint-disable-next-line react/display-name
const JBTextarea = React.forwardRef((props:Props, ref) => {
  {
    //we set this state so when ref change we have a render and our event listener will be updated
    const element = useRef<JBTextareaWebComponent>(null);
    useImperativeHandle(ref, () => element.current ?? undefined, [element]);
    const {onBeforeInput,onBlur,onChange,onEnter,onFocus,onInput,onKeyDown,onKeyUp,onInit,onLoad, placeholder, name,autoHeight,disabled,error,initialValue,required,validationList,value,...otherProps} = props;
    useJBTextareaAttribute(element, {autoHeight,disabled,error,required,validationList});
    useEvents(element,{onBeforeInput,onBlur,onChange,onEnter,onFocus,onInput,onKeyDown,onKeyUp,onInit,onLoad});
    return (
      <jb-textarea ref={element} value={value ?? ""} initialValue={initialValue ?? ""} name={name} label={props.label} message={props.message} placeholder={placeholder} {...otherProps}>
        {props.children}
      </jb-textarea>
    );
  }
});

type JBTextareaProps = EventProps & JBTextareaAttributes & {
    label?: string,
    message?:string,
    name?:string,
    placeholder?:string
    value?: string | null,
    initialValue?: string | null,
}
export type Props = PropsWithChildren<JBTextareaProps> & JBElementStandardProps<JBTextareaWebComponent, keyof JBTextareaProps>;
export {JBTextarea};
