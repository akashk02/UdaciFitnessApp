let obj = {
    name: 'Aakash',
    lastName: 'asas',
    key3: 'sasa',
    key4: 'ddd'
}

let obj2 = {
    key6: 'obje 2 6 ',
    key7: 'obj 2 7'
}


let { name, ...rest } = obj;



console.log('...rest = ', rest);
console.log('{...rest} =')

delete obj.name;
console.log('obj del =', obj)

let obj3 = {
    ...obj,
    ...obj2
}

console.log('obj3 = ', obj3)