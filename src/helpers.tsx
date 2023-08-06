export function checkForLocalUser() {
    const localUser = window.localStorage.getItem("activeUser");

    if (localUser) 
        return JSON.parse(localUser)
    else return null;
}

export function getRandomIndexes(quantity: number) {
    const randomIndexes: number[] = [];
    while (randomIndexes.length < 3) {
      const randomIdx = Math.floor(Math.random() * quantity);
      if (!randomIndexes.includes(randomIdx)) randomIndexes.push(randomIdx);
    }
    return randomIndexes;
  }