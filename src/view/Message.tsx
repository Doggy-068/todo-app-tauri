import { Avatar, Input, Tooltip, Spin } from 'antd'
import { SendOutlined, UnorderedListOutlined } from '@ant-design/icons'
import { PropsWithoutRef, useState, useEffect } from 'react'
import style from './Message.module.css'
import { http } from '../plugin/axios'
import { useRequest } from 'ahooks'
import { dayjs } from '../plugin/dayjs'

const ContactList = (
  props: PropsWithoutRef<{
    curContactKey: string
    onCardClick: Function
  }>
) => {

  const formatDate = (str: string): string => {
    const date = dayjs(str)
    if (date.isToday()) {
      return date.format('HH:mm')
    }
    return date.format('MM-DD')
  }

  const { loading, error, data } = useRequest(() => {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const { data } = await http({
          url: '/api/message/last/list',
          method: 'GET'
        })
        resolve(data)
      } catch (error) {
        reject(error)
      }
    })
  })

  if (loading || error) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Spin />
      </div>
    )
  }

  return (
    <div>
      {data.map((item: any) => (
        <div onClick={() => props.onCardClick(item.contact.id)} className={`${style['card']} ${item.contact.id === props.curContactKey ? 'cur' : ''}`} key={item.contact.id} style={{ borderRadius: '6px', display: 'flex', alignItems: 'center', padding: '0.5em', marginInline: '0.5em' }}>
          <Avatar style={{ flexShrink: 0, marginRight: '0.5em' }} />
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', width: '100%' }}>{item.contact.nickname}</span>
            <span style={{ fontSize: 'small', color: '#9c9c9c', textOverflow: 'ellipsis', overflow: 'hidden', width: '100%' }}>{item.message.content}</span>
          </div>
          <span style={{ flexShrink: 0, alignSelf: 'flex-start', fontSize: 'small', marginLeft: '0.5em', color: '#9c9c9c' }}>{formatDate(item.message.date)}</span>
        </div>
      ))}
    </div>
  )
}

const { TextArea } = Input

const MessageBox = (
  props: PropsWithoutRef<{
    contactKey: string
  }>
) => {

  const { loading, error, data, refreshAsync } = useRequest(() => {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const { data } = await http({
          url: '/api/message/list',
          params: {
            contactId: props.contactKey
          }
        })
        resolve(data)
      } catch (error) {
        reject(error)
      }
    })
  })

  useEffect(() => {
    refreshAsync()
  }, [props.contactKey])

  const [content, setContent] = useState('')

  const { loading: sendLoading, run: sendMessage } = useRequest(() => {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const { data } = await http({
          url: '/api/message/send',
          method: 'POST',
          data: {
            content,
            recipientId: props.contactKey
          }
        })
        resolve(data)
      } catch (error) {
        reject(error)
      }
    })
  }, {
    manual: true,
    onSuccess() {
      setContent('')
      refreshAsync()
    }
  })

  if (error || loading) {
    return (
      <div></div>
    )
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flexShrink: 0, padding: '1em', display: 'flex', alignItems: 'center', borderBottom: '1px solid #eeeeee' }}>
        <Avatar />
        <span style={{ marginLeft: '0.5em' }}>{data.contact.nickname}</span>
      </div>
      <div style={{ height: '100%', overflow: 'auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', padding: '1em', rowGap: '1em' }}>
          {data.messages.map((item: any) => {
            if (item.sender.id === props.contactKey) {
              return (
                <div key={item.id} style={{ display: 'flex', width: '80%' }}>
                  <Avatar style={{ flexShrink: 0 }} />
                  <div style={{ border: '1px solid #eeeeee', borderRadius: '4px', padding: '0.5em', marginLeft: '0.5em' }}>{item.content}</div>
                </div>
              )
            }
            return (
              <div key={item.id} style={{ display: 'flex', width: '80%', alignSelf: 'flex-end', justifyContent: 'flex-end' }}>
                <div style={{ border: '1px solid #eeeeee', borderRadius: '4px', padding: '0.5em', marginRight: '0.5em' }}>{item.content}</div>
                <Avatar style={{ flexShrink: 0 }} />
              </div>
            )
          })}
        </div>
      </div>
      <div style={{ flexShrink: 0, padding: '1em' }}>
        <Spin spinning={sendLoading}>
          <div style={{ border: '1px solid #eeeeee', borderRadius: '4px' }}>
            <TextArea value={content} onChange={(e) => setContent(e.target.value)} autoSize={{ minRows: 3, maxRows: 3 }} bordered={false} />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0.5em', paddingTop: '0' }}>
              <Tooltip title='发送'>
                <SendOutlined onClick={sendMessage} style={{ cursor: 'pointer' }} />
              </Tooltip>
            </div>
          </div>
        </Spin>
      </div>
    </div>
  )
}

export default () => {

  const [curContactKey, setCurContactKey] = useState('')

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', columnGap: '0.5em' }}>
      <div style={{ minWidth: '280px', maxWidth: '300px', width: '30%', height: '100%', flexShrink: 0, display: 'flex', flexDirection: 'column', background: '#fff', borderRadius: '4px' }}>
        <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', padding: '1em' }}>
          <UnorderedListOutlined />
          <span style={{ marginLeft: '0.5em' }}>消息</span>
        </div>
        <div style={{ height: '100%', overflow: 'auto' }}>
          <ContactList curContactKey={curContactKey} onCardClick={setCurContactKey} />
        </div>
      </div>
      <div style={{ width: '100%', height: '100%', background: '#fff', borderRadius: '4px' }}>
        <MessageBox contactKey={curContactKey} />
      </div>
    </div>
  )
}
