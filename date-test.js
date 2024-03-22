function datasIguais(data1, data2) {
  const novaData1 = new Date(data1.toISOString().split('T')[0]);
  const novaData2 = new Date(data2.toISOString().split('T')[0]);

  console.log('novaData1: ', novaData1);
  console.log('novaData2: ', novaData2);

  return novaData1.valueOf() === novaData2.valueOf();
}

const d = new Date();

// const d1 = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 10, 0, 0, 0);
// const d2 = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);

const d1 = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
const d2 = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);

console.log('d1: ', d1);
console.log('d2: ', d2);
console.log(d1.valueOf() === d2.valueOf());
// console.log(datasIguais(d1, d2));
