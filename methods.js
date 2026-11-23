import {stability,convergence} from './math.mjs';
const form=document.querySelector('#stability');
form.querySelector('button').hidden=false;
form.addEventListener('submit',event=>{
 event.preventDefault();const result=document.querySelector('#stability-result');
 try{const values=['alpha','dx','dt'].map(id=>Number(document.getElementById(id).value));const {r,limit,stable}=stability(...values);
 result.textContent=`r = ${r.toPrecision(6)}；时间步上限 ${limit.toPrecision(6)} s。${stable?'满足本例 r ≤ 1/2 的稳定性条件；仍需检查精度和边界处理。':'超出本例稳定范围；应减小时间步或重新选择离散方案。'}`;
 }catch(error){result.textContent=error.message;}
});
form.addEventListener('input',()=>{document.querySelector('#stability-result').textContent='输入已改变，请重新检查。';});
const body=document.querySelector('#convergence');body.replaceChildren();
for(const row of convergence()){
 const tr=document.createElement('tr');
 for(const value of [row.n,row.h,row.value.toFixed(8),row.error.toExponential(4),row.order===null?'—':row.order.toFixed(3)]){const td=document.createElement('td');td.textContent=value;tr.append(td);}
 body.append(tr);
}
