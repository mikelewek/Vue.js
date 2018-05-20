const ApiUrl = 'http://websvr-01/api/crm/contact/getbypvid/';
const app = new Vue({
	el:'#app',
	data:{
		pvId:'',
		pvIdList:'',
		results:[],
		noResults:false,
		searching:false
	},
	methods:{
		search:function() {
			this.searching = true;
			fetch(`${ApiUrl}${encodeURIComponent(this.pvId)}`)
			.then(res => res.json())
			.then(res => {
				this.searching = false;
				this.results = res.results;
				this.noResults = this.results.length === 0;
			});
		},
		multiSearch:function() {
			this.searching = true;
			this.pvIdList = this.pvIdList.split("\n");
			var t = this.pvIdList;

			for (let i = 0; i < this.pvIdList.length; i++) {
				fetch(`${ApiUrl}${encodeURIComponent(this.pvIdList[i])}`)
				.then(res => res.json())
				.then(res => {
					this.searching = false;
					this.results += res.results;
				});
			}
		}
	}
});