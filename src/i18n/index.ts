import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enUs from './locale/en-us'
import zhCn from './locale/zh-cn'

const resources = {
  enUs,
  zhCn
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'zhCn',
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
