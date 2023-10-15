import { Button, Typography } from 'antd'
import { SendOutlined, SaveOutlined, PaperClipOutlined } from '@ant-design/icons'
import { Editor } from '@tinymce/tinymce-react'

const { Text } = Typography

export default () => {

  return (
    <div style={{ boxSizing: 'border-box', width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', padding: '0.5em' }}>
      <div style={{ height: '42px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', columnGap: '1.5em' }}>
            <Button type='primary' icon={<SendOutlined />}>发送</Button>
            <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <SaveOutlined />
              <span style={{ marginLeft: '0.2em' }}>保存</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <PaperClipOutlined />
              <span style={{ marginLeft: '0.2em' }}>附件</span>
            </div>
          </div>
          <Text type='secondary'>xxxx@xx.xx</Text>
        </div>
      </div>
      <div style={{ boxSizing: 'border-box', height: 'calc(100% - 42px)' }}>
        <div style={{ height: '110px' }}>
          <div style={{ height: '2em', display: 'flex', alignItems: 'center', borderBottom: '1px solid #eeeeee', color: '#909399' }}>
            <div style={{ width: '3em', display: 'flex', justifyContent: 'space-between' }}>
              {'收件人'.split('').map((item, i) => <span key={i}>{item}</span>)}
            </div>
            <span>：</span>
          </div>
          <div style={{ height: '2em', display: 'flex', alignItems: 'center', borderBottom: '1px solid #eeeeee', color: '#909399' }}>
            <div style={{ width: '3em', display: 'flex', justifyContent: 'space-between' }}>
              {'抄送'.split('').map((item, i) => <span key={i}>{item}</span>)}
            </div>
            <span>：</span>
          </div>
          <div style={{ height: '2em', display: 'flex', alignItems: 'center', borderBottom: '1px solid #eeeeee', color: '#909399' }}>
            <div style={{ width: '3em', display: 'flex', justifyContent: 'space-between' }}>
              {'主题'.split('').map((item, i) => <span key={i}>{item}</span>)}
            </div>
            <span>：</span>
          </div>
        </div>
        <div style={{ height: 'calc(100% - 110px)' }}>
          <Editor
            tinymceScriptSrc={`${import.meta.env.BASE_URL}/tinymce/tinymce.min.js`}
            apiKey={import.meta.env.VITE_TINYMCE_KEY}
            init={{
              height: '100%',
              resize: false,
              menubar: false,
              plugins: 'image emoticons',
              toolbar: 'undo redo image emoticons',
              language_url: 'tinymce/langs/zh-Hans.js',
              language: 'zh-Hans'
            }}
          />
        </div>
      </div>
    </div>
  )
}
