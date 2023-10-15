import { EditOutlined, DeleteOutlined, BackwardOutlined, SearchOutlined, RightOutlined, MailOutlined, StarOutlined, FileOutlined, SendOutlined, StarFilled } from '@ant-design/icons'
import { Avatar, Menu, Typography } from 'antd'
import type { MenuProps } from 'antd'
import { WebviewWindow } from '@tauri-apps/api/window'

const Top = () => {

  const handleNewMailClick = () => {
    new WebviewWindow('newmail', {
      url: '/#/page/writemail'
    })
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '0.5em 0 0 1em' }}>
      <div style={{ display: 'flex', alignItems: 'center', paddingRight: '1em', marginRight: '1.5em', borderRight: '1px solid #eeeeee' }}>
        <div onClick={handleNewMailClick} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <EditOutlined />
          <span style={{ marginLeft: '0.2em' }}>新建邮件</span>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', paddingRight: '1em', marginRight: '1.5em', columnGap: '1em', borderRight: '1px solid #eeeeee' }}>
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <DeleteOutlined />
          <span style={{ marginLeft: '0.2em' }}>删除</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <BackwardOutlined />
          <span style={{ marginLeft: '0.2em' }}>回复</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <RightOutlined />
          <span style={{ marginLeft: '0.2em' }}>转发</span>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
        <SearchOutlined />
        <span style={{ marginLeft: '0.2em' }}>搜索</span>
      </div>
    </div>
  )
}

const { Text } = Typography

const Nav = () => {

  const items: MenuProps['items'] = [
    { label: '收件箱', key: '1', icon: <MailOutlined /> },
    { label: '星标邮件', key: '2', icon: <StarOutlined /> },
    { label: '草稿箱', key: '3', icon: <FileOutlined /> },
    { label: '已发送', key: '4', icon: <SendOutlined /> },
    { label: '已删除', key: '5', icon: <DeleteOutlined /> }
  ]

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flexShrink: 0, paddingLeft: '1em' }}>
        <Text type='secondary'>xxxxxx@xx.com</Text>
      </div>
      <div style={{ height: '100%', overflow: 'auto' }}>
        <Menu items={items} style={{ borderRight: 'none' }} />
      </div>
    </div>
  )
}

const MailList = () => {

  const list = [
    { name: 'x@xxx.com', title: 'xxxxx', content: 'xxxxxxx' },
    { name: 'x@xxx.com', title: 'xxxxx', content: 'xxxxxxx' },
    { name: 'x@xxx.com', title: 'xxxxx', content: 'xxxxxxx' },
    { name: 'x@xxx.com', title: 'xxxxx', content: 'xxxxxxx' },
    { name: 'x@xxx.com', title: 'xxxxx', content: 'xxxxxxx' }
  ]

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flexShrink: 0 }}>
        <Text type='secondary' style={{ marginLeft: '0.5em' }}>收件箱</Text>
      </div>
      <div style={{ height: '100%', overflow: 'auto' }}>
        {list.map((item, idx) => (
          <div key={idx} style={{ display: 'flex', padding: '0.5em 0' }}>
            <Avatar style={{ flexShrink: 0, margin: '0.5em' }} />
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', width: '100%', fontSize: 'large' }}>{item.name}</span>
              <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', width: '100%', color: '#333333' }}>{item.title}</span>
              <span style={{ color: '#9c9c9c', textOverflow: 'ellipsis', overflow: 'hidden', width: '100%' }}>{item.content}</span>
            </div>
            <span style={{ flexShrink: 0, fontSize: 'small', margin: '0 0.5em', color: '#9c9c9c' }}>昨天</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const MailContent = () => {

  return (
    <div style={{ boxSizing: 'border-box', padding: '1em', width: '100%', height: '100%' }}>
      <div style={{ height: '2.5em' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize: 'large', fontWeight: 'bold' }}>XXXXXXXXXXX</span>
          <StarFilled style={{ marginLeft: '1em' }} />
        </div>
      </div>
      <div style={{ height: 'calc(100% - 2.5em)', boxSizing: 'border-box', padding: '0.5em' }}>
        <div style={{ height: '3em', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <span>xxxxxxx</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', columnGap: '0.5em' }}>
              <Text type='secondary'>发给</Text>
              <span>xxxxxxx</span>
            </div>
            <Text type='secondary'>昨天 15:00</Text>
          </div>
        </div>
        <div style={{ overflow: 'hidden', height: 'calc(100% - 3em)' }}>
          <iframe srcDoc='' style={{ border: 'none', width: '100%', height: '100%' }}></iframe>
        </div>
      </div>
    </div>
  )
}

export default () => {

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
      <div style={{ flexShrink: 0, height: '3em' }}>
        <Top />
      </div>
      <div style={{ height: 'calc(100% - 3em)', display: 'flex' }}>
        <div style={{ flexShrink: 0, height: '100%', width: '160px' }}>
          <Nav />
        </div>
        <div style={{ flexShrink: 0, height: '100%', width: '28%', minWidth: '240px', maxWidth: '300px' }}>
          <MailList />
        </div>
        <div style={{ width: '100%', height: '100%' }}>
          <MailContent />
        </div>
      </div>
    </div >
  )
}
