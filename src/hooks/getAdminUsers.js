import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react'

const getAdminUsers = () => {
    const [data, setData] = useState(null);

    useEffect(async () => {
        const admins = await firestore().collection('admin').get();
        if (admins.docs.length > 0) {
            setData(admins.docs[0]._data)
        }
    }, [data])

    return  [data]
}

export default getAdminUsers