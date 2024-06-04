import {
  EmailContact,
  NameContact,
  MessageContact,
} from '../types/contact-type';

export interface ContactFormData {
  readonly name: NameContact;
  readonly email: EmailContact;
  readonly message: MessageContact;
}
