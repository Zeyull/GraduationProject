export function clearLocalStorage() {
  const items = ['token', 'userInfoAtom'];
  items.forEach((item) => {
    localStorage.removeItem(item);
  });
}
