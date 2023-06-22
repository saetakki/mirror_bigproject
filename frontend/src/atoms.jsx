import { atom } from 'recoil'

const localStorageEffect = (key) => ({ setSelf, onSet, trigger }) => {
  const loadPersisted = () => {
    const savedValue = localStorage.getItem(key)
    if (!savedValue) return
    setSelf(JSON.parse(savedValue))
  }

  if(trigger==="get") {
    loadPersisted()
  }

  onSet((newValue, isReset) => {
    isReset
    ? localStorage.removeItem(key)
    : localStorage.setItem(key, JSON.stringify(newValue))
  })
}


export const isAuthAtom = atom({
  key: 'isAuth',
  default: false,
  effects_UNSTABLE: [localStorageEffect('isAuth')]
})