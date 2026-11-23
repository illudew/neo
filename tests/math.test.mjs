import test from 'node:test';
import assert from 'node:assert/strict';
import {stability,convergence} from '../math.mjs';
test('diffusion stability bound, grid refinement and boundary',()=>{
 const a=stability(.01,.1,.1),b=stability(.01,.05,.1);
 assert.ok(Math.abs(a.r-.1)<1e-14);assert.ok(Math.abs(b.r/a.r-4)<1e-14);
 assert.ok(Math.abs(a.limit-.5)<1e-14);
 assert.equal(stability(1,1,.5).stable,true);assert.equal(stability(1,1,.51).stable,false);
 assert.equal(stability(.01,.025,.1).stable,false);
});
test('invalid numeric inputs rejected',()=>{
 for(const args of [[0,1,1],[-1,1,1],[1,0,1],[1,1,Infinity],[NaN,1,1],[1,1,0],[1,1e-300,1]])assert.throws(()=>stability(...args));
});
test('Euler baseline converges to analytic value with order one',()=>{
 const rows=convergence();assert.ok(Math.abs(rows[0].value-.3486784401)<1e-12);
 for(let i=1;i<rows.length;i++){assert.ok(rows[i].error<rows[i-1].error);assert.ok(rows[i].order>1&&rows[i].order<1.1);}
 assert.ok(rows.at(-1).error<.002);
});
