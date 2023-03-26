import { createStore } from 'vuex';
import axios from 'axios';
import router from "@/router"; // import the router instance

export default createStore({
  state: {
    jwtToken: localStorage.getItem('jwtToken') || '',
    board: {},
    boards: [],
  },
  mutations: {
    setJwtToken(state, token) {
      state.jwtToken = token;
      localStorage.setItem('jwtToken', token);

    },
    setBoard(state, board) {
      state.board = board;
    },
    setBoards(state, boards) {
        state.boards = boards;
        }
  },
  actions: {
    async fetchBoardById({ commit }, { token, id }) {
        try {
          const response = await axios.get(`http://localhost:8000/jeopardyboards/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          commit('setBoard', response.data);
          console.log(response.data);
        } catch (error) {
          console.error('Error fetching board:', error);
        }
      },
    async fetchBoards({ commit, state }) {
        try {
          const response = await axios.get(`http://localhost:8000/jeopardyboards`, {
            headers: {
              Authorization: `Bearer ${state.jwtToken}`,
            },
          });
          commit("setBoards", response.data);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // Redirect to the login page if the response status is 401 Unauthorized
                router.push({ name: "Login" });
              } else {
                // Handle other errors (e.g., network issues) as you see fit
                console.error("Error fetching boards:", error);
              }
          
        }
      },
    async login(_, { username, password }) {
        try {
          // Send the request as 'application/x-www-form-urlencoded'
          const response = await axios.post(
            'http://localhost:8000/token',
            new URLSearchParams({
              username,
              password,
              grant_type: 'password', // Add this if your FastAPI endpoint expects 'grant_type'
            }),
            {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            }
          );
      
          // Assuming the JWT token is in the 'access_token' property of the response
          const token = response.data.access_token;
      
          return token;
        } catch (error) {
          console.error('Error during login:', error);
          return null;
        }
      },
    async fetchBoard({ commit }, token) {
      // Fetch the board data using the token and set it to the state
      // You can use your existing fetchBoard logic here
      const board = await fetchBoard(token);
      commit('setBoard', board);
    },
  },
  getters: {
    jwtToken: (state) => state.jwtToken,
    board: (state) => state.board,
    boards: (state) => state.boards,

  },
});