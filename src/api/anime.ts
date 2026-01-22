import type { Anime, JikanResponse, AnimeCharacter } from '../types/anime';

const BASE_URL = 'https://api.jikan.moe/v4';

async function fetchJikan<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    
    if (!response.ok) {
      throw new Error(`Jikan API error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

export async function getAnimeById(id: number): Promise<Anime> {
  const response = await fetchJikan<JikanResponse<Anime>>(`/anime/${id}`);
  return response.data;
}

export async function getTopAnime(page: number = 1, limit: number = 25): Promise<JikanResponse<Anime[]>> {
  return fetchJikan<JikanResponse<Anime[]>>(`/top/anime?page=${page}&limit=${limit}`);
}

export async function getCurrentSeasonAnime(page: number = 1): Promise<JikanResponse<Anime[]>> {
  return fetchJikan<JikanResponse<Anime[]>>(`/seasons/now?page=${page}`);
}

export async function searchAnime(query: string, page: number = 1, limit: number = 25): Promise<JikanResponse<Anime[]>> {
  const encodedQuery = encodeURIComponent(query);
  return fetchJikan<JikanResponse<Anime[]>>(`/anime?q=${encodedQuery}&page=${page}&limit=${limit}`);
}

export async function getAnimeByGenre(genreId: number, page: number = 1): Promise<JikanResponse<Anime[]>> {
  return fetchJikan<JikanResponse<Anime[]>>(`/anime?genres=${genreId}&page=${page}`);
}

export async function getAnimeCharacters(animeId: number): Promise<AnimeCharacter[]> {
  const response = await fetchJikan<JikanResponse<AnimeCharacter[]>>(`/anime/${animeId}/characters`);
  return response.data;
}

export async function getUpcomingAnime(page: number = 1): Promise<JikanResponse<Anime[]>> {
  return fetchJikan<JikanResponse<Anime[]>>(`/seasons/upcoming?page=${page}`);
}

export async function getAnimeRecommendations(animeId: number) {
  return fetchJikan(`/anime/${animeId}/recommendations`);
}