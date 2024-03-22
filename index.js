const controlDate = new Date();

const data = new Date(controlDate.toUTCString()).toISOString();

const sp = controlDate.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })

const dataSlice = controlDate.toISOString().slice(0, -1);
console.log(dataSlice);

const result = new Date(dataSlice);
console.log(result);
