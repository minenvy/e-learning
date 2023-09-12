export function speak(word: string) {
  return new Promise((resolve, _) => {
    const synth = window.speechSynthesis
    const utterance = new SpeechSynthesisUtterance(word)
    utterance.voice = synth.getVoices()[4]
    utterance.onend = () => {
      resolve(1)
    }
    synth.speak(utterance)
  })
}
