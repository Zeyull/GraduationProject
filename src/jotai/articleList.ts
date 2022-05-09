import { atom } from 'jotai';

export const filterArticleFnAtom = atom({
  filterArticleFn: (_selectedTags: ArticleTags[]) => {},
});
