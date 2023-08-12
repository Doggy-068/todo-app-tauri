import { Editor } from '@tinymce/tinymce-react'
import 'tinymce/models/dom/model'
import 'tinymce/themes/silver'
import 'tinymce/icons/default'
import 'tinymce/skins/ui/oxide/skin.min.css'
import contentCss from 'tinymce/skins/content/default/content.min.css?raw'
import contentUiCss from 'tinymce/skins/ui/oxide/content.min.css?raw'
import { useRef } from 'react'
import { Button, Space, message } from 'antd'
import { useTranslation } from 'react-i18next'
import { open, save } from '@tauri-apps/api/dialog'
import { readTextFile, writeTextFile } from '@tauri-apps/api/fs'

export default () => {
  const { t, i18n } = useTranslation('editor')

  const [messageApi, contextHolder] = message.useMessage()

  const editorRef = useRef<Editor | null>(null)

  const handleOpenClick = async () => {
    const path = await open({
      filters: [{
        name: '',
        extensions: ['html']
      }]
    }) as string
    if (path) {
      const contents = await readTextFile(path)
      editorRef.current?.editor?.setContent(contents)
    }
  }

  const handleSaveAsClick = async () => {
    const path = await save({
      filters: [{
        name: '',
        extensions: ['html']
      }]
    })
    if (path) {
      const contents = editorRef.current?.editor?.getContent() || ''
      await writeTextFile(path, contents)
      messageApi.success(t('successfully'))
    }
  }

  return (
    <>
      {contextHolder}
      <div style={{ padding: '1em' }}>
        <Space style={{ paddingBottom: '1em' }}>
          <Button onClick={handleOpenClick}>{t('open')}</Button>
          <Button onClick={handleSaveAsClick} type='primary'>{t('save_as')}</Button>
        </Space>
        <Editor
          ref={editorRef}
          apiKey={import.meta.env.VITE_TINYMCE_KEY}
          init={{
            ...(() => {
              if (i18n.language === 'zh') {
                return {
                  language: 'zh-Hans',
                  language_url: '/zh-Hans.js'
                }
              }
              return {}
            })(),
            height: 'calc(100vh - 130px)',
            skin: false,
            content_css: false,
            content_style: [contentCss, contentUiCss].join('\n'),
            resize: false,
            menubar: 'edit insert view format',
            plugins: 'emoticons searchreplace wordcount preview',
            toolbar: 'emoticons searchreplace wordcount preview'
          }}
        />
      </div>
    </>
  )
}
