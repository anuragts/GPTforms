// use Effect and useState to add mail to local storage

import { useEffect, useState } from 'react';

export const setLocal = (mail:string) => {
    useEffect(() => {
        localStorage.setItem('email', mail)
    })
}