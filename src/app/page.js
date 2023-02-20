"use client"
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'
import { useState } from 'react'
import {http} from '../helpers/http'

export default function Home() {
  const [input, setInput] = useState('')
  const [resultSegitiga, setResultSegitiga] = useState([])
  console.log(input);
  const segitiga = []
  const generateSegitiga = (input) => {
    const splitInput = input.split('') 
    for (let index = 0; index < splitInput.length; index++) {
      let row = splitInput[index] + ''
      for (let j = 0; j <= index; j++) {
        row += '0';
      }
      const triangle = segitiga.push(row)
      console.log(segitiga, "<<<<");
    }
    return setResultSegitiga(segitiga)
  }

  const GenerateByBackend = async (input) => {
    const form = new URLSearchParams()
    form.append('input', input)
    try {
      const {data} = await http().post(`http://localhost:8080/test/generate-ganjil`, form.toString())
      console.log(data, "ini data");
      return setResultSegitiga(data.results)
    } catch ({error, response}) {
      console.log(error);
      console.log(response);
      return setResultSegitiga(response.data.message)
    }
} 
  
  
  return (
    <main className={styles.main}>
      <div className='w-full'>
        <input className='mb-2 border-spacing-3 bg-gray-300' type="text" onChange={e => setInput(e.target.value)} />
        {parseInt(input) || input.length < 1 ? null : <div className='mb-2 text-red-700'>input harus number</div> }
        <div className='mt-4 mb-6 flex flex-row justify-between w-1/2 text-white'>
          <button className='py-2 px-2 bg-slate-900 rounded-2xl' onClick={() => generateSegitiga(input)}>Generate Segitiga</button>
          <button className='py-2 px-2 bg-slate-900 rounded-2xl' onClick={() => GenerateByBackend(input)}>Generate Segitiga dengan Backend</button>
          <button className='py-2 px-2 bg-slate-900 rounded-2xl'>Generate Bilangan Prima</button>
        </div>
        <div>Results :</div>
        { resultSegitiga === 'input harus Number' ? input.length < 0 ? null : <div className='mb-2 mt-2 text-red-700'>{resultSegitiga}</div> :
        resultSegitiga?.map((item, index) => {
          return (
              <div key={index}>{item}</div>
          )
        })}
      </div>
    </main>
  )
}
