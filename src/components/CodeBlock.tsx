import { useState } from 'react'
import { Button } from 'antd'

type CodeBlockProps = {
  code: string
}

type CopyStatus = 'idle' | 'copied' | 'failed'

export default function CodeBlock({ code }: CodeBlockProps) {
  const [status, setStatus] = useState<CopyStatus>('idle')

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code)
      setStatus('copied')
    } catch {
      setStatus('failed')
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-slate-950 text-slate-100">
      <div className="flex items-center justify-between gap-3 px-4 pt-3">
        <span role="status" className="text-xs text-slate-300">
          {status === 'copied' && '已复制'}
          {status === 'failed' && '失败'}
        </span>
        <Button size="small" onClick={handleCopy}>
          复制代码
        </Button>
      </div>
      <pre className="m-0 overflow-x-auto p-3 text-sm leading-6">
        <code>{code}</code>
      </pre>
    </div>
  )
}
