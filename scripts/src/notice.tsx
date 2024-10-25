import * as React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import evt from './event';
function Notice(
    {title, content, children}:
    {title: string, content?: string, children?: React.ReactNode}
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
        <div className='notice-content'>{content}</div>
        {children}
    </div>;
    return notice;
}

addEventListener('load', () => {
    const root = createRoot(document.getElementById('root') as HTMLElement);
    root.render(<Notice title='北大附中' content='mygomygomygomygomygomygomygomygomygomygomygomygomygomygomygomygomygomygomygomygomygomygomygomygomygomygomygomygomygomygomygomygomygomygomygomygomygomygomygomygomygomygomygomygomygomygomygomygomygomygomygomygomygomygomygo' />);
    evt.on('notice-close', () => {
        root.unmount();
    })
})
console.log(<Notice title='Hello' content='World' />);