import ThoughtExperiment, {
  type ThoughtExperiment as ThoughtExperimentType,
} from '@/components/thought-experiment'

export const metadata = {
  title: 'Thought Experiments',
}

const experiment: ThoughtExperimentType = {
  id: 'ship-of-theseus',
  title: 'The Ship of Theseus',
  description:
    'If all the parts of a ship are replaced over time, is it still the same ship? This ancient paradox explores identity, continuity, and what makes something what it is.',
  startStep: '1',
  steps: [
    {
      id: '1',
      title: 'The Original Ship',
      content:
        'Imagine a ship, the Ship of Theseus, made entirely of wooden planks. Over many years, each plank is replaced one by one as they rot or break. Eventually, every single plank has been replaced.',
      choices: [
        {
          id: 'same',
          label: 'It is the same ship',
          nextStep: '2',
        },
        {
          id: 'different',
          label: 'It is a different ship',
          nextStep: '3',
        },
      ],
    },
    {
      id: '2',
      title: 'The Same Ship',
      content:
        'You believe it is the same ship. But consider: if someone collected all the original planks and rebuilt the ship with them, which would be the "real" Ship of Theseus?',
      choices: [
        {
          id: 'original',
          label: 'The rebuilt original is the real ship',
          nextStep: '4',
        },
        {
          id: 'both',
          label: 'Both are equally valid',
          nextStep: '5',
        },
      ],
    },
    {
      id: '3',
      title: 'A Different Ship',
      content:
        'You believe it becomes a different ship. But at what point does it change? After one plank? Ten? Fifty percent? The transition seems arbitrary.',
      choices: [
        {
          id: 'gradual',
          label: 'The change is gradual',
          nextStep: '6',
        },
        {
          id: 'threshold',
          label: 'There is a specific threshold',
          nextStep: '7',
        },
      ],
    },
    {
      id: '4',
      title: 'The Original Rebuilt',
      content:
        'If the rebuilt original is the real ship, then identity must be tied to the original materials. But materials decay and change at the molecular level constantly. Nothing stays truly "original."',
      conclusion:
        'This path reveals the complexity of material identity. Perhaps identity is not about materials at all, but about continuity, purpose, or something more abstract.',
    },
    {
      id: '5',
      title: 'Both Are Valid',
      content:
        'Both ships can claim to be the Ship of Theseus. This suggests identity is not exclusive—multiple things can share the same identity, or identity is contextual.',
      conclusion:
        'Identity might be more flexible than we think. Perhaps the question itself reveals that identity is a construct, not an absolute property of objects.',
    },
    {
      id: '6',
      title: 'Gradual Change',
      content:
        'The change happens gradually, imperceptibly. Like aging, we cannot point to a single moment when we became "different." Yet we acknowledge we have changed.',
      conclusion:
        'Identity might be a spectrum, not a binary. We are always becoming, never static. The ship, like us, exists in a state of constant transformation.',
    },
    {
      id: '7',
      title: 'A Threshold',
      content:
        'There must be a specific point—perhaps 50% replacement, or when the keel is replaced. But why that point? Who decides? The threshold seems arbitrary.',
      conclusion:
        'If identity requires a threshold, then identity is a human construct, a convention we impose on reality rather than something inherent to objects themselves.',
    },
  ],
}

export default function ThoughtExperimentsPage() {
  return (
    <div>
      <h1 className='font-semibold mb-7 text-rurikon-600 text-balance'>
        Thought Experiments
      </h1>
      <p className='mt-7 text-rurikon-400'>
        Interactive explorations of philosophical and technical questions. Make
        choices and see where your reasoning leads.
      </p>
      <ThoughtExperiment experiment={experiment} />
    </div>
  )
}
