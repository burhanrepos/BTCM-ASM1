import React, { Dispatch, useState } from "react";


function ProductCategoryRow({ category }:{category:React.ReactNode}) {
  return (
    <tr>
      <th >
        {category}
        
      </th>
    </tr>
  );
}

function ProductRow({ product }:{product:PRODUCT}) {
  const name = product.stocked ? product.name :
    <span style={{ color: 'red' }}>
      {product.name}
    </span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({ products,filterText,inStockOnly }:{products:PRODUCT[],filterText:string,inStockOnly:boolean}) {
  const rows:any = [];
  let lastCategory:string | null = null;

  products.forEach((product) => {
    if (
      product.name.toUpperCase().indexOf(
        filterText.toUpperCase()
      ) === -1
    ) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
    );
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar({ filterText,inStockOnly,setFilterText,setInStockOnly}:{filterText:string,inStockOnly:boolean,setFilterText:Dispatch<string>,setInStockOnly:Dispatch<boolean>}) {
  return (
    <form>
    <input 
    type="text" 
    value={filterText} 
    placeholder="Search..."
    onChange={(e)=>{
      setFilterText(e.target.value)
    }}
    />
  <label>
    <input 
      type="checkbox" 
      onChange={(e)=>{
        setInStockOnly(e.target.checked)
      }}
      checked={inStockOnly} />

    Only show products in stock
  </label>
</form>
  );
}

interface Search{
  filterText:string,
  inStockOnly:boolean
}

function FilterableProductTable({ products }:{products:PRODUCT[]}) {
  const [filterText,setFilterText]=useState<string>("")
  const [inStockOnly,setInStockOnly]=useState<boolean>(false)
  return (
    <div>
      <SearchBar 
      filterText={filterText} 
        inStockOnly={inStockOnly} 
        setFilterText={setFilterText} 
        setInStockOnly={setInStockOnly} />
      <ProductTable products={products}
        filterText={filterText}
        inStockOnly={inStockOnly} />
    </div>
  );
}

const PRODUCTS:PRODUCT[] = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];

interface PRODUCT{
  category: string,
   price:string, 
   stocked:boolean,
    name: string
  }
export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}