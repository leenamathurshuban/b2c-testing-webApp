// yourReducer.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const cartItems = (
  state,
  oldCart,
  attributeName,
  product,
  quantity,
  remaningQty,
  url,
  proVariant
) => {
  const { id, name, variations,title,images } = product;
  const cartDataIndex = oldCart.findIndex(
    (e) => e.productID === id && e.id === variations?.id
  );

  if (cartDataIndex !== -1) {
    oldCart[cartDataIndex].quantity += quantity;
    oldCart[cartDataIndex].remaningQty = remaningQty;
  } else {
    const data = {
      attributeName,
      productID: id,
      productName: title,
      id: variations?.id,
      name: variations?.name ?? title,
      price: Number(variations?.price || 0).toFixed(2),
      image_url: variations?.images?.[0]?.src ?? images?.[0]?.src,
      quantity,
      remaningQty,
      url,
      proVariant,
      variations: proVariant ? variations : {},
    };
    // state.cart.push(data);
    oldCart.push(data);
  }
  state.cart = [...oldCart];
};

const initialState = {
  cart: [],
  count: 0,
  subTotal: 0,
  totalAmount: 0,
  shipping: 0,
  childCollectionData: [],
  active: process.env.NEXT_PUBLIC_MAC_PART_INITIAL_ID, 
  activeTab: '',
  productTitle:'',
  categoryName:'',
};

const counterSlice = createSlice({
  name: "counterSlice",
  initialState,
  reducers: {
    cartIncrement: (state, action) => {
      const { id, productID } = action.payload;
      const cartIndex = state.cart.findIndex(
        (item) => item.id === id && item.productID === productID
      );

      if (cartIndex !== -1 && state.cart[cartIndex].quantity !== undefined) {
        if (state.cart[cartIndex].remaningQty > 0) {
          state.cart[cartIndex].quantity += 1;
          state.cart[cartIndex].remaningQty -= 1;
          state.count += 1;
        } else {
          toast("You have reached the product limit.", {
            icon: "⚠️",
            id: "reachedLimit",
          });
        }
      }
    },
    cartDecrement: (state, action) => {
      const { id, productID } = action.payload;
      const cartIndex = state.cart.findIndex(
        (item) => item.id === id && item.productID === productID
      );
      if (cartIndex !== -1 && state.cart[cartIndex].quantity !== undefined) {
        if (state.cart[cartIndex].quantity > 1) {
          state.cart[cartIndex].quantity -= 1;
          state.cart[cartIndex].remaningQty += 1;
          state.count -= 1;
        } else {
          // const updateCart = state.cart.filter(
          //   (item) => !(item.id === id && item.productID === productID)
          // );
          // state.cart = updateCart;
          // state.count -= 1;
        }
      }
    },
    addToCart: (state, action) => {
      const {
        localData,
        attributeName,
        product,
        quantity,
        remaningQty,
        url,
        proVariant,
      } = action.payload;
      const {
        cart: oldCart,
        count: oldCount,
        shipping: oldShipping,
        subTotal: oldSubTotal,
        totalAmount: oldTotalAmount,
      } = JSON.parse(JSON.parse(localData).counter);

      cartItems(
        state,
        oldCart,
        attributeName,
        product,
        quantity,
        remaningQty,
        url,
        proVariant
      );  
      state.count = oldCount + quantity;
      state.shipping = oldShipping;
      state.subTotal = oldSubTotal;
      state.totalAmount = oldTotalAmount;
    },
    removeToCart: (state, action) => {
      const { id, productID, productQuantity } = action.payload;
      const updateCartItem = state.cart.filter(
        (e) => !(e.id === id && e.productID === productID)
      );
      state.cart = updateCartItem;
      state.count -= productQuantity;
    },
    cartBlank: (state, action) => {
      state.cart = [];
      state.count = 0;
    },
    getSubTotal: (state, action) => {
      state.subTotal = state.cart
        .reduce((acc, item) => {
          return acc + parseFloat(item.price) * item.quantity;
        }, 0)
        .toFixed(2);
    },
    getTotal: (state, action) => {
      const subTotal = parseFloat(state.subTotal);
      const shipping = parseFloat(state.shipping);
      state.totalAmount = (subTotal + 0).toFixed(2);
    },
    updateCartStock: (state, action) => {
      state.cart = action.payload.qtyData;
      const countData = action.payload.qtyData.reduce(
        (accumulator, currentItem) => {
          return accumulator + currentItem.quantity; // Fixed the calculation
        },
        0
      );
      state.count = countData;
    },
     setChildCollectionData: (state, action) => {
      state.childCollectionData = action.payload.data;
    },
    setActive: (state, action) => {
      state.active = action.payload;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload?action.payload:"";
    },
    setProductTitle:(state,action)=>{
      state.productTitle = action.payload?action.payload:"";
    },
    setCategoryName:(state,action)=>{
      state.categoryName = action.payload?action.payload:""
    }
  },
});

export const {
  cartIncrement,
  cartDecrement,
  addToCart,
  removeToCart,
  cartBlank,
  getSubTotal,
  getTotal,
  updateCartStock,
  setChildCollectionData,
  setActive,
  setActiveTab,
  setProductTitle,
  setCategoryName,
} = counterSlice.actions;
export default counterSlice.reducer;
