export const createKeyFilter = (keys: KeyboardEvent["key"] | KeyboardEvent["key"][], callback: (...args: any[]) => void, ...args: any[]) => {
    const keysArray = Array.isArray(keys) ? keys : [keys];

    return (keydownEvent: React.KeyboardEvent) => {
        const { key } = keydownEvent;

        if (keysArray.includes(key)) {
            keydownEvent.preventDefault();
            callback(...args);
        }
    };
};
 