<template>
    <v-container fluid>
        <v-row id="gifList" class="text-center" >
            <SearchItem v-for="gif in paginatedData" :gif="gif" :key="gif.id" />
        </v-row>
        <v-pagination 
            v-if="gifs.length>perPage"
            v-model="pageNumber"
            :length="Math.ceil(gifs.length/perPage)"
            @input="nextPage"
            class="mt-10"
    ></v-pagination>
    </v-container>
</template>

<script>
    import SearchItem from "./SearchItem"

    export default {
        name: 'SearchResults',
        components: {
            SearchItem
        },
        data () {
            return {
                pageNumber: 1,
                perPage: 9
            }
        },
        props: ['gifs'],
        methods: {
            nextPage(page) {
            this.pageNumber = page;
            }
        },
        computed: {
            pageCount() {
            let l = this.gifs.length,
                s = this.perPage;
            return Math.ceil(l / s) - 1;
            },
            paginatedData() {
            const start = this.pageNumber * this.perPage - this.perPage,
                end = start + this.perPage;
            return this.gifs.slice(start, end);
            }
        }
    }
</script>