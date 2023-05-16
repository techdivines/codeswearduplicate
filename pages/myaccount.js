import React, { useEffect } from 'react'
import { useRouter } from 'next/router';


function MyAccount() {
    const router = useRouter()

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            router.push('/')
        }
    }, [])

    return (
        <div>
            Hey
        </div>
    )
}

export default MyAccount
