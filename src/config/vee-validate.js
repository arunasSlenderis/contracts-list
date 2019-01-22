import VeeValidate, { Validator } from 'vee-validate';
import i18n from '../i18n/i18n-config';

/**
 * Since I am using vue-i18n library to translate the app and
 * default vee-validate messages for lt locale kinda sucked
 * I figured it would be easier to leave the default locale on
 * and just use our custom validation messages.
 * This saves the effort of changing locale in multiple places during runtime.
 * If additional validation rules will be required, just add them to the messages object below.
 */
const dictionary = {
  en: {
    messages: {
      required: () => `${i18n.t('general.validations.required_field')}.`,
      email: () => `${i18n.t('general.validations.wrong_email')}.`,
    },
  },
};
Validator.localize(dictionary);

export default VeeValidate;
