const ApiUrl = '..//';

const app = new Vue({
	el:'#app',
	data:{
		pvIdList:'',
		results:[],
		noResults:false,
		searching:false
	},
	methods:{
        multiSearch: function () {
            if (this.pvIdList.length === 0) {
                this.searching = false;
                this.noResults = true;
                return;
            }

            var json = this.pvIdList.split("\n");

            this.$http.post(ApiUrl, json)
                .then(function (res) {
                    this.searching = false;
                    this.noResults = false;
                    this.results = res.body;

                }, function (response) {
                    // Error
                    console.log(res)
                });
		}
	}
});