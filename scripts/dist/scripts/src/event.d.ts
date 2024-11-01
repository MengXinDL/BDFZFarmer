declare const _default: {
    on: (event: string, func: Function) => {
        callback: Function;
        id: number;
    };
    emit: (event: string, ...args: any[]) => void;
    remove: (id: number) => void;
};
export default _default;
