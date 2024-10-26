import {
    save,
    base64, unbase64, initSaveData,
} from "./sharedData";
import {
    render, initFields,
} from "./render";
import notice from './notice'
import LZString from 'lz-string';
import db from "./database";




/************************************* 保存与读取 *********************************************** */



addEventListener('load', () => {
    const s = document.getElementById('save');
    const l = document.getElementById('load');
    const a = document.createElement('a');
    const i = document.createElement('input') as HTMLInputElement;
    i.type = 'file';
    i.addEventListener('change', (event) => {
        const fileInput = event.target as HTMLInputElement;
        const file = fileInput.files?.[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const content = new Uint8Array(e.target?.result as ArrayBuffer);
                try {
                    initSaveData(JSON.parse(unbase64(LZString.decompressFromUint8Array(content))));
                } catch (error1) {
                    try {
                        initSaveData(JSON.parse(unbase64(new TextDecoder('ascii').decode(content))));
                    }catch (error2) {
                        notice(
                            '无法读取的存档',
                            [
                                '请确认存档文件是否损坏',
                                'error when reading as text: ' + error2,
                                'error when reading as binary: ' + error1
                            ]
                        );
                    }
                } finally {
                    fileInput.value = '';
                    initFields();
                    render();
                }
            };

            reader.onerror = (error) => {
                console.error('Error reading file:', error);
            };

            reader.readAsArrayBuffer(file);
        }
    })
    if (s && l) {
        s.onclick = () => {
            const content = base64(JSON.stringify(save));
            const blob = new Blob([LZString.compressToUint8Array(content)], { type: 'application/octet-stream' });
            const url = URL.createObjectURL(blob);

            a.href = url;
            a.download = 'farmer.save';
            a.click();

            URL.revokeObjectURL(url);
        }
        l.onclick = () => {
            i.click();
            initFields();
            render();
        }
    }
});

setInterval(() => {
    db.save.updateData('save', save);
}, 10000);
