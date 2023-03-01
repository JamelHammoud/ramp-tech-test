import { FC, useEffect, useState } from 'react'
import { captureFlag } from './scripts'

// You can see the script for step 2 in `captureFlag.ts`

const App: FC = () => {
  const [loading, setLoading] = useState(true)
  const [word, setWord] = useState('')
  const [letters, setLetters] = useState<string[]>([])

  const fetchWord = async () => {
    try {
      const flag = captureFlag()

      const response = await fetch(flag, {
        method: 'GET'
      })

      const text = await response.text()

      setWord(text)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWord()
  }, [])

  useEffect(() => {
    // If finished displaying the letters,
    // return early
    if (word.length === letters.length) {
      return
    }

    // In 0.5 seconds, add the next letters to `letters`
    const timeout = setTimeout(() => {
      const letter = word[letters.length]
      setLetters(letters => [...letters, letter])
    }, 500)

    return () => {
      clearTimeout(timeout)
    }
  }, [word, letters])

  return (
    <div>
      {loading && 'Loading...'}
      <ul>
        {letters.map(letter => {
          return <li key={letter}>{letter}</li>
        })}
      </ul>
    </div>
  )
}

export default App
