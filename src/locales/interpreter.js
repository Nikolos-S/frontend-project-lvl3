import i18n from 'i18next';
import resources from './index.js';

export default (language, word) => {
  const i18nInstance = i18n.createInstance();
  i18nInstance.init({
    lng: language,
    resources,
  });
  return i18nInstance.t(word);
};
