import { List, Avatar, Badge, Button } from 'antd'
import { useState } from 'react'
import { TodoModel, TodoModelType } from '../../model/todo.model'
import dayjs from '../../plugin/dayjs'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export default () => {
  const { t } = useTranslation('home')

  const navigate = useNavigate()

  const [list] = useState<TodoModel[]>([
    new TodoModel(1, 'Item-1', TodoModelType.GREEN, dayjs().subtract(1, 'day').toDate(), 'This is a message'),
    new TodoModel(2, 'Item-2', TodoModelType.ORANGE, dayjs().add(1, 'day').toDate(), 'This is a message'),
    new TodoModel(3, 'Item-3', TodoModelType.RED, dayjs().add(2, 'day').toDate(), 'This is a message')
  ])

  const handleDetailClick = (id: number) => navigate(`/detail?id=${id}`)

  return (
    <div style={{ boxSizing: 'border-box', width: '100%', height: '100%', padding: '1em' }}>
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
