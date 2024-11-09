import * as React from 'react';
import { createRoot } from 'react-dom/client';
import evt from './event';

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
            <button
                style={{
                    background: 'rgba(0,0,0,0.5)',
                    border: 'none',
                    color: 'white',
                    height: '100%',
                    aspectRatio: '1/1',
                    fontSize: '20px',
                }}
                onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255,0,0,0.5)';
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.5)';
                }}
                onClick={(e) => {
                    evt.emit('notice-close');
                }}
            >×</button>
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

let tips: {
    content: string,
    opacity: number
}[] = [];
setInterval(() => {
    roots.tip = roots.tip || createRoot(document.getElementById('tip') as HTMLElement);
    let del: {
        content: string,
        opacity: number
    }[] = [];
    tips.forEach($ => {
        $.opacity -= 0.05;
        if($.opacity < 0)del.push($);
    })
    tips = tips.filter($ => !del.includes($));
    roots.tip.render(
        <>{
            tips.map(($, index) => (
                <span className='tip' key={index} style={{opacity: $.opacity}}>
                    {$.content}
                </span>
            ))
        }</>
    );
}, 20)
export function showTip(content: string) {
    tips.push({
        content,
        opacity: 3
    });
}