'use client'

import Button from '@/components/Button'
import Subtitle from '@/components/Subtitle'
import Select from '@/components/Select'
import { useUser } from '@/context/Context.js'
import Tag from '@/components/Tag'
import { useRouter } from 'next/navigation';
import { WithAuth } from '@/HOCs/WithAuth'
import { useEffect, useState } from 'react'
import { writeUserData, readUserData, updateUserData, deleteUserData } from '@/supabase/utils'
import { uploadStorage } from '@/supabase/storage'
import Input from '@/components/Input'
import { generateUUID } from '@/utils/UIDgenerator'
import LoaderBlack from '@/components/LoaderBlack'
import { disponibilidad as dispo } from '@/constants'
import Modal from '@/components/Modal'

function Home() {
    const { user, userDB, pedidos, setUserPedidos, distributorPDB, setUserDistributorPDB, setUserItem, setUserData, setUserSuccess, modal, setModal, success, item,  } = useUser()

    const router = useRouter()
    const [state, setState] = useState({})
    const [postImage, setPostImage] = useState({})
    const [urlPostImage, setUrlPostImage] = useState({})
    const [disponibilidad, setDisponibilidad] = useState('')
    const [categoria, setCategoria] = useState('')
    const [sistema, setSistema] = useState('')
    const [id, setId] = useState('')
    function seeMore() {
        router.push('/Producto')
    }
 


    console.log(distributorPDB)





    const importacionConfirm = async (e) => {
        setModal('')

        setUserSuccess('Actualizando')
        const queryUuid = e === 'Importar PrecioJustoSRL' ? 'Precio-Justo-SRL-Data' : id

        const data = await readUserData('Producto', queryUuid, null, 'distribuidor')
        await deleteUserData('Producto', user.uuid, 'distribuidor')
        data.map(async i => {
            const obj = { ...i }
            delete obj.id
            return await writeUserData('Producto', { ...obj, uuid: generateUUID(), distribuidor: user.uuid }, user.uuid, userDB, setUserData, setUserSuccess, 'Se ha guardado correctamente', 'Perfil')
        })
        setUserDistributorPDB(undefined)
        await readUserData('Producto', user.uuid, setUserDistributorPDB, 'distribuidor')
        return setUserSuccess('')
    }

    const importacionHandler = async (e) => {
        const queryUuid = e === 'Importar PrecioJustoSRL' ? 'Precio-Justo-SRL-Data' : id

        const data = await readUserData('Producto', queryUuid, null, 'distribuidor')

        if (data.length === 0) {
        setModal('No Data')
            return
        }

        if (distributorPDB !== null && distributorPDB !== undefined) {
            setModal(e)
        }
    }


    async function save(i) {
        await updateUserData('Producto', state[i.uuid], i.uuid)
        postImage[i.uuid] && await uploadStorage('Producto', postImage[i.uuid], i.uuid, updateUserData, true)
        const obj = { ...state }
        delete obj[i.uuid]
        setState(obj)
        readUserData('Producto', user.uuid, setUserDistributorPDB, 'distribuidor')
    }
    async function deletConfirm() {
        await updateUserData('Producto', {...state[item.uuid], archivado: false}, item.uuid)
        // postImage[item.uuid] && await uploadStorage('Producto', postImage[item.uuid], item.uuid, updateUserData, true)
        const obj = { ...state }
        delete obj[item.uuid]
        setState(obj)
        readUserData('Producto', user.uuid, setUserDistributorPDB, 'distribuidor')
        setModal('')

    }
    function delet(i) {
        setUserItem(i)
        setModal('Delete')
        console.log(item)
    }
    function redirect() {
        router.push('/Distribuidor/Agregar')
    }
    function sortArray(x, y) {
        if (x['nombre de producto 1'].toLowerCase() < y['nombre de producto 1'].toLowerCase()) { return -1 }
        if (x['nombre de producto 1'].toLowerCase() > y['nombre de producto 1'].toLowerCase()) { return 1 }
        return 0
    }
    console.log(distributorPDB)
    function seeMore() {
        router.push('/Producto')
    }
    const onClickHandlerCategory = (name, value, uuid) => {
        setState({ ...state, [uuid]: { ...state[uuid], uuid, ['estado']: value } })
    }

    const onClickHandlerCity = (name, value, uuid) => {
        setState({ ...state, [uuid]: { ...state[uuid], uuid, ['ciudad']: value } })
    }

    function manageInputIMG(e, uuid) {
        const file = e.target.files[0]
        setPostImage({ ...postImage, [uuid]: file })
        setUrlPostImage({ ...urlPostImage, [uuid]: URL.createObjectURL(file) })
        setState({ ...state, [uuid]: { ...state[uuid], uuid } })
    }

    const onClickHandlerAvailability = (name, value, uuid) => {
        setState({ ...state, [uuid]: { ...state[uuid], uuid, ['disponibilidad']: value } })
    }

    function onChangeHandler(e, i) {
        setState({ ...state, [i.uuid]: { ...state[i.uuid], uuid: i.uuid, [e.target.name]: e.target.value } })
    }

    function save(i) {
        updateUserData('Pedido', state[i.uuid], i.uuid)
        const obj = { ...state }
        delete obj[i.uuid]
        setState(obj)
    }

    function delet(i) {
        deleteUserData('Pedido', i.uuid)
        // postImage[i.uuid] && uploadStorage('Producto', postImage[i.uuid], i.uuid, updateUserData, true)
        // const obj = { ...state }
        // delete obj[i.uuid]
        // setState(obj)
    }
    console.log(state)
    useEffect(() => {
        readUserData('Pedido', user.uuid, setUserPedidos,  'distribuidor')
    }, [])

    return (
        <div className='h-full'> 
        <div className="relative overflow-x-auto h-full  overflow-y-auto shadow-2xl p-5 bg-white min-h-[80vh]">
       
            <div className='min-w-[1900px] flex justify-start items-center my-5 '>
                <h3 className="flex pr-12 text-[14px]" htmlFor="">Disponibilidad</h3>
                <div className="grid grid-cols-3 gap-4 w-[500px] ">
                    <Tag theme={disponibilidad == 'En 24 hrs' ? 'Primary' : 'Secondary'} click={() => setDisponibilidad(disponibilidad == 'En 24 hrs' ? '' : 'En 24 hrs ')}>En 24 hrs</Tag>
                    <Tag theme={disponibilidad == 'Inmediatamente' ? 'Primary' : 'Secondary'} click={() => setDisponibilidad(disponibilidad == 'Inmediatamente' ? '' : 'Inmediatamente')}>Inmediatamente</Tag>
                    <Tag theme={disponibilidad == 'No disponible' ? 'Primary' : 'Secondary'} click={() => setDisponibilidad(disponibilidad == 'No disponible' ? '' : 'No disponible')}>No disponible</Tag>
                </div>
            </div>
            <div className='min-w-[1900px] flex justify-start items-center my-5  '>      
                <h3 className="flex pr-12 text-[14px]">Categorias</h3>
                <div className="grid grid-cols-3 gap-4 w-[500px] " >
                    <Tag theme={categoria == 'Titanio' ? 'Primary' : 'Secondary'} click={() => setCategoria(categoria == 'Titanio' ? '' : 'Titanio')}>Titanio</Tag>
                    <Tag theme={categoria == 'Acero' ? 'Primary' : 'Secondary'} click={() => setCategoria(categoria == 'Acero' ? '' : 'Acero')}>Acero</Tag>
                    <Tag theme={categoria == 'Otros' ? 'Primary' : 'Secondary'} click={() => setCategoria(categoria == 'Otros' ? '' : 'Otros')}>Otros</Tag>
                </div>
            </div>
            <div className='min-w-[1900px] flex justify-start items-center my-5 '>
                <h3 className="flex pr-12 text-[14px]" htmlFor="">Sistema</h3>
                <div className="gap-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 100px) 100px 100px 100px 200px 200px 100px' }}>
                    <Tag theme={sistema == '1.5' ? 'Primary' : 'Secondary'} click={() => setSistema(sistema == '1.5' ? '' : '1.5')}>1.5</Tag>
                    <Tag theme={sistema == '2.0' ? 'Primary' : 'Secondary'} click={() => setSistema(sistema == '2.0' ? '' : '2.0')}>2.0</Tag>
                    <Tag theme={sistema == '2.4' ? 'Primary' : 'Secondary'} click={() => setSistema(sistema == '2.4' ? '' : '2.4')}>2.4</Tag>
                    <Tag theme={sistema == '2.5' ? 'Primary' : 'Secondary'} click={() => setSistema(sistema == '2.5' ? '' : '2.5')}>2.5</Tag>
                    <Tag theme={sistema == '2.7' ? 'Primary' : 'Secondary'} click={() => setSistema(sistema == '2.7' ? '' : '2.7')}>2.7</Tag>
                    <Tag theme={sistema == '3.5' ? 'Primary' : 'Secondary'} click={() => setSistema(sistema == '3.5' ? '' : '3.5')}>3.5</Tag>
                    <Tag theme={sistema == '4.5' ? 'Primary' : 'Secondary'} click={() => setSistema(sistema == '4.5' ? '' : '4.5')}>4.5</Tag>
                    <Tag theme={sistema == 'Clavos' ? 'Primary' : 'Secondary'} click={() => setSistema(sistema == 'Clavos' ? '' : 'Clavos')}>Clavos</Tag>
                    <Tag theme={sistema == 'Protesis' ? 'Primary' : 'Secondary'} click={() => setSistema(sistema == 'Protesis' ? '' : 'Protesis')}>Protesis</Tag>
                    <Tag theme={sistema == 'Costillas' ? 'Primary' : 'Secondary'} click={() => setSistema(sistema == 'Costillas' ? '' : 'Costillas')}>Costillas</Tag>
                    <Tag theme={sistema == 'Columna y neurocirugía' ? 'Primary' : 'Secondary'} click={() => setSistema(sistema == 'Columna y neurocirugía' ? '' : 'Columna y neurocirugía')}>Columna y neurocirugía</Tag>
                    <Tag theme={sistema == 'Fijadores externos' ? 'Primary' : 'Secondary'} click={() => setSistema(sistema == 'Fijadores externos' ? '' : 'Fijadores externos')}>Fijadores externos</Tag>
                    <Tag theme={sistema == 'Otros' ? 'Primary' : 'Secondary'} click={() => setSistema(sistema == 'Otros' ? '' : 'Otros')}>Otros</Tag>
                </div>
            </div>
            <table className=" min-w-full lg:w-full lg:min-w-[1900px] text-[12px] text-left text-gray-500 border-t-4 border-gray-400">
                <thead className="text-[12px] text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col-3" className="px-3 py-3">
                            #
                        </th>
                        <th scope="col-3" className="px-3 py-3">
                            Paciente
                        </th>
                        <th scope="col" className="px-3 py-3">
                            Producto
                        </th>
                        <th scope="col" className="px-3 py-3">
                            Cantidad
                        </th>
                        <th scope="col" className="px-3 py-3">
                            Envio
                        </th>
                        <th scope="col" className="px-3 py-3">
                            Estado
                        </th>
                        <th scope="col" className="px-3 py-3">
                            Fecha
                        </th>
                        <td className="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                            Costo
                        </td>
                        <td className="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                            Debito
                        </td>
                        <th scope="col-3" className="px-3 py-3">
                            Celular
                        </th>
                        <th scope="col-3" className="px-3 py-3">
                            Correo
                        </th>
                        <th scope="col" className="px-3 py-3">
                            Eliminar
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {pedidos && pedidos !== undefined && pedidos.map((i, index) => {
                        return <tr className="bg-white text-[12px] border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={index}>
                            <td className="px-3 py-4  flex font-semibold text-gray-900 dark:text-white">
                                <span className='h-full flex py-2'>{index + 1}</span>
                            </td>
                            <td className="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                {i['nombre del paciente']}
                            </td>
                            <td className="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                            {JSON.parse(i.compra).map((el, index) => <li key={index}>{el['nombre de producto 1']}{' *('}{el['cantidad']}{')'}</li>)}
                            </td>
                            <td className="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                {i['cantidad']}
                            </td>
                            <td className="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                {i['envio'] == true ? 'Yes' : 'Non'}
                            </td>
                            <td className="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                <Select arr={['Nuevo', 'Atendido', 'Felicitaciones']} name='estado' defaultValue={i.estado} uuid={i.uuid} click={onClickHandlerCategory} />
                                {/* {i['costo']} */}
                            </td>
                            <td className="px-3 py-4 h-full font-semibold text-gray-900 dark:text-white">
                                {getDayMonthYear(i['created_at'])}
                            </td>
                            <td className="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                {i['amount']}
                            </td>
                            <td className="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                {i['message'] === 'Correcto' ? 'Sin deuda' : 'Sin cancelar'}
                            </td>
                            <td className="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                {i['celular del paciente']}
                            </td>
                            <td className="px-3 py-4 font-semibold text-gray-900 dark:text-white">
                                {i['correo'] === 'Correcto' ? 'Sin deuda' : 'Sin cancelar'}
                            </td>
                            <td className="px-3 py-4">
                                {state[i.uuid]
                                    ? <Button theme={"Primary"} click={() => save(i)}>Guardar</Button>
                                    : <Button theme={"Danger"} click={() => delet(i)}>Eliminar</Button>
                                }
                            </td>
                        </tr>
                    })
                    }
                </tbody>
            </table>
        </div>
        </div>
    )
}




export default WithAuth(Home)



