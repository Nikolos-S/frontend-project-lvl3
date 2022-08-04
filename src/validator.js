import * as yup from 'yup';
import i18nInstance from './locales/interpreter.js';

const validate = (url, urls, lng) => {
  const schema = yup.string().trim()
    .url(i18nInstance(lng, 'errURL'))
    .required(i18nInstance(lng, 'errRequired'))
    .notOneOf([urls], i18nInstance(lng, 'repleated'));
  return schema.validate(url)
    .then(() => {}).catch((err) => err);
};

export default validate;
