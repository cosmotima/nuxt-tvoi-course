import axios from "axios";

export const state = () => ({
    schools: [],
    searchValue: '',
    allCourses: [],
    courses: [],
    categories: [],
    subcategories: [],
    reviews: []
})

export const mutations = {

    SET_SCHOOLS_TO_STATE: (state, schools) => {
        state.schools = schools;
    },
    SET_REVIEWS_TO_STATE: (state, reviews) => {
        state.reviews = reviews;
    },
    SET_SEARCH_VALUE: (state, value) => {
        state.searchValue = value;
        console.log('commit' + value)
    },
    SET_COURSES_TO_STATE: (state, courses) => {
        console.log("commit courses")
        state.courses = courses;
    },
    SET_CATEGORIES_TO_STATE: (state, categories) => {
        state.categories = categories;
    },
    SET_ALL_COURSES_TO_STATE: (state, allCourses) => {
        state.allCourses = allCourses
    },
    CLEAR_COURSES: (state) => {
        state.courses = null
    }
}

export const actions = {
    async nuxtServerInit({dispatch}) {
        await dispatch('GET_CATEGORIES_FROM_API')
    },
    async GET_SEARCH_VALUE_TO_STATE({ commit }, value) {
        console.log("Set value to state" + value)
        commit('SET_SEARCH_VALUE', value)
    },
    async GET_COURSES_BY_SUBCATEGORY({commit}, subcategory) {
        return axios.get('http://localhost:3000/courses/?name='+ subcategory).then((courses) => {
            if (!courses.data.length == 0) {
            let allSubsWithCourses = courses.data
            console.warn("allSubsWithCourses" + allSubsWithCourses[0].name,  "  " + allSubsWithCourses[0].courses)
            commit('SET_COURSES_TO_STATE', allSubsWithCourses[0].courses)
                    return allSubsWithCourses[0].courses
            } else {
                commit('SET_COURSES_TO_STATE', [])
                console.log('there is empty response for this subcategory')
                context.error()
            }
        }).catch((error) => {
            console.log(error);
            return error;
        })  
    },
    // depricated
    async GET_COURSES_BY_QUERY_FROM_API({ dispatch, commit }, queryp) {
        console.log(queryp + "    queryp")
        let categories = this.state.categories
        let coursesByQuery = []

        if (categories.length == 0) {
            await dispatch('GET_CATEGORIES_FROM_API')
        }
        for (let i = 0; i < categories.length; i++) {
            let category = categories[i]
            if (category.name == queryp.category) {
                let subcategories = category.subcategories
                for (let j = 0; j < subcategories.length; j++) {
                    if (subcategories[j].name == queryp.subcategory) {
                        coursesByQuery = subcategories[j].courses
                        break;
                    }
                }
            }
        }
        console.log(coursesByQuery)
        commit('SET_COURSES_TO_STATE', coursesByQuery)
        return coursesByQuery;
    },
    async GET_CATEGORIES_FROM_API({ commit }) {
        console.log("starts  GET_CATEGORIES_FROM_API")
        return axios.get('http://localhost:3000/categories').then((categories) => {
            console.log("commits  CATEGORIES_FROM_API")
            commit('SET_CATEGORIES_TO_STATE', categories.data)
            return categories.data;
        }).catch((error) => {
            console.log(error);
            return error;
        })
    },
    async GET_SCHOOLS_FROM_API({ commit }) {
        console.warn("starts  GET_SCHOOLS_FROM_API" + 1)
        return axios.get('http://localhost:3000/schools').then((schools) => {
            commit('SET_SCHOOLS_TO_STATE', schools.data)
            return schools.data;
        }).catch((error) => {
            console.log(error);
            return error;
        })
    },
    async GET_REVIEWS_FROM_API({ commit }, school) {
        //console.log("starts  GET_CATEGORIES_FROM_API")
        return axios.get('http://localhost:3000/reviews_' + school).then((reviews) => {
            //console.log("commits  CATEGORIES_FROM_API")
            commit('SET_REVIEWS_TO_STATE', reviews.data)
            return reviews.data;
        }).catch((error) => {
            if (error.response.status == 404) {
                commit('SET_REVIEWS_TO_STATE', [])
            }
            console.log(error);
            return error;
        })
    },
    async GET_ALL_COURSES({ dispatch, commit }) {
        let allCourses = this.state.allCourses
        //let categories = this.state.categories
        let allFoundCourses = []

        console.log("starts  GET_ALL_COURSES_FROM_API")
        if (allCourses.length == 0) {
        return axios.get('http://localhost:3000/courses').then((response) => {
            console.log("commits  SET_ALL_COURSES_FROM_API")
            let subcategories = response.data
            if (subcategories.length > 1) {
            for (let i = 0; i < subcategories.length; i++) {
                allFoundCourses = allFoundCourses.concat(subcategories[i].courses)
            }
            console.log("commits  SET_ALL_COURSES_FROM_API" + allFoundCourses)
            commit('SET_ALL_COURSES_TO_STATE', allFoundCourses)
            return allFoundCourses;
        }
            else {
                commit('SET_ALL_COURSES_TO_STATE', [])
                console.log('there is empty response for all courses')
                context.error()
            }
        }).catch((error) => {
            console.log(error);
            return error;
        })
    }
        // try {
        //     if (allCourses.length == 0) {
        //         for (let i = 0; i < categories.length; i++) {
        //             let subcategories = categories[i].subcategories
        //             for (let j = 0; j < subcategories.length; j++) {
        //                 allFoundCourses = allFoundCourses.concat(subcategories[j].courses)
        //             }
        //         }
        //         commit('SET_ALL_COURSES_TO_STATE', allFoundCourses)
        //         return allFoundCourses;
        //     } else if (allCourses.length > 0) {
        //         return allCourses
        //     }
        // } catch (error) {
        //     console.log(error)
        // }
    }
}
export const getters = {
    COURSES(state) {
        return state.courses;
    },
    CATEGORIES(state) {
        return state.categories;
    },
    ALL_COURSES(state) {
        return state.allCourses
    },
    SEARCH_VALUE(state) {
        return state.searchValue
    },
    SCHOOLS(state) {
        return state.schools
    },
    REVIEWS(state) {
        return state.reviews
    }
}
