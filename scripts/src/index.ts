



import {
    save,
    translation,
    data,
    Field,
    calcFertility,
    Crops,
    base64, unbase64,
    VERSION
} from "./sharedData";
import { interact } from "./interact";
import {
    render, initFields,
} from "./render";


addEventListener('load', () => {
    let mp = document.getElementById('money');
    setInterval(()=>{
        let d = 0;
        save.fields.forEach(field=>{
            d += calcFertility(field.x, field.y);
        });
        save.money += d;
        if(mp) mp.innerText =
`money: ${save.money.toFixed(2)}
${d.toFixed(2)}/s`;
    }, 1000)
})


interact.click = (x: number, y: number) => {
    if(translation.scale < 0.5)return;

    if(!interact.pressedElement || interact.pressedElement !== data.gamecvs){
        return;
    }

    let x1 = Math.floor((x - translation.x) / translation.scale / 50);
    let y1 = Math.floor((y - translation.y) / translation.scale / 50);

    if(save.fields.some(f => f.x === x1 && f.y === y1)){
        return;
    }

    let f = data.fields.find(f => f.x === x1 && f.y === y1);
    if(!f || !f.canBuy){
        return;
    }
    if(Field.calcMoney(f) > save.money){
        alert(
`你钱不够
需要${Field.calcMoney(f)}
但你只有${save.money.toFixed(2)}
`
        );
        return;
    }
    save.money -= Field.calcMoney(f);
    
    save.fields.push({
        x: x1,
        y: y1,
        crop: Crops.corn
    });
    initFields();
    render();
}

function parseData(data: object): object {
    return data;
}

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
                const content = e.target?.result as string;
                try {
                    Object.assign(save, parseData(JSON.parse(unbase64(content))));
                    data.noise.seed(save.seed);
                    initFields();
                    render();
                } catch (error) {
                    console.error('加载失败\nError parsing JSON:', error);
                }
            };

            reader.onerror = (error) => {
                console.error('Error reading file:', error);
            };

            reader.readAsText(file);
        }
    })
    if(s && l){
        s.onclick = () => {
            let obj = JSON.parse(JSON.stringify(save));
            obj.version = VERSION;
            const content = base64(JSON.stringify(obj));
            const blob = new Blob([content], { type: 'text/plain' });
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
    try {
        let v = fetch('../statics/version.json').then(res => res.json());
        v.then(v => {
            console.log(v);
            if(v.version !== VERSION){
                alert(`有新版本了\n${v.details.join('\n')}\n建议保存并刷新`);
            }
        })
    } catch (error) {

    }
}, 1000 * 60);