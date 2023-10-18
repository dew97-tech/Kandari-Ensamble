/**
 * A custom hook that provides methods to interact with the local storage.
 * @param {string} key - The key to be used for the local storage.
 * @returns {Object} An object containing setItem, getItem, and removeItem methods.
 */
export const useLocalStorage = (key) => {
   /**
    * Sets the value for the given key in the local storage.
    * @param {any} value - The value to be set in the local storage.
    */
   const setItem = (value) => {
      try {
         if (typeof window !== "undefined") {
            localStorage.setItem(key, JSON.stringify(value));
         }
      } catch (error) {
         console.log(error);
      }
   };

   /**
    * Gets the value for the given key from the local storage.
    * @returns {any} The value stored in the local storage for the given key.
    */
   const getItem = () => {
      try {
         if (typeof window !== "undefined") {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : undefined;
         }
      } catch (error) {
         console.log(error);
      }
   };

   /**
    * Removes the value for the given key from the local storage.
    */
   const removeItem = () => {
      try {
         if (typeof window !== "undefined") {
            localStorage.removeItem(key);
         }
      } catch (error) {
         console.log(error);
      }
   };

   return { setItem, getItem, removeItem };
};
