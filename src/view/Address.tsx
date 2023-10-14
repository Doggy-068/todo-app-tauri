import { Avatar, Button, Menu } from 'antd'
import type { MenuProps } from 'antd'
import { ContactsOutlined } from '@ant-design/icons'

const Nav = () => {

  const items: MenuProps['items'] = [
    { label: '组织架构', key: '0', icon: <ContactsOutlined /> },
    { label: '外部联系人', key: '1', icon: <ContactsOutlined /> },
    { label: '新的联系人', key: '2', icon: <ContactsOutlined /> },
    { label: '星标联系人', key: '3', icon: <ContactsOutlined /> },
    { label: '邮箱联系人', key: '4', icon: <ContactsOutlined /> },
    { label: '我的群组', key: '5', icon: <ContactsOutlined /> },
    { label: '服务台', key: '6', icon: <ContactsOutlined /> }
  ]

  return (
    <div style={{ boxSizing: 'border-box', height: '100%' }}>
      <div style={{ height: '5em', flexShrink: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 'large', marginLeft: '0.5em' }}>通讯录</span>
        <div style={{ width: '100%', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
          <Avatar style={{ flexShrink: 0, marginLeft: '1em', marginRight: '0.5em' }} />
          <span style={{ width: '100%', overflow: 'hidden', textOverflow: 'ellipsis' }}>xxxxxx</span>
        </div>
      </div>
      <div style={{ height: 'calc(100% - 5em)', overflow: 'auto' }}>
        <Menu items={items} style={{ borderRight: 'none' }} />
      </div>
    </div>
  )
}

const Content = () => {

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ boxSizing: 'border-box', height: '3em', borderBottom: '1px solid #eeeeee', paddingLeft: '0.5em', flexShrink: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>组织架构</span>
        <Button>添加企业成员</Button>
      </div>
      <div style={{ height: 'calc(100% - 3em)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ boxSizing: 'border-box', height: '3em', flexShrink: 0, paddingLeft: '0.5em', paddingTop: '0.5em' }}>
          <span>xxxxxxxxxxxx</span>
        </div>
        <div style={{ height: 'calc(100% - 3em)', overflow: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar style={{ margin: '0 0.5em' }} />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <span>xxxxx</span>
              <span style={{ fontSize: 'small', color: '#909399' }}>xxx@xx.xx</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default () => {

  return (
    <div style={{ boxSizing: 'border-box', height: '100%', display: 'flex' }}>
      <div style={{ flexShrink: 0, height: '100%', width: '40%', minWidth: '260px', maxWidth: '360px' }}>
        <Nav />
      </div>
      <div style={{ width: '100%', height: '100%' }}>
        <Content />
      </div>
    </div>
  )
}
