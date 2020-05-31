<template>
  <div class="container">
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Rate Page</h1>
        </div>
      </div>
    </section>
    <div class="box is-8">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">
            <b-icon icon="fire" size="is-small">></b-icon>&nbsp; Picked List
          </p>
        </header>
        <div class="card-content">
          <b-table :data="favorite">
            <template slot-scope="props">
              <b-table-column field="no" label="No">{{ props.index+1 }}</b-table-column>
              <b-table-column field="name" label="Name">{{ props.row.name }}</b-table-column>
              <b-table-column field="symbol" label="Symbol">{{ props.row.symbol }}</b-table-column>
              <b-table-column field="symbol" label="Buy Rate">{{ props.row.rate }}</b-table-column>
              <b-table-column field="symbol" label="Sell Rate">{{ props.row.sellRate }}</b-table-column>
              <b-table-column field="removed" label centered>
                <b-field grouped>
                  <b-button
                    size="is-medium"
                    type="is-danger"
                    icon-left="minus-circle-outline"
                    @click="unfavoriteCurrency(props.row.name)"
                  ></b-button>
                </b-field>
              </b-table-column>
            </template>
          </b-table>
        </div>
      </div>
      <hr />
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">
            <b-icon icon="chart-bar" size="is-small">></b-icon>&nbsp;Daily Rate
          </p>
          <b-field position="is-right" size="is-small">
            <b-input v-model="search_query" placeholder="Search" type="search" icon="magnify" />
          </b-field>
        </header>
        <div class="card-content">
          <b-table
            :data="filterItem"
            :paginated="isPaginated"
            :current-page.sync="currentPage"
            :per-page="perPage"
            :sort-icon="sortIcon"
            default-sort="name"
            aria-next-label="Next page"
            aria-previous-label="Previous page"
            aria-page-label="Page"
            aria-current-label="Current page"
          >
            <template slot-scope="props">
              <b-table-column field="rank" label="Rank" width="40">{{ props.row.rank }}</b-table-column>
              <b-table-column field="name" label="Name" sortable>{{ props.row.name }}</b-table-column>
              <b-table-column field="symbol" label="Symbol" sortable>{{ props.row.symbol }}</b-table-column>
              <b-table-column field="rate" label="Buy Rate" sortable>{{ props.row.rate }}</b-table-column>
              <b-table-column field="sell-rate" label="Sell Rate" sortable>{{ props.row.sellRate }}</b-table-column>
              <b-table-column field="bookmark" label centered>
                <b-field grouped>
                  <b-button
                    size="is-medium"
                    type="is-warning"
                    icon-left="star"
                    @click="favoriteCurrency(props.row.name,props.row.symbol,props.row.rate,props.row.sellRate)"
                  ></b-button>
                </b-field>
              </b-table-column>
            </template>
          </b-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataTable',
  data () {
    return {
      data: [],
      favorite: [],
      isPaginated: true,
      paginationPosition: 'bottom',
      defaultSortDirection: 'asc',
      currentPage: 1,
      perPage: 10,
      sortIcon: 'arrow-up',
      search_query: '',
      errors: []
    }
  },
  methods: {
    listRate () {
    // add the url before test. The url was removed due of security
      this.axios
        .get('')
        .then(async res => {
          Object.values(res.data).forEach(value => {
            value.rate = value.rate.toFixed(5)
            value.sellRate = value.sellRate.toFixed(5)
            value.margin = value.margin.toFixed(5)
            this.data.push(value)
          })
        })
        .catch(e => {
          this.errors.push(e.data)
        })
    },
    favoriteCurrency (name, symbol, rate, sellRate) {
      let fav = {
        name: name,
        symbol: symbol,
        rate: rate,
        sellRate: sellRate
      }
      if (this.favorite.length > 0) {
        if (this.favorite.some(favor => favor.name === fav.name)) {
          alert('Already pinned that currency. Choose the other one')
        } else {
          this.favorite.push(fav)
        }
      } else {
        this.favorite.push(fav)
      }
    },
    unfavoriteCurrency (row) {
      this.favorite.splice(row, 1)
    }
  },
  mounted () {
    this.listRate()
  },
  computed: {
    filterItem () {
      if (this.search_query != null) {
        return this.search_query
          ? this.data.filter(
            item => item.name.toLowerCase().includes(this.search_query.toLowerCase()) || item.name.toUpperCase().includes(this.search_query.toUpperCase()) || item.symbol.toLowerCase().includes(this.search_query.toLowerCase()) || item.symbol.toUpperCase().includes(this.search_query.toUpperCase()))
          : this.data
      } else {
        return this.data
      }
    }
  }
}
</script>
