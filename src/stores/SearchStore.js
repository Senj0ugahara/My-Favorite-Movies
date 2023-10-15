import {defineStore} from 'pinia'
import { useMovieStore } from './MovieStore'
import {ref} from 'vue'
const url = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword='

export const useSearchStore = defineStore('searchStore', () => {
  const loader = ref(false)
  const movies = ref([])

  const getMovies = async(search) => {
    loader.value = true
    const res = await fetch(`${url}${search}`, {
      method: 'GET',
      headers: {
        'X-API-KEY': 'e8392614-276d-4421-bc4b-3aba146df800',
        'Content-Type': 'application/json',
      },
    })
    const data = await res.json()
    movies.value = data.films
    loader.value = false
  }

  const addToUserMovies = object => {
    const movieStore = useMovieStore();
    movieStore.movies.push({...object, isWatched: false});
    movieStore.activeTab = 1;
  }

  return {
    loader, movies, getMovies, addToUserMovies
  }
})