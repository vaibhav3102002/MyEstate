import axios from 'axios'

export const baseUrl="https://bayout.p.rapidapi.com"

export const fetchApi=async(url)=>{
	const {data} =await axios.get((url),{
		headers: {
			'x-rapidapi-host': 'bayut.p.rapidapi.com',
			'x-rapidapi-key': 'a1b2d1537emsh05b492664acfe19p12c3c8jsnc88e9d318e3a'
		  }
	})

	return data

}