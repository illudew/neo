export function stability(alpha, dx, dt) {
  if (![alpha,dx,dt].every(x=>Number.isFinite(x)&&x>0)) throw new Error('三个参数都必须为正的有限数。');
  const limit=dx*dx/(2*alpha),r=alpha*dt/(dx*dx);
  if (![limit,r].every(x=>Number.isFinite(x)&&x>0)) throw new Error('数值超出范围，请检查单位与输入。');
  return {limit,r,stable:r<=.5};
}
export function convergence(){
  let previous;
  return [10,20,40,80,160].map(n=>{
    const h=1/n,value=(1-h)**n,error=Math.abs(value-Math.exp(-1));
    const order=previous===undefined?null:Math.log2(previous/error);
    previous=error;return {n,h,value,error,order};
  });
}
