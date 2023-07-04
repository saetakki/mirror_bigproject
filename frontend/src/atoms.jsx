import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const localStorageEffect =
  (key) =>
  ({ setSelf, onSet, trigger }) => {
    const loadPersisted = () => {
      const savedValue = localStorage.getItem(key);
      if (!savedValue) return;
      setSelf(JSON.parse(savedValue));
    };

    if (trigger === 'get') {
      loadPersisted();
    }

    onSet((newValue, isReset) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const isAuthAtom = atom({
  key: 'isAuth',
  default: false,
  effects_UNSTABLE: [localStorageEffect('isAuth')],
});

export const initialHistoryLoadAtom = atom({
  key: 'initialHistoryLoad',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const initalBookmarkLoadAtom = atom({
  key: 'initalBookmarkLoadAtom',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const historyPaginationItemsAtom = atom({
  key: 'history',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const historySelector = selector({
  key: 'historySelector',
  get: ({ get }) => {
    const history = get(historyPaginationItemsAtom);
    return history;
  },
});

export const bookmarkPaginationItemsAtom = atom({
  key: 'bookmark',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const userInfoAtom = atom({
  key: 'userInfo',
  default: {},
  effects_UNSTABLE: [persistAtom],
});

export const personaAtom = atom({
  key: 'persona',
  default: {},
  effects_UNSTABLE: [persistAtom],
});

export const currentHistoryIdAtom = atom({
  key: 'histoty_id',
  default: null,
  effects_UNSTABLE: [persistAtom],
});
