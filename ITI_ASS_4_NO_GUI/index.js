let sum = 0;
process.argv.forEach((arg)=>{
	const num = Number(arg);
	if(num) sum += num;
})
console.log(sum);