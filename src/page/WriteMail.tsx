import { Button, Typography, Modal } from 'antd'
import { SendOutlined, SaveOutlined, PaperClipOutlined, FileOutlined, CloseOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { Editor } from '@tinymce/tinymce-react'
import { open } from '@tauri-apps/api/dialog'
import { useState } from 'react'

const { Text } = Typography

export default () => {

  const [annex, setAnnex] = useState<string[]>([])

  const handleAnnexClick = async () => {
    const res = await open({
      multiple: true
    })
    if (Array.isArray(res)) {
      setAnnex(res)
    }
  }

  const handleAnnexCloseClick = (idx: number) => {
    setAnnex(annex.toSpliced(idx, 1))
  }

  const [isContactModalShow, setIsContactModalShow] = useState<boolean>(false)

  const handleAddContactClick = () => {
    setIsContactModalShow(true)
  }

  return (
    <>
      <div style={{ boxSizing: 'border-box', width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', padding: '0.5em' }}>
        <div style={{ height: '42px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', columnGap: '1.5em' }}>
              <Button type='primary' icon={<SendOutlined />}>发送</Button>
              <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <SaveOutlined />
                <span style={{ marginLeft: '0.2em' }}>保存</span>
              </div>
              <div onClick={handleAnnexClick} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
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
              <div style={{ width: '100%' }}></div>
              <PlusCircleOutlined onClick={handleAddContactClick} style={{ cursor: 'pointer' }} />
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
          <div style={{ height: 'calc(100% - 110px)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: '100%' }}>
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
            <div style={{ flexShrink: 0, display: 'flex', overflowX: 'auto', padding: '0.5em 0', columnGap: '0.5em' }}>
              {annex.map((item, idx) => (
                <div key={idx} style={{ flexShrink: 0, width: '10em', height: '3em', padding: '0.5em', background: '#eeeeee', display: 'flex', alignItems: 'center', borderRadius: '4px' }}>
                  <FileOutlined style={{ flexShrink: 0, fontSize: '2em' }} />
                  <div style={{ width: '100%', overflow: 'hidden', margin: '0 0.5em' }}>
                    <Text ellipsis>{item}</Text>
                    <Text ellipsis style={{ fontSize: 'small' }}>xxxx</Text>
                  </div>
                  <CloseOutlined onClick={() => handleAnnexCloseClick(idx)} style={{ flexShrink: 0, alignSelf: 'flex-start', cursor: 'pointer', fontSize: 'small' }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Modal open={isContactModalShow} onCancel={() => setIsContactModalShow(false)}></Modal>
    </>
  )
}
