const display=document.getElementById('display')
const copyBtn=document.getElementById('copyBtn')
const historyPanel=document.getElementById('history')
const historyToggle=document.getElementById('historyToggle')
const clearHistory=document.getElementById('clearHistory')
const historyList=document.getElementById('historyList')
const sciToggle=document.getElementById('sciToggle')
const normalToggle=document.getElementById('normalToggle')
const downloadBtn=document.getElementById('downloadBtn')
const themeToggle=document.getElementById('themeToggle')
const modeToggle=document.getElementById('modeToggle')
const sciPad=document.getElementById('keypad-sci')
let history=[]
let deferredPrompt=null
let mode='deg'

function factorial(n){if(n<0)return NaN;if(n===0)return 1;let r=1;for(let i=1;i<=n;i++)r*=i;return r}
function toRad(v){return v*Math.PI/180}
function applyFunc(func,val){
val=parseFloat(val)
switch(func){
case 'sin':return Math.sin(mode==='deg'?toRad(val):val)
case 'cos':return Math.cos(mode==='deg'?toRad(val):val)
case 'tan':return Math.tan(mode==='deg'?toRad(val):val)
case 'sqrt':return Math.sqrt(val)
case 'pow':return Math.pow(val,2)
case 'log':return Math.log10(val)
case 'ln':return Math.log(val)
case 'pi':return Math.PI
case 'e':return Math.E
case 'fact':return factorial(val)
default:return val}
}
function evaluateExpression(expr){
try{return Function(`"use strict";return (${expr})`)()}catch(e){return 'Erro'}}
function tapKey(val){display.value+=val}
function doEquals(){
let out
try{out=evaluateExpression(display.value)}catch(e){out='Erro'}
if(out!=='Erro'){history.unshift(display.value+' = '+out);renderHistory()}
display.value=out
}
function renderHistory(){
historyList.innerHTML=''
history.forEach(item=>{
const li=document.createElement('li')
li.textContent=item
historyList.appendChild(li)
})
}
document.querySelectorAll('.keypad .key').forEach(k=>{
k.addEventListener('click',()=>{
const a=k.getAttribute('data-action')
if(a==='equals')return doEquals()
if(a==='clear')return display.value=''
if(a==='backspace')return display.value=display.value.slice(0,-1)
if(a==='sign'){if(display.value.startsWith('-'))display.value=display.value.slice(1);else display.value='-'+display.value;return}
if(k.hasAttribute('data-key'))tapKey(k.getAttribute('data-key'))
if(k.hasAttribute('data-func')){
const f=k.getAttribute('data-func')
if(['pi','e'].includes(f)){display.value+=applyFunc(f,0);return}
if(display.value){display.value=applyFunc(f,display.value)}
}
})})
copyBtn.addEventListener('click',()=>{if(display.value){navigator.clipboard.writeText(display.value)}})
historyToggle.addEventListener('click',()=>{historyPanel.classList.toggle('hidden')})
clearHistory.addEventListener('click',()=>{history=[];renderHistory()})
sciToggle.addEventListener('click',()=>{sciPad.classList.remove('hidden')})
normalToggle.addEventListener('click',()=>{sciPad.classList.add('hidden')})
themeToggle.addEventListener('click',()=>{document.body.classList.toggle('light')})
modeToggle.addEventListener('click',()=>{mode=(mode==='deg'?'rad':'deg');modeToggle.textContent=(mode==='deg'?'Graus':'Radianos')})
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e})
downloadBtn.addEventListener('click',async()=>{
if(deferredPrompt){deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null}
else{alert('Instalação PWA não suportada neste navegador.')} })
