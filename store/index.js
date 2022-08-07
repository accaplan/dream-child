import { groq } from '@nuxtjs/sanity'

const query = groq`
*[_type == "gallerySettings"][0]
{
  title,
  description,
  about[] {
    ...
  },
  featured[]-> {
    ...,
    cover {
      ...,
      asset->,
      "metadata": asset->metadata
    }
  }
}
`

export const state = () => ({
  theme: 'dark',
  accent: '',
  site: {},
  screenWidth: 0
})

export const mutations = {
  setTheme(state, theme) {
    state.theme = theme
  },
  setAccent(state, color) {
    state.accent = color
  },
  setSite(state, payload) {
    state.site = payload
  },
  setScreenWidth(state, width) {
    state.screenWidth = width
  }
}

export const actions = {
  async nuxtServerInit({ commit }, { $sanity }) {
    const site = await $sanity.fetch(query)
  commit('setSite', site)
  site.featured && site.featured.length > 0 ? commit('setAccent', site.featured[0].cover.metadata.palette.dominant.background) : '#000'
  }
}

export const getters = {
  getSite: (state) => {
    return state.site
  },
  getTheme: (state) => {
    return state.theme
  },
  getAccent: (state) => {
    return state.accent
  },
  getScreenWidth: (state) => {
    return state.screenWidth
  }
}