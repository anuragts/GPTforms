import { useEffect, useState } from 'react';

export const useSetLocal = (mail:string) => {
    useEffect(() => {
      localStorage.setItem('email', mail)
    }, [])
  }