import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { TailwindElement } from '../shared/tailwind.element';
import style from "./form-field.component.css?inline";

export interface ValidationError {
  message: string;
  errors:  Errors;
}

export interface Errors {
  [key: string]: string[];
}


@customElement('app-form-field')
export default class FormField extends TailwindElement(style) {
  // Declare reactive properties
  @property()
  name: string = '';

  @property()
  label: string = '';
  
  @property()
  errors: ValidationError | null = null;

  get textError(): string|null {
    return this.errors?.errors[this.name]?.length ? this.errors?.errors[this.name][0] : null;
  }

  // Render the UI as a function of component state
  render() {
    return html`
      <fieldset class="au-border-0 au-border-blue-500 au-flex au-flex-col">
        <label for="input" class="au-block au-text-gray-600">${this.label}</label>
        <slot>
          <input id="input" type="text" class="au-h-[44px] au-rounded-md au-border focus:au-ring-0">
        </slot>

        ${this.textError ? html`<span class="au-text-red-600">${this.textError}</span>` : ``}
      </fieldset>
    `;
  }
}


declare global {
  interface HTMLElementTagNameMap {
    'app-form-field': FormField
  }
}

