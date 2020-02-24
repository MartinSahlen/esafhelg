import React from 'react';
// @ts-ignore
import htmlParser from 'htmlparser';
import axios from 'axios';

const baseUrl = 'https://cors-anywhere.herokuapp.com/https://entreprenorskolen.no/students/'

const classSuffixes: {[key: string]: string} = {
    2021: 'current-students/2021-2/',
    2020: 'current-students/2020-2/',
    2019: 'former-students/2019-2/',
    2018: 'former-students/2018-2/',
    2017: 'former-students/2017-2/',
    2016: 'former-students/2016-2-2/',
    2015: 'former-students/2015-2/',
    2014: 'former-students/2014-2/',
    2013: 'former-students/2013-2/',
    2012: 'former-students/2012-2/',
    2011: 'former-students/2011-2/',
    2010: 'former-students/2010-2/',
    2009: 'former-students/2009-2/',
    2008: 'former-students/2008-2/',
    2007: 'former-students/2007-2/',
    2006: 'former-students/2006-2/',
    2005: 'former-students/2005-2/',
}


const getData = async () => {


    const allYears = await Promise
        .all(Object
            .keys(classSuffixes)
            .sort()
            .map(year => axios.get<string>(`${baseUrl}${classSuffixes[year]}`, {headers: {'x-requested-with': 'esafhelg'}})))

    console.log(await Promise.all(allYears.map(year => year.data).map(html => {
       return new Promise((resolve, reject) => {
           const handler = new htmlParser.DefaultHandler(function (error: Error, dom: object) {
               if (error) {
                   reject(error)
               } else {
                   resolve(dom)
               }

           });

           const parser = new htmlParser.Parser(handler);
           parser.parseComplete(html)
       })
    })))
}

function App() {

    getData();

  return (

        <img src="https://entreprenorskolen.no/wp-content/themes/es/img/logo.png" className="App-logo" alt="logo" />

  );
}

export default App;
