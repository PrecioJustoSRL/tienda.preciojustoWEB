'use client'

import Button from '@/components/Button'
import Select from '@/components/Select'
import { useUser } from '@/context/Context.js'
import Modal from '@/components/Modal'

import Tag from '@/components/Tag'
import { useRouter } from 'next/navigation';

import { WithAuth } from '@/HOCs/WithAuth'
import { useEffect, useState } from 'react'
import { writeUserData, readUserData, updateUserData, deleteUserData } from '@/supabase/utils'
import { uploadStorage } from '@/supabase/storage'


function Home() {
    const { user, userDB, modal, setModal, msg, userUuid, setMsg, recetaDBP, setRecetaDBP, setUserItem, item, setUserData, setUserSuccess, } = useUser()

    const router = useRouter()

    const [state, setState] = useState({})
    const [postImage, setPostImage] = useState({})
    const [urlPostImage, setUrlPostImage] = useState({})
    const [filter, setFilter] = useState('')

    function onChangeFilter(e) {
        setFilter(e.target.value.toLowerCase())
    }

    function onChangeHandler(e, i) {
        console.log(i)
        setState({ ...state, [i.qr]: { ...state[i.qr], qr: i.qr, [e.target.name]: e.target.value } })
    }

    function save(e, i) {
        console.log(state[i.qr])
        e.preventDefault()
        updateUserData('Receta', state[i.qr], i.qr, 'qr')
        const obj = { ...state }
        delete obj[i.qr]
        setState(obj)
    }
    function delet(i, data) {
        setUserItem(i)
        setModal(data)
    }
    async function deletConfirm(e) {
        e.preventDefault()
        await deleteUserData('Receta', item.qr, 'qr')
        readUserData('Receta', userUuid, setRecetaDBP, 'medico',)

        // postImage[i.uuid] && uploadStorage('Producto', postImage[i.uuid], i.uuid, updateUserData, true)
        // const obj = { ...state }
        // delete obj[i.uuid]
        // setState(obj)
        setModal('')
    }
    function sortArray(x, y) {
        if (x['paciente'].toLowerCase() < y['paciente'].toLowerCase()) { return -1 }
        if (x['paciente'].toLowerCase() > y['paciente'].toLowerCase()) { return 1 }
        return 0
    }

    useEffect(() => {

        readUserData('Receta', userUuid, setRecetaDBP, 'medico')
    }, [])

    return (

        <div className='h-full'> 
        <div className="relative h-full overflow-x-auto shadow-2xl p-5 bg-white min-h-[80vh] ">
            {modal === 'Delete' && <Modal funcion={deletConfirm}>Estas seguro de ELIMINAR al siguiente usuario {msg}</Modal>}
            <h3 className='font-medium text-[16px]'>Recetas</h3>
            <br />
            <div className='flex justify-center w-full'>
                <input type="text" className='border-b border-gray-300 gap-4 text-center focus:outline-none  w-[300px]' onChange={onChangeFilter} placeholder='Filtrar por nombre de paciente' />
            </div>
            <br />
            <table className="w-full min-w-[700px] text-[12px] text-left text-gray-500 border-t-4 border-gray-400">
                <thead className="text-[12px] text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-3 py-3">
                            #
                        </th>
                        <th scope="col" className="px-3 py-3">
                            Paciente
                        </th>
                        <th scope="col" className="px-3 py-3">
                            Diagnostico
                        </th>
                        <th scope="col" className="px-3 py-3">
                            Hospital
                        </th>
                        <th scope="col" className="px-3 py-3">
                            Receta
                        </th>
                        {/* <th scope="col" className="px-3 py-3">
                            Edit
                        </th> */}
                    </tr>
                </thead>
                <tbody>
                    {recetaDBP && recetaDBP !== undefined && recetaDBP.sort(sortArray).map((i, index) => {
                        return i.paciente.toLowerCase().includes(filter) && <tr className="bg-white text-[12px] border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={index}>
                            <td className="px-3 py-4  flex text-gray-900 dark:text-white">
                                <span className='h-full flex py-2'>{index + 1}</span>
                            </td>
                            <td className="px-3 py-4 text-gray-900 dark:text-white">
                                {/* <textarea id="message" rows="6" onChange={(e) => onChangeHandler(e, i)} cols="6" name='paciente' defaultValue={i['paciente']} className="block p-1.5  w-full h-full text-sm text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder="Escribe aquí..."></textarea> */}
                                {i['paciente']}
                            </td>
                            <td className="px-3 py-4 text-gray-900 dark:text-white">
                                {i['diagnostico']}
                            </td>
                            <td className="px-3 py-4 text-gray-900 dark:text-white">
                                {i['hospital']}
                            </td>
                            <td className="px-3 py-4 text-gray-900 dark:text-white ">
                                {JSON.parse(i.receta).map((i, index) =>
                                    <li>{i['nombre de producto 1']}{'  (*'}{i['cantidad']}{')'}</li>
                                )}
                            </td>
                            {/* <td className="px-3 py-4">
                                {state[i.qr]
                                    ? <Button theme={"Primary"} click={(e) => save(e, i)}>Guardar</Button>
                                    : <Button theme={"Danger"} click={() => delet(i, 'Delete')}>Eliminar</Button>
                                }
                            </td> */}
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
