import React, { useCallback, useState } from 'react'
import { PageContainer } from '@ant-design/pro-components'
import { Input, Card, message } from 'antd'

const App = () => {
  const [isLoading, setLoading] = useState(false)
  const [gifSrc, setGifSrc] = useState('')

  const startTimer = useCallback((id: string) => {
    setLoading(true)
    const check = async () => {
      const res = await fetch(`/api/capture/task?id=${id}`).then(res => res.text()).catch(() => {
        return ''
      })
      if (!res) {
        setTimeout(check, 1000)
      }
      setLoading(false)
      setGifSrc(res)
    }
  }, [])

  const onSearch = async (value: string) => {
    if (!value) {
      return
    }
    const url = new URL(value, 'https://example.com')
    const taskId = await fetch('/api/caputre/create', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url: url.toString() })
    }).then(res => res.text()).catch(m => {
      message.error(m && m.message || 'Some error')
      return ''
    })
    taskId && startTimer(taskId)
  }
  return <>
    <PageContainer style={{ height: '100vh' }}>
      <Input.Search placeholder="input search url" enterButton="Search" size="large" onSearch={onSearch} />
      <Card style={{ marginTop: '32px', height: 'calc(100vh - 200px)' }} loading={isLoading}>
        { gifSrc && <img src={gifSrc} alt="gif" /> }
      </Card>
    </PageContainer>
  </>
}

export default App
