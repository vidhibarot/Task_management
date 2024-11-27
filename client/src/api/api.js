import axios from 'axios';

const API_URL = "http://localhost:5000/";

// POST request
export async function callPostApi({ url, body, headers }) {
  try {
    // Retrieve authorization header from localStorage if available
    let authHeader = localStorage.getItem('authorization')
      ? { authorization: localStorage.getItem('authorization') }
      : {};

    const result = await axios({
      url: API_URL + url,
      method: 'POST',
      headers: { ...authHeader, ...headers },
      data: body,
      timeout: 120000,
    });

    return result;
  } catch (error) {
    if (error.response) {
    //   // Handle 401 (Unauthorized) error
    //   if (error.response.status === 401) {
    //     localStorage.removeItem('authorization');
    //     localStorage.setItem('isLogin', 'false');
    //     window.location.href = '/pages/login';
    //   }
      return error.response;
    }
  }
}

// GET request
export async function callGetApi({ url, headers, id }) {
  try {
    // Retrieve authorization header from localStorage if available
    let authHeader = localStorage.getItem('authorization')
      ? { authorization: localStorage.getItem('authorization') }
      : {};

    // If 'id' is provided, append it to the URL
    if (id) {
      url = url.replace(/\/([^\/]*)$/, `/${id}`);
    }

    const result = await axios({
      url: API_URL + url,
      method: 'GET',
      headers: { ...authHeader, ...headers },
      timeout: 120000,
    });

    return result;
  } catch (error) {
    if (error.response) {
      return error.response;
    }
  }
}

// PUT request
export async function callPutApi({ url, body, headers }) {
  try {
    // Retrieve authorization header from localStorage if available
    let authHeader = localStorage.getItem('authorization')
      ? { authorization: localStorage.getItem('authorization') }
      : {};

    const result = await axios({
      url: API_URL + url,
      method: 'PUT',
      headers: { ...authHeader, ...headers },
      data: body,
      timeout: 120000,
    });

    return result;
  } catch (error) {
    if (error.response) {
      return error.response;
    }
  }
}

// DELETE request
export async function callDeleteApi({ url, body, headers, id }) {
  try {
    // Retrieve authorization header from localStorage if available
    let authHeader = localStorage.getItem('authorization')
      ? { authorization: localStorage.getItem('authorization') }
      : {};

    // If 'id' is provided, append it to the URL
    if (id) {
      url = url.replace(/\/([^\/]*)$/, `/${id}`);
    }

    const result = await axios({
      url: API_URL + url,
      method: 'DELETE',
      headers: { ...authHeader, ...headers },
      data: body,
      timeout: 120000,
    });

    return result;
  } catch (error) {
    if (error.response) {
      return error.response;
    }
  }
}
