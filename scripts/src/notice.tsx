import * as React from 'react';
import { createRoot } from 'react-dom/client';
import evt from './event';
import Motion, { motion } from 'framer-motion';

const roots:{
    notice: null | ReturnType<typeof createRoot>;
    tip: null | ReturnType<typeof createRoot>;
} = {
    notice: null,
    tip: null
}
addEventListener('load', () => {
    roots.notice = createRoot(document.getElementById('notice') as HTMLElement);
    roots.tip = createRoot(document.getElementById('tip') as HTMLElement);
})

function Notice(
    {title, content, children}:
    {title: string | React.JSX.Element, content?: string, children?: React.JSX.Element[]}
) {
    let notice = <div className='notice'>
        <div className='notice-title'>
            <motion.button
                style={{
                    background: 'rgba(0,0,0,0.5)',
                    border: 'none',
                    color: 'white',
                    height: '100%',
                    aspectRatio: '1/1',
                    fontSize: '20px',
                }}
                whileHover={{background: 'rgba(255,0,0,0.5)'}}
                onClick={(e) => {
                    evt.emit('notice-close');
                }}
            >×</motion.button>
            <span style={{
                color: 'white',
                textAlign: 'center',
                width: '100%',
                fontSize: '20px',
                fontWeight: 'bold'
            }}>{title}</span>
        </div>
        <div className='notice-content'>
            <p>{content}</p>
            {children}
        </div>
    </div>;
    return notice;
}
export function showNotice(title: string | React.JSX.Element, contents:{
    text?: string | string[],
    children?: React.JSX.Element | React.JSX.Element[]
}, split: boolean = true) {
    roots.notice = roots.notice || createRoot(document.getElementById('notice') as HTMLElement);
    if (typeof contents.text === 'string') {
        contents.text = [contents.text];
    }
    if (!split) {
        contents.text = [contents.text?.join('\n') as string];
    }
    let n = contents.text ? contents.text.map((c, index) => <p key={index}>{c}</p>) : [];
    if(contents.children !== undefined){
        if(contents.children instanceof Array){
            contents.children.forEach((c, index) => c.key == undefined ? index.toString() : c.key, [])
            let c = <div className='box-container' children={contents.children}></div>;
            n.push(c)
        }
        else {
            contents.children.key = n.length.toString();
            n.push(contents.children)
        }
    }
    roots.notice.render(<Notice title={title} content="" >{n}</Notice>);
    let e = evt.on('notice-close', () => {
        roots.notice?.render(null);
        evt.remove(e.id);
    });
}

function Tip({content}: {content: string}){
    return <motion.span
        className='tip'
        initial={{opacity: 1}}
        animate={{opacity: 0}}
        transition={{duration: 1, delay: 2}}
        onAnimationComplete={() => {
            evt.emit('tip-close');
        }}
    >
        {content}
    </motion.span>
}
function TipContainer() {
    const [tips, setTips] = React.useState<{
        content: string;
        id: number;
        time: number;
    }[]>([]);
    const [id, updateId] = React.useReducer((state: number) => state + 1, 0);
    const controler = Motion.useAnimation();

    React.useEffect(() => {
        let e = evt.on('tip', (content: string) => {
            setTips((tips) => {
                tips.push({ content, id, time: Date.now() });
                return [...tips];
            });
            updateId();
        });
        return () => {
            evt.remove(e.id);
        }
    });
    React.useEffect(() => {
        let e = evt.on('tip-close', () => {setTips(tips => tips.filter(t => t.time > Date.now() - 3000));});
        return () => {
            evt.remove(e.id);
        }
    })
    return (
        <motion.div className='tip-container' animate={controler}>
            {tips.map(({ content, id }) => <Tip content={content} key={id} />)}
        </motion.div>
    );
}
addEventListener('load', () => {
    roots.tip = roots.tip || createRoot(document.getElementById('tip') as HTMLElement);
    roots.tip.render(<TipContainer />);
})
export function showTip(content: string) {
    evt.emit('tip', content);
}
