<template>
  <div class="container">
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Rate Page</h1>
          <b-field position="is-right">
            <b-input v-model="search_query" placeholder="Search" type="search" icon="magnify" />
          </b-field>
        </div>
      </div>
    </section>
    <div class="box is-8">
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
          <b-table-column field="bookmark" label=""  centered>
              <b-field grouped>
            <b-button size="is-medium" type="is-warning"  icon-left="star" @click="favoriteCurrency(props.row.rowIndex)"></b-button> &nbsp;
            <b-button size="is-medium"  icon-left="star" @click="unfavoriteCurrency(props.row.index)"></b-button>
              </b-field>
          </b-table-column>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataTable',
  data () {
    return {
      data: [],
      isPaginated: true,
      paginationPosition: 'bottom',
      defaultSortDirection: 'asc',
      currentPage: 1,
      perPage: 10,
      sortIcon: 'arrow-up',
      search_query: '',
      errors: [],
     message:''
    }
  },
  methods: {
    listRate () {
      this.axios
        .get('https://r.easycrypto.nz/json/backenddb.json')
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
    favoriteCurrency (row) {
          alert("You choose to pinned"+" "+row)
          
    },
    unfavoriteCurrency (row) {
        alert("You choose to unpinned"+" "+row)
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
              item =>
                item.name.toLowerCase().includes(this.search_query.toLowerCase()) ||
                item.name.toUpperCase().includes(this.search_query.toUpperCase()) ||
                item.symbol.toLowerCase().includes(this.search_query.toLowerCase())||
                item.symbol.toUpperCase().includes(this.search_query.toUpperCase())
            )
          : this.data
      } else {
          return this.data
      }
    }
  }
}
</script>
