import { useEvent } from "jb-core/react";
import { RefObject } from "react";
import type { JBTextareaWebComponent, JBTextareaEventType } from 'jb-textarea';

export type EventProps = {
  /**
   * when component loaded, in most cases component is already loaded before react mount so you dont need this but if you load web-component dynamically with lazy load it will be called after react mount
   */
  onLoad?: (e: JBTextareaEventType<CustomEvent>) => void,
  /**
 * when all property set and ready to use, in most cases component is already loaded before react mount so you dont need this but if you load web-component dynamically with lazy load it will be called after react mount
 */
  onInit?: (e: JBTextareaEventType<CustomEvent>) => void,
  onChange?: (e: JBTextareaEventType<Event>) => void,
  onFocus?: (e: JBTextareaEventType<FocusEvent>) => void,
  onBlur?: (e: JBTextareaEventType<FocusEvent>) => void,
  onKeyDown?: (e: JBTextareaEventType<KeyboardEvent>) => void,
  onKeyUp?: (e: JBTextareaEventType<KeyboardEvent>) => void,
  onInput?: (e: JBTextareaEventType<InputEvent>) => void,
  onBeforeInput?: (e: JBTextareaEventType<InputEvent>) => void,
  onEnter?: (e: JBTextareaEventType<KeyboardEvent>) => void,

}
export function useEvents(element: RefObject<JBTextareaWebComponent>, props: EventProps) {
  useEvent(element, 'load', props.onLoad, true);
  useEvent(element, 'init', props.onInit, true);
  useEvent(element, 'change', props.onChange);
  useEvent(element, 'keydown', props.onKeyDown);
  useEvent(element, 'input', props.onInput);
  useEvent(element, 'beforeinput', props.onBeforeInput);
  useEvent(element, 'keyup', props.onKeyUp);
  useEvent(element, 'focus', props.onFocus);
  useEvent(element, 'blur', props.onBlur);
  useEvent(element, 'enter', props.onEnter);
}