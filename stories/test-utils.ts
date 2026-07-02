import type { JBTextareaWebComponent } from 'jb-textarea';
import { expect, waitFor } from 'storybook/test';

export function getTextarea(canvasElement: HTMLElement, index = 0) {
  const textarea = canvasElement.querySelectorAll<JBTextareaWebComponent>('jb-textarea')[index];
  expect(textarea).toBeTruthy();
  expect(textarea!.shadowRoot).toBeTruthy();
  return textarea!;
}

export function getNativeTextarea(textarea: JBTextareaWebComponent) {
  const nativeTextarea = textarea.shadowRoot?.querySelector<HTMLTextAreaElement>('textarea');
  expect(nativeTextarea).toBeTruthy();
  return nativeTextarea!;
}

export function getMessageText(textarea: JBTextareaWebComponent) {
  return textarea.shadowRoot?.querySelector<HTMLElement>('.message-box')?.textContent ?? '';
}

export function getLabelText(textarea: JBTextareaWebComponent) {
  return textarea.shadowRoot?.querySelector<HTMLElement>('.label-value')?.textContent ?? '';
}

export function getSlotWrapper(textarea: JBTextareaWebComponent, className: string) {
  const wrapper = textarea.shadowRoot?.querySelector<HTMLElement>(className);
  expect(wrapper).toBeTruthy();
  return wrapper!;
}

export async function waitForTextareaValue(textarea: JBTextareaWebComponent, value: string) {
  await waitFor(() => {
    expect(textarea.value).toBe(value);
    expect(getNativeTextarea(textarea).value).toBe(value);
  });
}

export async function appendEventTextarea(canvasElement: HTMLElement) {
  const events: string[] = [];
  const textarea = document.createElement('jb-textarea') as JBTextareaWebComponent;

  textarea.setAttribute('required', '');
  textarea.setAttribute('label', 'event textarea');

  for (const eventName of ['beforeinput', 'input', 'keydown', 'keypress', 'keyup', 'enter', 'change', 'invalid']) {
    textarea.addEventListener(eventName, () => events.push(eventName));
  }

  canvasElement.appendChild(textarea);

  await waitFor(() => {
    expect(getNativeTextarea(textarea)).toBeTruthy();
  });

  return { textarea, events };
}
