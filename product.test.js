const { resetProducts, addProduct, removeProduct, getProducts, getProduct, updateProduct } = require('./product');

beforeEach(() => {
  resetProducts();
});

describe('addProduct', () => {
  test('debería agregar un producto', () => {
    addProduct('Producto 1', 100);
    const products = getProducts();
    expect(products.length).toBe(1);
    expect(products[0]).toEqual({ id: 1, name: 'Producto 1', price: 100 });
  });

  test('debería incrementar el id en 1 cada vez que se añada un producto', () => {
    addProduct('Producto 1', 100);
    addProduct('Producto 2', 200);
    const products = getProducts();
    expect(products.length).toBe(2);
    expect(products[1]).toEqual({ id: 2, name: 'Producto 2', price: 200 });
  });

  test('debería lanzar un error si el nombre o el precio no están definidos', () => {
    expect(() => addProduct('', 100)).toThrow('El nombre y el precio son requeridos');
    expect(() => addProduct('Producto 1', undefined)).toThrow('El nombre y el precio son requeridos');
  });

  test('debería lanzar un error si el producto ya existe', () => {
    addProduct('Producto 1', 100);
    expect(() => addProduct('Producto 1', 100)).toThrow('El producto ya existe');
  });
});

describe('removeProduct', () => {
  test('debería eliminar un producto', () => {
    addProduct('Producto 1', 100);
    removeProduct(1);
    const products = getProducts();
    expect(products.length).toBe(0);
  });

  test('debería lanzar un error si el producto no existe', () => {
    expect(() => removeProduct(1)).toThrow('El producto no existe');
  });
});

describe('getProduct', () => {
  test('debería devolver un producto por su id', () => {
    addProduct('Producto 1', 100);
    const product = getProduct(1);
    expect(product).toEqual({ id: 1, name: 'Producto 1', price: 100 });
  });

  test('debería lanzar un error si el producto no existe', () => {
    expect(() => getProduct(1)).toThrow('El producto no existe');
  });
});

describe('updateProduct', () => {
  test('debería actualizar un producto por su id', () => {
    addProduct('Producto 1', 100);
    updateProduct(1, 'Producto 1 Actualizado', 150);
    const product = getProduct(1);
    expect(product).toEqual({ id: 1, name: 'Producto 1 Actualizado', price: 150 });
  });

  test('debería lanzar un error si el producto no existe', () => {
    expect(() => updateProduct(1, 'Producto 1 Actualizado', 150)).toThrow('El producto no existe');
  });

  test('debería actualizar sólo el precio', () => {
    addProduct('Producto 1', 100);
    updateProduct(1, undefined, 150);
    const product = getProduct(1);
    expect(product).toEqual({ id: 1, name: 'Producto 1', price: 150 });
  });

  test('debería actualizar sólo el nombre', () => {
    addProduct('Producto 1', 100);
    updateProduct(1, 'Producto 1 Actualizado', undefined);
    const product = getProduct(1);
    expect(product).toEqual({ id: 1, name: 'Producto 1 Actualizado', price: 100 });
  });
});
