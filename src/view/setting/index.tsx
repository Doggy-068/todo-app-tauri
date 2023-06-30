import { Row, Col, Typography, Select, Space, } from 'antd'
import { BgColorsOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '../../store/hook'
import { setValue as setThemeValue } from '../../store/slice/theme.slice'
import { useTranslation } from 'react-i18next'

const { Text } = Typography

export default () => {
  const { t, i18n } = useTranslation('setting')

  const theme = useAppSelector(state => state.theme.value)
  const appDispatch = useAppDispatch()

  const handleLocaleChange = (value: string) => i18n.changeLanguage(value)

  const handleThemeChange = (value: string) => appDispatch(setThemeValue(value))

  return (
    <div style={{ boxSizing: 'border-box', width: '100%', height: '100%', padding: '1em' }}>
      <Space direction='vertical' size='middle' style={{ display: 'flex' }}>
        <Row justify='space-between' align='middle'>
          <Col>
            <Text strong>{t('language')}</Text>
          </Col>
          <Col>
            <Select
              value={i18n.language}
              options={[
                { label: 'English', value: 'en' },
                { label: '简体中文', value: 'zh' }
              ]}
              onChange={handleLocaleChange}
              style={{ width: '100px' }}
            />
          </Col>
        </Row>
        <Row justify='space-between' align='middle'>
          <Col>
            <Text strong>{t('theme')}</Text>
          </Col>
          <Col>
            <Select
              value={theme}
              options={[
                { label: <BgColorsOutlined style={{ color: '#84709b' }} />, value: '#84709b' },
                { label: <BgColorsOutlined style={{ color: '#5d7db3' }} />, value: '#5d7db3' },
                { label: <BgColorsOutlined style={{ color: '#987157' }} />, value: '#987157' }
              ]}
              onChange={handleThemeChange}
            />
          </Col>
        </Row>
      </Space>
    </div>
  )
}
