/**
 * @author TopologyJZ
 * @version 0.1.1
 * @description 测试版本
 */



import {
    save,
    translation,
    data,
    Field,
    calcFertility,
    Crops
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