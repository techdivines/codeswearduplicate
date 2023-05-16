import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineShoppingCart, AiFillCloseCircle, AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/Ai';
import { MdShoppingCartCheckout, MdAccountCircle } from 'react-icons/Md';
// import User from '@/models/User';



const Navbar = ({ logout, user, cart, addToCart, removeFromCart, clearCart, subTotal }) => {
    const [dropdown, setDropdown] = useState(false)

    const toggleCart = () => {
        if (ref.current.classList.contains('translate-x-full')) {
            ref.current.classList.remove('translate-x-full')
            ref.current.classList.add('translate-x-0')
        }
        else if (!ref.current.classList.contains('translate-x-full')) {
            ref.current.classList.remove('translate-x-0')
            ref.current.classList.add('translate-x-full')
        }

    }
    const ref = useRef()
    return (
        <div className="flex flex-col md:flex-row md:justify-start sticky top-0 bg-white z-10 justify-center items-center py-2 shadow-xl">
            <div className="logo mx-5">
                <Link href={'/'}><Image width={100} height={20} src='/logo.jpg' alt="" /></Link>
            </div>
            <div className="nav">
                <ul className="flex items-center space-x-4 font-bold">
                    <Link href={'/tshirts'}><li className='hover:text-pink-600'>Tshirts</li></Link>
                    <Link href={'/hoodies'}><li className='hover:text-pink-600'>Hoodies</li></Link>
                    <Link href={'/stickers'}><li className='hover:text-pink-600'>Stickers</li></Link>
                    <Link href={'/mugs'}><li className='hover:text-pink-600'>Mugs</li></Link>
                </ul>
            </div>
            <div className="cursor-pointer cart absolute right-3 top-4 mx-5 flex">
                <a onMouseOver={() => { setDropdown(true) }} onMouseLeave={() => { setDropdown(false) }} >

                    {dropdown && <div onMouseOver={() => { setDropdown(true) }} onMouseLeave={() => { setDropdown(false) }} className="absolute right-8 bg-white shadow-lg border top-6 py-4 rounded-md px-5 w-36">
                        <ul>
                            <Link href={'/orders'}><li className='text-sm py-1 hover:text-pink-700 font-bold '>
                                Orders
                            </li></Link>
                            <Link href={'/myaccount'}><li className='text-sm py-1 hover:text-pink-700 font-bold'>
                                My Account
                            </li></Link>
                            <li onClick={logout} className='text-sm py-1 hover:text-pink-700 font-bold'>
                                Log Out
                            </li>
                        </ul>
                    </div>}

                    {user.value && <MdAccountCircle className='text-xl md:text-3xl mx-2' />}

                </a>

                {!user.value &&
                    <Link href={'/login'}>
                        <button className='bg-pink-600 px-2 py-1 rounded-md text-sm text-white mx-2'>Log In</button>
                    </Link>}
                <AiOutlineShoppingCart onClick={toggleCart} className='text-xl md:text-3xl' />
            </div>


            {/* <div ref={ref} className="z-50 w-72 sideCart absolute top-0 right-0 bg-pink-100 px-8 py-10 transform transition-transform translate-x-full"> */}
            <div ref={ref} className={`w-72 h-[100vh] sideCart overflow-y-scroll absolute top-0 right-0 bg-pink-100 px-8 py-10 transform transition-transform ${Object.keys(cart).length !== 0 ? 'translate-x-0' : 'translate-x-full'}`}>
                <h2 className="font-bold text-center text-xl">Shopping Cart</h2>
                <span onClick={toggleCart} className="absolute top-5 right-2 cursor-pointer text-2xl text-pink-500"><AiFillCloseCircle /></span>
                <ol className='list-decimal font-semibold'>
                    {Object.keys(cart).length == 0 && <div className='my-4 font-semibold'>No item in the cart</div>}
                    {Object.keys(cart).map((k) => {
                        return <li key={k}>
                            <div className="item flex my-2">
                                <div className='w-2/3 font-semibold'>{cart[k].name}({cart[k].size}/{cart[k].variant})</div>
                                <div className='flex items-center justify-center w-1/3 font-semibold'> <AiFillMinusCircle onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='cursor-pointer text-pink-500' /><span className="mx-2">{cart[k].qty}</span><AiFillPlusCircle onClick={() => { addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='cursor-pointer text-pink-500' /> </div>
                            </div>
                        </li>
                    })}
                </ol>

                <div className="font-bold my-2 total">SubTotal: {subTotal} </div>


                <div className="flex">
                    <Link href={'/checkout'}><button class="flex mr-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-sm"><MdShoppingCartCheckout className='m-1' />Checkout</button></Link>

                    <button onClick={clearCart} class="flex mr-2 text-white bg-pink-500 border-0 py-2 px-3 focus:outline-none hover:bg-pink-600 rounded text-sm">Clear Cart</button>
                </div>
            </div>

        </div>
    )
}

export default Navbar


