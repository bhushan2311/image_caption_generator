import React from 'react';
import { useEffect, useState } from 'react';

const axios = require('axios').default;

const TransButton = ({ callback, caption }) => {

    const [options, setOptions] = useState([
        { code: 'hi', name: 'Hindi' },
        { code: 'mr', name: 'Marathi' },
        { code: 'fr', name: 'French' },
        { code: 'zh', name: 'Chinese' },
        { code: 'ru', name: 'Russian' },
        { code: 'ja', name: 'Japanese' }
      ]);
    const [to, setTo] = useState('en');
    const [from, setFrom] = useState('en');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const translate = async () => {
        const url = 'https://rapid-translate-multi-traduction.p.rapidapi.com/t';
        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': '6f6d882d6dmshb61682053181adap12ae69jsne6baf7d12825',
                'X-RapidAPI-Host': 'rapid-translate-multi-traduction.p.rapidapi.com'
            },
            body: JSON.stringify({
                from: 'en',
                to: 'hi',
                q: caption,
              }),
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            callback(result);
            console.log(result);
        } catch (error) {
            console.error(error);
        }

    }

    const selectLang = async () => {

    }
    useEffect(() => {
        translate();
    }, []);

    return (
        <>
            {/* <select onChange={(e) => setTo(e.target.value)}>
                {options.map((opt) => (
                    <option key={opt.code} value={opt.code}>
                        {opt.name}
                    </option>
                ))}
            </select> */}
            <div>
                <button className="translate-btn" onClick={e => translate()}>Translate</button>
            </div>
        </>
    )
}

export default TransButton