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
    const { user, userDB, modal, setModal, msg, setMsg, recetaDBP, setRecetaDBP, setUserItem, item, setUserData, setUserSuccess, } = useUser()

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
        readUserData('Receta', user.uuid, setRecetaDBP, 'medico',)

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
        readUserData('Receta', user.uuid, setRecetaDBP, 'medico')
    }, [])

    return (

        <div className="relative overflow-x-auto shadow-2xl p-5   bg-white min-h-[80vh]">
            {modal === 'Delete' && <Modal funcion={deletConfirm}>Estas seguro de ELIMINAR al siguiente usuario {msg}</Modal>}
            <h3 className='font-medium text-[16px]'>Recetas</h3>
            <br />
            <div className='flex justify-center w-full'>
                <input type="text" className='border-b text-[16px] border-gray-300 gap-4 text-center focus:outline-none  w-[300px]' onChange={onChangeFilter} placeholder='Filtrar por nombre de paciente' />
            </div>
            <br />
            <table className="w-full min-w-[700px] text-[12px] text-left text-gray-500 border-t-4 border-gray-400">
                <thead className="text-[12px] text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-3 py-3 text-[16px]">
                            #
                        </th>
                        <th scope="col" className="px-3 py-3 text-[16px]">
                            Paciente
                        </th>
                        <th scope="col" className="px-3 py-3 text-[16px]">
                            Diagnostico
                        </th>
                        <th scope="col" className="px-3 py-3 text-[16px]">
                            Hospital
                        </th>
                        <th scope="col" className="px-3 py-3 text-[16px]">
                            Receta
                        </th>
                        <th scope="col" className="px-6 py-3 text-[16px] text-center">
                            Eliminar
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {recetaDBP && recetaDBP !== undefined && recetaDBP.sort(sortArray).map((i, index) => {
                        return i.paciente.toLowerCase().includes(filter) && <tr className="bg-white text-[12px] border-b  hover:bg-gray-50 " key={index}>
                            <td className="px-3 py-4 align-top  text-gray-900  text-[16px]">
                              {index + 1} 
                            </td>
                            <td className="px-3 py-4 align-top  text-gray-900  text-[16px]">
                                {/* <textarea id="message" rows="6" onChange={(e) => onChangeHandler(e, i)} cols="6" name='paciente' defaultValue={i['paciente']} className="block p-1.5  w-full h-full text-sm text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder="Escribe aquí..."></textarea> */}
                               {i['paciente']}
                            </td>
                            <td className="px-3 py-4 align-top text-gray-900  text-[16px]">
                                <textarea id="message" rows="6" onChange={(e) => onChangeHandler(e, i)} cols="6" name='diagnostico' defaultValue={i['diagnostico']} className="block p-0  w-full h-full text-gray-900  text-[16px] text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder="Escribe aquí..."></textarea>
                                {/* {i['diagnostico']} */}
                            </td>
                            <td className="px-3 py-4 align-top text-gray-900  text-[16px]">
                                <textarea  id="message" rows="6"  onChange={(e) => onChangeHandler(e, i)} cols="6" name='hospital' defaultValue={i['hospital']} className="block p-0  w-full h-full text-gray-900  text-[16px] text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder="Escribe aquí..."></textarea>
                                {/* {i['hospital']} */}
                            </td>
                            <td className="px-3 py-4 align-top text-gray-900   text-[16px]">
                                {JSON.parse(i.receta).map((i, index) =>
                                    <li>{i['nombre de producto 1']}{'  (*'}{i['cantidad']}{')'}</li>
                                )}
                            </td>
                            <td className="px-3 align-top py-4">
                                {state[i.qr]
                                    ? <Button theme={"Primary"} click={(e) => save(e, i)}>Guardar</Button>
                                    : <Button theme={"Danger"} click={() => delet(i, 'Delete')}>Eliminar</Button>
                                }
                            </td>
                        </tr>
                    })
                    }
                </tbody>
            </table>
        </div>

    )
}




export default WithAuth(Home)
