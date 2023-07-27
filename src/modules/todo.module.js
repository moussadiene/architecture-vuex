import Swal from "sweetalert2";
import { http } from '../services/http.service'
http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

const todos = {
    namespaced: true,
    state: {
        liste: [],
        todo: {
            _id: null,
            libelle: '',
            ordre: null
        },
        errors: {},
    },
    getters: {
        liste: state => state.liste,
    },
    mutations: {
        setIndexTodo(state, liste) {
            state.liste = liste
            state.errors = {}
        },
        setIndexTodoErrors(state, liste) {
            state.errors = liste
        },
        addTodoCommit(state, data) {
         
        },
        removeTodoCommit(state, module) {
            Swal.fire({
                title: 'Etes Vous Sûr ?',
                text: " Voulez vous vraiment suprimer ce module ! ",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Suprimer',
                cancelButtonText: 'Annuler'
            }).then((result) => {
              
            })

        },
        updateTodoCommit(state, data) {
         
        }
    },
    actions: {

        getAllTodos({ commit }) {
           
        },
        addTodoAction(context, payload) {

            return new Promise((resolve, reject) => {
                context.commit('addTodoCommit', payload)
                resolve()
            })
        },
        removeTodoAction(context, payload) {
            return new Promise((resolve, reject) => {
                context.commit('removeTodoCommit', payload.module)
                resolve()
            })
        },
        updateTodoAction(context, payload) {
            return new Promise((resolve, reject) => {
                context.commit('updateTodoCommit', payload)
                resolve()
            })
        }
    }

}

export default todos