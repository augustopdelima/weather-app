export const createStore = (initialState) => {
    let state = initialState;

    return {
        get:() => state,
        set:(updater) => {
            state = updater(state);
            return state;
        }
    }
}