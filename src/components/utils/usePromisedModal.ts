import { readonly, ref } from "vue";

/**
 * Vue 3 custom hook to promisify a user's choice inside of a modal
 * 
 * since the ask function returns a promise, it lets you
 * await the user's choice and continue execution.
 * 
 * @author Daniele Trapani
 */
export function usePromisedModal<T>() {
    /**
     * locally scoped variable to hold the promise's resolve function
     * it's generically typed to allow code reuse
     * it doesn't need to be reactive
     */
    let resolveFn: (value?: T) => void = () => {};

    /**
     * Variable réactive responsable de l'affichage de la modale
     */
    const visible = ref(false);

    /**
     * Rend la modale visible et garde la fonction de résolution de promesse pour plus tard
     */
    const ask = (): Promise<T> => {
        visible.value = true;
        return new Promise((resolve) => {
            resolveFn = resolve as (value?: T | undefined) => void;
        });
    };

    /**
     * Cache la modale et honore la promesse avec la réponse de l'utilisateur
     * @param value user's choice
     */
    const tell = (value: T): void => {
        visible.value = false;
        resolveFn(value);
    };

    return {
        visible: readonly(visible),
        ask,
        tell,
    };
}