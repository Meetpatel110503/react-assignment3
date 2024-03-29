import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { emptyCart, removeFromCart } from "../../redux/action/cartSlice"

function Cart() {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const navigate = useNavigate()

  const [itemCounts, setItemCounts] = useState(
    Object.fromEntries(cart.map((item) => [item.id, 1]))
  )

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId))
  }

  const handleIncrease = (productId) => {
    setItemCounts({
      ...itemCounts,
      [productId]: itemCounts[productId] + 1,
    })
  }

  const checkout = () => {
    dispatch(emptyCart())
    toast.success("your order has been confirmed.")
    navigate("/checkout")
  }

  const handleDecrease = (productId) => {
    if (itemCounts[productId] > 1) {
      setItemCounts({
        ...itemCounts,
        [productId]: itemCounts[productId] - 1,
      })
    }
  }

  const calculateTotalPrice = () => {
    let totalPrice = 0
    cart.forEach((item) => {
      totalPrice += item.price * itemCounts[item.id]
    })
    return totalPrice.toFixed(2)
  }

  return (
    <div>
      {cart.length === 0 ? (
        <div className='flex justify-center items-center pt-28'>
          <img
            src='https://cdn.dribbble.com/users/844846/screenshots/2981974/media/ae264d741cae09c2377235d9705f9cbc.png?resize=400x300&vertical=center'
            alt='Empty Cart'
            className='h-96'
          />
        </div>
      ) : (
        <div className='flex flex-col items-center mt-3'>
          {cart.map((item) => (
            <div
              key={item.id}
              className='flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100  mt-3  w-1/2'
            >
              <img
                className='object-cover rounded-t-lgmd:h-auto h-48 md:rounded-none md:rounded-s-lg p-3'
                src={item.image}
                alt='cart image'
              />
              <div>
                <div className='flex flex-col justify-between p-4 leading-normal'>
                  <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 '>
                    {item.title}
                  </h5>
                  <p className='mb-3 font-normal text-gray-700 '>
                    Price: ${item.price}
                  </p>
                  <div className='flex items-center space-x-2'>
                    <button
                      className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm p-2'
                      onClick={() => handleDecrease(item.id)}
                    >
                      -
                    </button>
                    <p>{itemCounts[item.id]}</p>
                    <button
                      className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm p-2'
                      onClick={() => handleIncrease(item.id)}
                    >
                      +
                    </button>
                  </div>
                  <span>
                    <button
                      className='text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm p-2 mt-2 w-20'
                      onClick={() => {
                        handleRemove(item.id)
                        toast.success("item removed successfully")
                      }}
                    >
                      Remove
                    </button>
                  </span>
                </div>
              </div>
            </div>
          ))}
          <h2 className='font-bold text-2xl mt-3'>
            Total: ${calculateTotalPrice()}
          </h2>

          <button
            type='button'
            onClick={checkout}
            className='w-56 text-center text-white bg-blue-500 py-2 my-4 mb-12 rounded font-bold text-xl hover:bg-blue-700'
          >
            CHECKOUT
          </button>
        </div>
      )}
    </div>
  )
}

export default Cart
