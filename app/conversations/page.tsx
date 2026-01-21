import ConversationTranscript, {
  type ConversationTranscript as TranscriptType,
} from '@/components/conversation-transcript'

export const metadata = {
  title: 'Conversations',
}

const transcript: TranscriptType = {
  id: 'ai-architecture',
  title: 'Discussion on AI Architecture',
  date: '2024-12-10',
  topic: 'React Server Components and AI Integration',
  messages: [
    {
      id: '1',
      role: 'user',
      content:
        'I\'m working on integrating AI into a Next.js application. What\'s the best approach for handling AI responses with React Server Components?',
      timestamp: '14:23',
    },
    {
      id: '2',
      role: 'assistant',
      content:
        'Great question! With React Server Components, you have a few options:\n\n1. **Server Actions**: Use server actions to handle AI API calls. This keeps the logic on the server and streams responses.\n\n2. **Route Handlers**: Create API routes that handle AI requests and call them from client components when needed.\n\n3. **Streaming**: For longer responses, use streaming to provide real-time updates to the user.\n\nThe key is deciding what needs to be interactive (client component) vs. what can be server-rendered.',
      timestamp: '14:24',
    },
    {
      id: '3',
      role: 'user',
      content:
        'I want to stream responses. How do I implement that with the AI SDK?',
      timestamp: '14:25',
    },
    {
      id: '4',
      role: 'assistant',
      content:
        'The Vercel AI SDK makes this straightforward:\n\n```typescript\nimport { streamText } from \'ai\';\nimport { openai } from \'@ai-sdk/openai\';\n\nexport async function POST(req: Request) {\n  const { messages } = await req.json();\n  \n  const result = await streamText({\n    model: openai(\'gpt-4\'),\n    messages,\n  });\n  \n  return result.toDataStreamResponse();\n}\n```\n\nThen on the client, use `useChat` or `useCompletion` hooks to handle the streamed response. The SDK handles all the complexity of parsing the stream.',
      timestamp: '14:26',
    },
    {
      id: '5',
      role: 'user',
      content:
        'Perfect! And for error handling? What\'s the best practice?',
      timestamp: '14:27',
    },
    {
      id: '6',
      role: 'assistant',
      content:
        'Always wrap AI calls in try-catch blocks and provide meaningful error messages. Consider:\n\n- Rate limiting errors\n- API failures\n- Timeout handling\n- Invalid responses\n\nAlso, implement retry logic with exponential backoff for transient failures. The AI SDK has built-in error handling, but you should still catch and handle errors gracefully in your UI.',
      timestamp: '14:28',
    },
  ],
}

export default function ConversationsPage() {
  return (
    <div>
      <h1 className='font-semibold mb-7 text-rurikon-600 text-balance'>
        Conversations
      </h1>
      <p className='mt-7 text-rurikon-400'>
        Transcripts of meaningful conversations about technology, design, and
        philosophy. Click on messages to expand and read full content.
      </p>
      <ConversationTranscript transcript={transcript} />
    </div>
  )
}
