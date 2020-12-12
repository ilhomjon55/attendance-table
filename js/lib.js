// Functions finds student by id form data
export const getById = (arr, userId) => {
   const finder = user => user.id === userId;

   return arr.find(finder);
}