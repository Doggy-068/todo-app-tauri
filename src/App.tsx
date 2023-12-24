import { Menu, Input, Avatar, Form, Button, Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import { MessageOutlined, MailOutlined, SearchOutlined, PlusCircleOutlined, ContactsOutlined } from '@ant-design/icons'
import { Routes, Route, useNavigate, Outlet, useLocation } from 'react-router-dom'
import Message from './view/Message'
import Mailbox from './view/Mailbox'
import Address from './view/Address'
import PageWriteMail from './page/WriteMail'
import { useRequest } from 'ahooks'
import { http } from './plugin/axios'
import { tokenKey } from './constant/localStorage'

const Nav = () => {

  const location = useLocation()

  const navigate = useNavigate()

  const items: MenuProps['items'] = [
    { label: '消息', key: '/app/message', icon: <MessageOutlined /> },
    { label: '邮箱', key: '/app/mailbox', icon: <MailOutlined /> },
    { label: '通讯录', key: '/app/address', icon: <ContactsOutlined /> }
  ]

  const handleNavItemClick: MenuProps['onClick'] = (event) => {
    navigate(event.key, { replace: true })
  }

  const handleQuitClick = () => {
    localStorage.removeItem(tokenKey)
    navigate('/')
  }

  return (
    <div style={{ boxSizing: 'border-box', padding: '0.5em', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flexShrink: 0, padding: '0 4px', paddingBottom: '1em', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Dropdown trigger={['click']} menu={{
          items: [
            {
              key: '1',
              label: <span onClick={handleQuitClick}>退出</span>
            }
          ]
        }}>
          <Avatar style={{ cursor: 'pointer' }} />
        </Dropdown>
        <PlusCircleOutlined style={{ color: '#fff', cursor: 'pointer' }} />
      </div>
      <div style={{ flexShrink: 0, padding: '0 4px 0.5em' }}>
        <Input prefix={<SearchOutlined />} placeholder='搜索' style={{ opacity: 0.85 }} />
      </div>
      <div style={{ height: '100%', overflow: 'auto' }}>
        <Menu items={items} selectedKeys={[location.pathname]} onClick={handleNavItemClick} style={{ border: 'none', background: 'transparent', color: '#fff', opacity: 0.8 }} />
      </div>
    </div>
  )
}

type FieldType = {
  username?: string
  password?: string
}

const LoginPage = () => {

  const navigate = useNavigate()

  const [form] = Form.useForm<FieldType>()

  const { loading, run: handleLoginBtnClick } = useRequest(() => {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const { username, password } = form.getFieldsValue()
        const { data } = await http({
          url: '/api/auth/login',
          method: 'POST',
          data: {
            username,
            password
          }
        })
        resolve(data)
      } catch (error) {
        reject(error)
      }
    })
  }, {
    manual: true,
    onSuccess(result) {
      localStorage.setItem(tokenKey, result['access_token'])
      navigate('/app/message')
    }
  })

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Form form={form} labelCol={{ span: 8 }}>
        <Form.Item<FieldType> name='username' label="用户名" rules={[{ required: true, message: '请输入用户名！' }]}>
          <Input />
        </Form.Item>
        <Form.Item<FieldType> name='password' label="密码" rules={[{ required: true, message: '请输入密码！' }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8 }}>
          <Button loading={loading} onClick={handleLoginBtnClick} type='primary' htmlType='submit'>登录</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default () => {

  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route
        path='/app'
        element={
          <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
            <div style={{ flexShrink: 0 }}>
              <Nav />
            </div>
            <div style={{ width: '100%', boxSizing: 'border-box', padding: '0.5em' }}>
              <Outlet />
            </div>
          </div>
        }>
        <Route path='message' element={<Message />} />
        <Route path='mailbox' element={<Mailbox />} />
        <Route path='address' element={<Address />} />
      </Route>
      <Route path='/app/page/writemail' element={<PageWriteMail />} />
    </Routes>
  )
}
