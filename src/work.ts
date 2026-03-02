// Branded Type
const brend: unique symbol = Symbol("__brand");
type Brend<T, V extends string> = T & { [brend]: V }

type ProductId = Brend<string,'ABC'>
function assertValue(value:string): asserts value is  ProductId{
  if(!value.startsWith('ABC') || value.length !== 8){
    throw new Error('Invalid ProductId')
  }
}

function func(value: ProductId): ProductId{
  return  value
}

const productId = 'ABC12345' 
assertValue(productId)
func(productId)

const a=[6,7].at(0) // 6
const b=[6,7].at(1) // 7
const c=[6,7].at(-1) // 7
const d=[6,7].at(-2) // 6
const e = [6, 7].at(-3) // undefined
const f = [6, 7].at(2) // undefined
