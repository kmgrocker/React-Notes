import React from 'react'

const ProductDerivedState = () => {
   // const [selectedProd, setSelectedProd] = React.useState({});
   const [selectedProdId, setSelectedProdId] = React.useState({});
   const [products, setProducts] = React.useState([
     { id: 1, title: 'black-sneakres', quantity: 1 },
     { id: 2, title: 'red-tshirt', quantity: 1 },
     { id: 3, title: 'blue jeans', quantity: 1 },
   ]);
 
   const handleIncrement = (id) => {
     // const updatedProd = products.map((prod) => {
     //   return prod.id === id ? { ...prod, quantity: prod.quantity + 1 } : prod;
     // });
     // console.log(updatedProd);
     // setProducts(updatedProd);
 
     setProducts((prev) => {
       return prev.map((product) => {
         if (product.id === id) {
           return { ...product, quantity: product.quantity + 1 };
         } else {
           return product;
         }
       });
     });
   };
   const handleDecrement = (id) => {
     setProducts((prev) => {
       return prev.map((product) => {
         if (product.id === id) {
           return { ...product, quantity: product.quantity - 1 };
         } else {
           return product;
         }
       });
     });
   };
 
   // problem of not using derived state
 
   // const handleSelect = (id) => {
   //   const selectedtem = products.find((prod) => prod.id === id);
   //   setSelectedProd(selectedtem);
   // };
 
   const handleSelect = (id) => {
     // const selectedtem = products.find((prod) => prod.id === id);
     setSelectedProdId(id);
   };
 
   // deriving state from the product
   const findSelectedProduct = products.find(
     (prod) => prod.id === selectedProdId
   );
 
   return (
     <div>
       <h1>All Products</h1>
       {products.map((el) => {
         return (
           <div
             style={{
               width:'60%',
               margin:'1rem auto',
               display: 'flex',
               flexDirection: 'column',
               gap: 16,
               padding: '2% 0',
               marginTop: '3%',
               justifyContent: 'center',
               alignItems: 'center',
               border: '2px solid gray',
             }}
             key={el.id}
           >
             <div
               style={{
                 display: 'flex',
                 gap: 30,
                 justifyContent: 'space-around',
               }}
             >
               <div>
                 <button onClick={() => handleDecrement(el.id)}>-</button>
               </div>
               <div>{el.quantity}</div>
               <div>
                 <button onClick={() => handleIncrement(el.id)}>+</button>
               </div>
             </div>
             <div
               style={{
                 display: 'flex',
                 gap: 30,
                 justifyContent: 'center',
                 alignItems: 'center',
               }}
             >
               <div>{el.title}</div>
               <div>
                 <button onClick={() => handleSelect(el.id)}>choose</button>
               </div>
             </div>
           </div>
         );
       })}
 
       <h4 style={{ textAlign: 'center' }}>
         {' '}
         selected Product- {findSelectedProduct?.title}
       </h4>
       <p style={{ textAlign: 'center' }}>
         Selected Product Quantity <b>{findSelectedProduct?.quantity}</b>
       </p>
       {/* <button onClick={asyncInc}>Async inc</button> */}
     </div>
   );
}

export default ProductDerivedState