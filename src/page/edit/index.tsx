import { Avatar, Button, DatePicker, Form, Input, Select, Space, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { TodoModelType, getColor, TodoModel } from '../../model/todo.model'
import dayjs from '../../plugin/dayjs'
import { useTranslation } from 'react-i18next'

export default () => {
  const { t } = useTranslation('edit')

  const [messageApi, contextHolder] = message.useMessage()

  const navigate = useNavigate()

  const [form] = Form.useForm()

  const handleSaveButtonClick = async () => {
    await form.validateFields()
    new TodoModel(
      1,
      form.getFieldValue('title'),
      form.getFieldValue('type'),
      dayjs(form.getFieldValue('startTime')).toDate(),
      form.getFieldValue('content')
    )
    await messageApi.success(t('successfully'))
    navigate(-1)
  }

  return (
    <>
      {contextHolder}
      <div style={{ boxSizing: 'border-box', width: '100vw', height: '100vh', padding: '1em' }}>
        <Form form={form} labelCol={{ span: 3 }}>
          <Form.Item name='title' label={t('title')} rules={[{ required: true, message: t('title_confirm') }]}>
            <Input />
          </Form.Item>
          <Form.Item name='type' label={t('type')} rules={[{ required: true, message: t('type_confirm') }]}>
            <Select
              style={{ width: '70px' }}
              options={[
                { value: TodoModelType.GREEN, label: <Avatar size={14} style={{ background: getColor(TodoModelType.GREEN) }} /> },
                { value: TodoModelType.ORANGE, label: <Avatar size={14} style={{ background: getColor(TodoModelType.ORANGE) }} /> },
                { value: TodoModelType.RED, label: <Avatar size={14} style={{ background: getColor(TodoModelType.RED) }} /> }
              ]}
            />
          </Form.Item>
          <Form.Item name='startTime' label={t('startTime')} rules={[{ required: true, message: t('startTime_confirm') }]}>
            <DatePicker disabledDate={currentDate => dayjs().isAfter(currentDate)} />
          </Form.Item>
          <Form.Item name='content' label={t('content')} rules={[{ required: true, message: t('content_confirm') }]}>
            <Input.TextArea rows={5} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 3 }}>
            <Space>
              <Button onClick={handleSaveButtonClick} type='primary'>{t('save')}</Button>
              <Button onClick={() => navigate(-1)}>{t('cancel')}</Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}
