// export function loadState<T>(key: string): T | undefined {
//   try {
//     const jsonState = localStorage.getItem(key);
//     // console.log(
//     //   "токен из jsonState до метода JSON.parse",
//     //   jsonState,
//     //   JSON.parse(jsonState)
//     // );
//     if (!jsonState) {
//       return undefined;
//     } else {
//       return JSON.parse(jsonState); // 672|lnxabn2RkolEzY5d97l3O3hagQSEPBzaKdj9ko6H
//     }
//   } catch (error) {
//     console.error(error);
//     return undefined;
//   }
// }

// export function saveState<T>(state: T, key: string) {
//   const stringState = JSON.stringify(state);
//   // console.log(stringState);
//   localStorage.setItem(key, stringState);
// }
