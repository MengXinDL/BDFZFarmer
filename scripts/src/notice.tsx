import * as React from 'react';
import { createRoot } from 'react-dom/client';
import evt from './event';
function Notice(
    {title, content, children}:
    {title: string, content?: string, children?: React.JSX.Element[]}
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
function showNotice(title: string, contents:{
    text?: string | string[],
    children?: React.JSX.Element | React.JSX.Element[]
}, split: boolean = true) {
    const root = createRoot(document.getElementById('root') as HTMLElement);
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
    root.render(<Notice title={title} content="" >{n}</Notice>);
    let e = evt.on('notice-close', () => {
        root.unmount();
        evt.remove(e.id);
    });
}
export default showNotice;