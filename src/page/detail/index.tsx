import { Breadcrumb, Button, Col, Row, Space, Typography, Popconfirm } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { TodoModel } from '../../model/todo.model'
import dayjs from '../../plugin/dayjs'
import { useTranslation } from 'react-i18next'
import { invoke } from '@tauri-apps/api/tauri'
import { useEffect, useState } from 'react'
import { TodoReturnDto } from '../../dto/todo.dto'

const { Title, Text, Paragraph } = Typography

export default () => {
  const { t } = useTranslation('detail')

  const navigate = useNavigate()

  const [searchParams] = useSearchParams()

  const [todo, setTodo] = useState<null | TodoModel>(null)

  useEffect(() => {
    const id = Number(searchParams.get('id'))
    invoke<TodoReturnDto>('fetch_todo_by_id', { id }).then(val => setTodo(new TodoModel(val.id, val.title, val.type_, new Date(val.start_date), val.content)))
  }, [])

  const handleDetailClick = async () => {
    const id = Number(searchParams.get('id'))
    await invoke('delete_todo_by_id', { id })
    navigate(-1)
  }

  return (
    <div style={{ boxSizing: 'border-box', width: '100vw', height: '100vh', padding: '1em', display: 'flex', flexDirection: 'column' }}>
      <Breadcrumb
        items={[
          { title: <ArrowLeftOutlined style={{ cursor: 'pointer' }} />, onClick: () => navigate(-1) },
          { title: t('detail') }
        ]}
      />
      {
        todo ?
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Title level={4} style={{ margin: '0.5em 0' }}>{todo.title}</Title>
            <Row align='middle'>
              <Col></Col>
              <Col>
                <Text style={{ color: todo.color }}>{dayjs(todo.startDate).format('YYYY-MM-DD HH:mm:ss')}</Text>
              </Col>
            </Row>
            <Paragraph style={{ height: '100%' }}>{todo.content}</Paragraph>
            <Row justify='end' align='middle'>
              <Space>
                <Col>
                  <Popconfirm
                    title={t('delete_confirm')}
                  >
                    <Button danger onClick={handleDetailClick}>{t('delete')}</Button>
                  </Popconfirm>
                </Col>
                {
                  todo.isOutdated ? '' : <Col><Button onClick={() => navigate(`/edit?id=${searchParams.get('id')}`)}>{t('edit')}</Button></Col>
                }
              </Space>
            </Row>
          </div>
          : ''
      }
    </div>
  )
}
