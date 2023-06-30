import { Breadcrumb, Button, Col, Row, Space, Typography, Popconfirm } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { TodoModel, TodoModelType } from '../../model/todo.model'
import dayjs from '../../plugin/dayjs'
import { useTranslation } from 'react-i18next'

const { Title, Text, Paragraph } = Typography

export default () => {
  const { t } = useTranslation('detail')

  const navigate = useNavigate()

  const todo = new TodoModel(3, 'Item-3', TodoModelType.RED, dayjs().add(2, 'day').toDate(), 'This is a message')

  return (
    <div style={{ boxSizing: 'border-box', width: '100vw', height: '100vh', padding: '1em', display: 'flex', flexDirection: 'column' }}>
      <Breadcrumb
        items={[
          { title: <ArrowLeftOutlined style={{ cursor: 'pointer' }} />, onClick: () => navigate(-1) },
          { title: t('detail') }
        ]}
      />
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
                <Button danger>{t('delete')}</Button>
              </Popconfirm>
            </Col>
            {
              todo.isOutdated ? '' : <Col><Button>{t('edit')}</Button></Col>
            }
          </Space>
        </Row>
      </div>
    </div>
  )
}
