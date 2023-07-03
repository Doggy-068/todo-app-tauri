import { Menu, MenuProps, ConfigProvider } from 'antd'
import { HomeOutlined, SettingOutlined } from '@ant-design/icons'
import { useNavigate, Routes, Route, useLocation } from 'react-router-dom'
import { useAppSelector } from './store/hook'
import { useTranslation } from 'react-i18next'
import zh from 'antd/locale/zh_CN'
import en from 'antd/locale/en_US'
import HomeView from './view/home'
import SettingView from './view/setting'
import DeatilPage from './page/detail'
import EditPage from './page/edit'
import { useEffect, useState } from 'react'

export default () => {
  const { t, i18n } = useTranslation('app')

  const [locale, setLocale] = useState(en)

  useEffect(() => {
    if (i18n.language === 'zh') {
      setLocale(zh)
    } else {
      setLocale(en)
    }
  }, [i18n.language])

  const theme = useAppSelector(state => state.theme.value)

  const location = useLocation()
  const navigate = useNavigate()

  const handleMenuClick: MenuProps['onClick'] = e => navigate(e.key, { replace: true })

  return (
    <ConfigProvider
      locale={locale}
      theme={{ token: { colorPrimary: theme } }}
    >
      <Routes>
        <Route path='*' element={
          <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Menu
              defaultSelectedKeys={[location.pathname]}
              onClick={handleMenuClick}
              mode='horizontal'
              items={[
                { label: t('home'), key: '/', icon: <HomeOutlined /> },
                { label: t('setting'), key: '/setting', icon: <SettingOutlined /> }
              ]}
            />
            <div style={{ height: '100%' }}>
              <Routes>
                <Route path='/' element={<HomeView />} />
                <Route path='/setting' element={<SettingView />} />
              </Routes>
            </div>
          </div>
        } />
        <Route path='/detail' element={<DeatilPage />} />
        <Route path='/edit' element={<EditPage />} />
      </Routes>
    </ConfigProvider>
  )
}
