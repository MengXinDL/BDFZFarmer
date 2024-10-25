const evts: { [key: string]: {callback: Function, id: number}[] } = {};

export default {
    on: (event: string, func: Function) => {
        evts[event] = evts[event] || [];
        let e = {
            callback: func,
            id: Date.now()
        };
        evts[event].push({id: e.id, callback: e.callback});
        return e;
    },
    emit: (event: string, ...args: any[]) => {
        if (evts[event]) {
            evts[event].forEach(e => e.callback(...args));
        }
    },
    remove: (id: number) => {
        for (let event in evts) {
            evts[event] = evts[event].filter(e => e.id !== id);
        }
    }
};