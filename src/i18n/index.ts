import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locale/en'
import zh from './locale/zh'

const resources = {
  en,
  zh
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
