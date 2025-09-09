window.addEventListener('load',()=>{
const tests=[
{expr:'2+2',expected:4},
{expr:'10/2',expected:5},
{expr:'Math.sqrt(16)',expected:4},
{expr:'Math.log(1)',expected:0}
]
let pass=0
for(const t of tests){
let result
try{result=Function(`return ${t.expr}`)()}catch(e){result='Erro'}
if(result===t.expected){console.log('OK',t.expr,'=',result);pass++}
else console.error('FAIL',t.expr,'->',result,'esperado',t.expected)
}
console.log(`Passaram ${pass}/${tests.length} testes.`)
})
