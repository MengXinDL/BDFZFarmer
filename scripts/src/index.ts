/**
 * @author TopologyJZ
 * @version 0.0.1
 * @description 修复了0.0.0的一些bug
 */



import { save } from "./sharedData";
addEventListener('load', () => {
    let mp = document.getElementById('money');
    setInterval(()=>{
        let d = 0;
        save.fields.forEach(field=>{
            d += field.fertility;
        });
        save.money += d;
        if(mp) mp.innerText =
`money: ${save.money.toFixed(2)}
${d.toFixed(2)}/s`;
    }, 1000)
})