import { Menu, Input, Avatar } from 'antd'
import type { MenuProps } from 'antd'
import { MessageOutlined, MailOutlined, SearchOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Message from './view/Message'
import Mailbox from './view/Mailbox'

const Nav = () => {

  const navigate = useNavigate()

  const items: MenuProps['items'] = [
    { label: '消息', key: '/message', icon: <MessageOutlined /> },
    { label: '邮箱', key: '/mailbox', icon: <MailOutlined /> }
  ]

  const handleNavItemClick: MenuProps['onClick'] = (event) => {
    navigate(event.key, { replace: true })
  }

  return (
    <div style={{ padding: '0.5em' }}>
      <div style={{ paddingBottom: '1em', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Avatar />
        <PlusCircleOutlined />
      </div>
      <Input style={{ marginBottom: '0.5em' }} prefix={<SearchOutlined />} placeholder='搜索' />
      <Menu
        items={items}
        onClick={handleNavItemClick}
        style={{ border: 'none' }}
      />
    </div>
  )
}

export default () => {

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
      <div style={{ flexShrink: 0 }}>
        <Nav />
      </div>
      <div style={{ width: '100%', boxSizing: 'border-box', padding: '0.5em' }}>
        <Routes>
          <Route path='/message' element={<Message />} />
          <Route path='/mailbox' element={<Mailbox />} />
        </Routes>
      </div>
    </div>
  )
}
