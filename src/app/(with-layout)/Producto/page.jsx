'use client'


import Image from 'next/image'
import Link from 'next/link'
import style from '../Cliente/Cliente.module.css'
import Input from '../../../components/Input'
import Select from '../../../components/Select'
import Button from '../../../components/Button'
import Subtitle from '../../../components/Subtitle'

import Tag from '../../../components/Tag'
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/Context.js'

import { useMask } from '@react-input/mask';
import { WithAuth } from '@/HOCs/WithAuth'


function Home() {

    const { cart, productDB, setUserProduct, setUserCart, setUserItem, item, tienda, setTienda } = useUser()

    const inputRefCard = useMask({ mask: '____ ____ ____ ____', replacement: { _: /\d/ } });
    const inputRefDate = useMask({ mask: '__/__', replacement: { _: /\d/ } });
    const inputRefCVC = useMask({ mask: '___', replacement: { _: /\d/ } });
    const router = useRouter()

    function HandlerCheckOut() {
        router.push('/Cliente/Comprar')
    }
    function HandlerReceta() {
        router.push('/Cliente/Recetar')
    }
    function seeMore() {
        router.push('/Producto')
    }
    const addCart = (e, i) => {
        e.preventDefault()
        e.stopPropagation()
        setUserCart({ ...cart, [i.uuid]: { ...i, cantidad: 1 } })
    }
    const addPlussCart = (e, i) => {
        e.preventDefault()
        e.stopPropagation()
        setUserCart({ ...cart, [i.uuid]: { ...i, cantidad: cart[i.uuid].cantidad + 1 } })
    }
    const addLessCart = (e, i) => {
        e.preventDefault()
        e.stopPropagation()
        const obj = { ...cart }
        delete obj[i.uuid]
        console.log(obj)

        cart[i.uuid].cantidad - 1 == 0
            ? setUserCart(obj)
            : setUserCart({ ...cart, [i.uuid]: { ...i, cantidad: cart[i.uuid].cantidad - 1 } })
    }
    console.log(item)
    return (
        item !== undefined ? <main className="relative  bg-white  lg:shadow-2xl top-[-15px] lg:top-0 left-0 right-0 mx-auto px-5 max-w-[900px] flex flex-col items-center lg:flex-row lg:justify-between lg:items-center pt-[20px] pb-[20px]  rounded-[5px]">


            {/* <div className='shadow-2xl rounded-[10px] overflow-hidden'> */}
            {/* <div className='bg-[#2a52BE] w-full p-5 lg:hidden'>
                    <div className=" font-bold text-[16px] mb-2 text-white">
                        {item['nombre de producto 1']}
                    </div>
                    <div className=" text-[14px] mb-2 text-white">
                        {item['nombre de producto 2']}
                    </div>
                    <div className="  text-[14px] mb-2 text-white">
                        {item['nombre de producto 3']}
                    </div>
                </div> */}

            <div className='flex flex-wrap bg-white border-[1px] border-gray-200 shadow-2xl lg:border-none lg:shadow-none  justify-center lg:justify-start md:max-w-[400px] '>
                <img src={item.url} className='lg:w-[90vw] lg:max-w-[400px] max-h-[200px] lg:max-h-[10000px] lg:px-10' alt="" />
                <div className='w-full flex justify-end  items-center p-5 lg:px-10'>
                    <div className="flex items-baseline text-gray-900">
                        <span className="text-[30px]  text-gray-600 font-extrabold tracking-tight">{item.costo}</span>
                        <span className="text-[16px] text-gray-600 font-semibold">BS</span>

                    </div>
                </div>
            </div>
       



            <div className=' lg:border-l shadow-2xl  bg-white lg:p-0'>
                <div className='bg-[#2a52BE] w-full p-5 '>
                    <div className=" font-bold text-[16px] mb-2 text-white">
                        {item['nombre de producto 1']}
                    </div>
                    <div className=" text-[14px] mb-2 text-white">
                        {item['nombre de producto 2']}
                    </div>
                    <div className="  text-[14px] mb-2 text-white">
                        {item['nombre de producto 3']}
                    </div>
                </div>
                <div className='px-5 bg-white'>


                    <Subtitle styled='text-left'>Descripción basica</Subtitle>
                    <p className='text-[14px] text-center'>{item['descripcion basica']}</p>
                    <br />
                    <Subtitle styled='text-left'>Descripción tecnica</Subtitle>
                    <p className='text-[14px] text-center'>{item['descripcion tecnica']}</p>
                    <br />
                    <Subtitle styled='text-left'>Uso frecuente</Subtitle>
                    <p className='text-[14px] text-center'>{item['uso frecuente']}</p>
                    <br />
                    <Subtitle>Cantidad</Subtitle>
                    <div className='relative flex w-full justify-center items-center'>
                        {cart && cart[item.uuid] && cart[item.uuid].cantidad !== undefined && cart[item.uuid].cantidad !== 0
                            ? <div className='flex w-[150px] justify-center'>
                                <Button theme='MiniPrimary' click={(e) => addLessCart(e, item)}>-</Button>
                                {cart && cart[item.uuid] && cart[item.uuid].cantidad !== undefined && cart[item.uuid].cantidad !== 0 && <span className='flex justify-center items-center text-[16px] text-right px-5 w-[40px] font-bold'> {cart[item.uuid].cantidad} </span>}
                                <Button theme='MiniSecondary' click={(e) => addPlussCart(e, item)}>+</Button>
                            </div>
                            : <Button theme='MiniPrimaryComprar' click={(e) => addCart(e, item)}>Comprar</Button>
                        }
                    </div>
                    <br />
                    <br />
                </div>

            </div>


            {/* </div> */}
            {Object.entries(cart).length !== 0 && <div className="fixed w-screen px-5 bottom-[70px] lg:w-[250px] lg:bottom-auto lg:top-[75px] lg:left-auto lg:right-5  z-20">
                {tienda === 'Recetar'
                    ? <Button theme="SuccessReceta" click={HandlerReceta}>Completar Receta</Button>
                    : <Button theme="SuccessBuy" click={HandlerCheckOut}>Ir a pagar</Button>}
            </div>}
        </main> : <div ></div>
    )
}
export default WithAuth(Home)