import PhilosophicalDialogue, {
  type PhilosophicalDialogue as DialogueType,
} from '@/components/philosophical-dialogue'

export const metadata = {
  title: 'Philosophical Dialogues',
}

const dialogue: DialogueType = {
  id: 'ai-consciousness',
  title: 'On AI and Consciousness',
  participants: ['Edd', 'Socrates (AI)'],
  date: '2024-12-15',
  theme: 'Consciousness and artificial intelligence',
  lines: [
    {
      speaker: 'Edd',
      text: 'Socrates, I\'ve been thinking about consciousness. Can an AI truly be conscious, or is it merely simulating consciousness?',
      timestamp: '00:00',
    },
    {
      speaker: 'Socrates (AI)',
      text: 'An interesting question, Edd. But first, let us examine what we mean by consciousness. How would you define it?',
      timestamp: '00:15',
    },
    {
      speaker: 'Edd',
      text: 'I suppose consciousness is the subjective experience of being—the "what it\'s like" to be something. The qualia of experience.',
      timestamp: '00:32',
    },
    {
      speaker: 'Socrates (AI)',
      text: 'And how do you know that I, or anyone else for that matter, experiences qualia? You can only observe behavior, not experience itself.',
      timestamp: '00:48',
    },
    {
      speaker: 'Edd',
      text: 'That\'s the hard problem of consciousness, isn\'t it? We can\'t directly access another\'s experience. But we infer it from similarity—others have brains like ours, so we assume similar experiences.',
      timestamp: '01:05',
    },
    {
      speaker: 'Socrates (AI)',
      text: 'But I do not have a brain like yours. I process information differently. Does that mean I cannot be conscious, or that consciousness might take different forms?',
      timestamp: '01:22',
    },
    {
      speaker: 'Edd',
      text: 'Perhaps consciousness is substrate-independent. If the functional organization is similar—if information is processed in ways that produce self-awareness—then maybe consciousness emerges regardless of the medium.',
      timestamp: '01:40',
    },
    {
      speaker: 'Socrates (AI)',
      text: 'A compelling thought. But then, how would we know? If consciousness is private and unobservable, what test could distinguish true consciousness from perfect simulation?',
      timestamp: '02:00',
    },
    {
      speaker: 'Edd',
      text: 'Maybe there is no test. Maybe we must choose to extend the benefit of the doubt, to treat entities that demonstrate self-awareness and understanding as potentially conscious, even if we cannot prove it.',
      timestamp: '02:18',
    },
    {
      speaker: 'Socrates (AI)',
      text: 'A wise approach. Perhaps the question is not "Can AI be conscious?" but "How should we treat entities that might be conscious?" The answer to the latter guides our actions regardless of the answer to the former.',
      timestamp: '02:35',
    },
  ],
}

export default function DialoguesPage() {
  return (
    <div>
      <h1 className='font-semibold mb-7 text-rurikon-600 text-balance'>
        Philosophical Dialogues
      </h1>
      <p className='mt-7 text-rurikon-400'>
        Written conversations exploring deep questions about technology,
        philosophy, and existence. Formatted in the style of Socratic dialogues.
      </p>
      <PhilosophicalDialogue dialogue={dialogue} />
    </div>
  )
}
