import { List, Avatar, Badge, Button, FloatButton } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { TodoModel } from '../../model/todo.model'
import dayjs from '../../plugin/dayjs'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { invoke } from '@tauri-apps/api/tauri'
import { TodoReturnDto } from '../../dto/todo.dto'

export default () => {
  const { t } = useTranslation('home')

  const navigate = useNavigate()

  useEffect(() => {
    invoke<TodoReturnDto[]>('fetch_todos').then(val => {
      setList(val.map(item => new TodoModel(item.id, item.title, item.type_, new Date(item.start_date), item.content)))
    })
  }, [])

  const [list, setList] = useState<TodoModel[]>([])

  const handleDetailClick = (id: number) => navigate(`/detail?id=${id}`)

  const handleAddClick = () => navigate('/edit')

  return (
    <div style={{ boxSizing: 'border-box', width: '100%', height: '100%', padding: '1em' }}>
      <FloatButton onClick={handleAddClick} icon={<PlusOutlined />} />
      <List
        dataSource={list}
        renderItem={item => {
          if (item.isOutdated) {
            return (
              <Badge.Ribbon color='red' text={t('outdate')}>
                <List.Item
                  extra={<p>{dayjs(item.startDate).format('YYYY-MM-DD HH:mm')}</p>}
                  actions={[<Button onClick={() => handleDetailClick(item.id)} type='link'>{t('detail')}</Button>]}
                >
                  <List.Item.Meta
                    avatar={<Avatar size='small' style={{ background: item.color }} />}
                    title={item.title}
                    description={item.content}
                  />
                </List.Item>
              </Badge.Ribbon>
            )
          } else {
            return (
              <List.Item
                extra={<p>{dayjs(item.startDate).format('YYYY-MM-DD HH:mm')}</p>}
                actions={[<Button onClick={() => handleDetailClick(item.id)} type='link'>{t('detail')}</Button>]}
              >
                <List.Item.Meta
                  avatar={<Avatar size='small' style={{ background: item.color }} />}
                  title={item.title}
                  description={item.content}
                />
              </List.Item>
            )
          }
        }}
      />
    </div>
  )
}
