'use client'

import { QrScanner } from '@yudiel/react-qr-scanner';
import { useUser } from '@/context/Context.js'
import { readUserData } from '@/supabase/utils'

const Component = () => {
  const { setRecetaDBP, setWebScann, setFilter, setFilterQR} = useUser()

  const handlerQR = async (result) => {
    if (result) {
      console.log(result)
      const data = await readUserData('Receta', result, setRecetaDBP, 'qr')
      setFilterQR(result)
      setWebScann(false)
    }
  }

  return (
    <QrScanner
      // constraints={{
      //   facingMode: 'environment'
      // }}
      onDecode={(result) => handlerQR(result)}
      onError={(error) => console.log(error?.message)}
    />
  );
}
export default Component                                           