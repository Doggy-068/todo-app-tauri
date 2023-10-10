import { Avatar, Input, Tooltip } from 'antd'
import { SendOutlined } from '@ant-design/icons'

const ContactList = () => {

  const list = [
    { name: 'xxxxx', message: 'xxxxxxxxxx', time: '15:07' },
    { name: 'xxxxxxxx', message: 'xxxxxx', time: '15:07' },
    { name: 'xxxxx', message: 'xxxxxx', time: '15:07' },
    { name: 'xxxxx', message: 'xxxxxx', time: '15:07' },
    { name: 'xxxxx', message: 'xxxxxx', time: '15:07' }
  ]

  return (
    <div>
      {list.map((item, idx) => (
        <div key={idx} style={{ display: 'flex', alignItems: 'center', padding: '0.5em 0' }}>
          <Avatar style={{ flexShrink: 0, margin: '0 0.5em' }} />
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', width: '100%' }}>{item.name}</span>
            <span style={{ fontSize: 'small', color: '#9c9c9c', textOverflow: 'ellipsis', overflow: 'hidden', width: '100%' }}>{item.message}</span>
          </div>
          <span style={{ flexShrink: 0, alignSelf: 'flex-start', fontSize: 'small', margin: '0 0.5em', color: '#9c9c9c' }}>{item.time}</span>
        </div>
      ))}
    </div>
  )
}

const { TextArea } = Input

const MessageBox = () => {

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flexShrink: 0, padding: '1em', display: 'flex', alignItems: 'center', borderBottom: '1px solid #eeeeee' }}>
        <Avatar />
        <span style={{ marginLeft: '0.5em' }}>XXXXX</span>
      </div>
      <div style={{ height: '100%', overflow: 'auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', padding: '1em', rowGap: '1em' }}>
          <div style={{ display: 'flex', width: '80%' }}>
            <Avatar style={{ flexShrink: 0 }} />
            <div style={{ border: '1px solid #eeeeee', borderRadius: '4px', padding: '0.5em', marginLeft: '0.5em' }}>xxxxxxxxxxxxxxxxxxxx</div>
          </div>
          <div style={{ display: 'flex', width: '80%', alignSelf: 'flex-end', justifyContent: 'flex-end' }}>
            <div style={{ border: '1px solid #eeeeee', borderRadius: '4px', padding: '0.5em', marginRight: '0.5em' }}>xxxxxxxxxxxxxxxxxxxx</div>
            <Avatar style={{ flexShrink: 0 }} />
          </div>
        </div>
      </div>
      <div style={{ flexShrink: 0, padding: '1em' }}>
        <div style={{ border: '1px solid #eeeeee', borderRadius: '4px' }}>
          <TextArea autoSize={{ minRows: 3, maxRows: 3 }} bordered={false} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0.5em', paddingTop: '0' }}>
            <Tooltip title='发送'>
              <SendOutlined style={{ cursor: 'pointer' }} />
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  )
}

export default () => {

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', columnGap: '0.5em' }}>
      <div style={{ minWidth: '280px', maxWidth: '300px', width: '30%', height: '100%', flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
        <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', padding: '1em 0.5em' }}>
          <span>消息</span>
        </div>
        <div style={{ height: '100%', overflow: 'auto' }}>
          <ContactList />
        </div>
      </div>
      <div style={{ width: '100%', height: '100%' }}>
        <MessageBox />
      </div>
    </div>
  )
}
