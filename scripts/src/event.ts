const evts: { [key: string]: Function[] } = {};

export default {
    on: (event: string, func: Function) => {
        evts[event] = evts[event] || [];
        evts[event].push(func);
    },
    emit: (event: string, ...args: any[]) => {
        if (evts[event]) {
            evts[event].forEach(func => func(...args));
        }
    }
};