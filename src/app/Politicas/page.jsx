'use client'


import Subtitle from '@/components/Subtitle'

import { useRouter } from 'next/navigation';
import { useUser } from '@/context/Context.js'

import { useMask } from '@react-input/mask';
import { WithAuth } from '@/HOCs/WithAuth'


function Home() {

    const { cart, productDB, setUserProduct, setUserCart, setUserItem, item } = useUser()

    const inputRefCard = useMask({ mask: '____ ____ ____ ____', replacement: { _: /\d/ } });
    const inputRefDate = useMask({ mask: '__/__', replacement: { _: /\d/ } });
    const inputRefCVC = useMask({ mask: '___', replacement: { _: /\d/ } });
    const router = useRouter()

    function HandlerCheckOut() {
        router.push('/Cliente/Comprar')
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
        <main className="relative left-0 right-0 mx-auto p-5 mt-12 max-w-[900px] flex flex-col items-center lg:flex-row lg:justify-between lg:items-center pt-[20px] pb-[20px] bg-white rounded-[5px]">
           
           <div className='shadow-2xl p-5'>
            
            
            <div className='flex flex-wrap justify-center lg:justify-start md:max-w-[400px] '>
                <img src="/logo.png" className='lg:w-[90vw] lg:max-w-[400px] max-h-[200px] lg:max-h-[10000px] lg:px-10' alt="" />
            </div>
            <br />
            <div className='lg:pl-12 lg:border-l bg-gray-50 p-5 lg:bg-white  lg:p-0'>
                <Subtitle>Política de Servicio de la Aplicación "Precio Justo S.R.L."</Subtitle>
                {/* <h3 className='text-center'>Política de Servicio de la Aplicación "Precio Justo S.R.L." </h3> */}
                <p >

                    <br />
                    Esta aplicación móvil ofrece a la sociedad un servicio de comercio digital cuyo principal objetivo radica en la adaptación, específicamente para ser usado por diferentes empresas dedicadas a la venta de implantes de osteosíntesis y prótesis de uso humano; dentro de la aplicación se incorpora un buscador de productos y catálogo de empresas proveedoras permitiendo al usuario, el acceso a diferentes proformas en segundos, permitiendo la comparación de precios para adecuarse a las necesidades económicas de los usuarios a través de la cancelación de un código QR. Nuestra plataforma brinda además claridad y transparencia en el comercio de este tipo de productos evitando cualquier acto reñido con la moral promoviendo el libre comercio, optimizando la experiencia de adquisición de implantes de osteosíntesis y prótesis de uso humano como un intermediario para dicho objetivo. <br /> <br />
                    Entregas y retrasos: Nos esforzamos en garantizar que todas las entregas de implantes de osteosíntesis se realicen de manera oportuna. Sin embargo, existen factores más allá de nuestro control que pueden resultar en retrasos. Por cuánto no, nos hacemos responsables de los retrasos en las entregas que sean resultado de circunstancias fuera de nuestro control, tales como casos fortuitos y fuerza mayor (un evento de la naturaleza que es impredecible), entre otros. <br /><br />
                    Información del producto: Hacemos todo lo posible para garantizar que la información proporcionada sobre los implantes de osteosíntesis sea clara, precisa y actual. No obstante, no somos responsables de cualquier error, omisión o inexactitud en la información proporcionada por el fabricante, o distribuidor, tanto en permisos de distribución como de calidad. Recomendamos a los usuarios que verifiquen la información con el fabricante y/o distribuidor antes de realizar la adquisición del producto. <br /><br />
                    Calidad del producto: Los implantes de osteosíntesis son de alta calidad y cumplen con todas las regulaciones y estándares aplicables por ley en Bolivia. Sin embargo, no se garantiza los resultados clínicos obtenidos tras su utilización, ya que estos pueden variar dependiendo de factores individuales del paciente y la habilidad en cuanto a la experiencia del cirujano; siendo que solo somos un ente intermediario para su adquisición. <br /><br />
                    Devoluciones y reembolsos: Aceptamos devoluciones y reembolsos solo en caso de que los productos estén defectuosos o no sean como se describen en la aplicación. No podemos aceptar devoluciones de productos que ya hayan sido utilizados, a menos que estén defectuosos.(es menester indicar que se tiene el plazo que otorga la ley del consumidor para la correspondiente devolución y desembolso, a realizar después de haber adquirido dicho producto. El rembolso será realizado por el proveedor; siendo que solo somos un ente intermediario para su adquisición). Se retendrá el 5% del costo de la transacción como gastos operativos, aclarando una vez más que el rembolso será sobre la base del 95%. <br /><br />
                    Uso adecuado: Los implantes de osteosíntesis deben ser utilizados únicamente por profesionales de la salud capacitados. No, nos hacemos responsables por el mal uso de los productos, incluyendo su utilización sin la debida formación y capacitación. <br /><br />
                    Esta política de servicio está diseñada para proporcionar una guía clara y transparente a nuestros usuarios. Asegúrese de leer y entender completamente nuestra política antes de realizar una compra. Si tiene alguna pregunta o inquietud, no dude en ponerse en contacto con nuestro equipo de atención al cliente, que se encuentra en nuestra plataforma en horario de oficia.
                    Por favor, tenga en cuenta que al utilizar nuestra aplicación, usted está aceptando los términos y condiciones expuestos en esta política de servicio, los cuales podrán generar aspectos legales ante cualquier altercado de acuerdo a nuestra legislación y jurisdicción Boliviana.
                    Asimismo nos complace informarle que cumplimos con todas las regulaciones y requisitos legales aplicables en nuestra empresa.
                </p>
                <br />
                {/* <Subtitle>Politicas de Privacidad de Datos</Subtitle> */}
            </div>
            
            
            </div> 
        </main>
    )
}
export default Home


