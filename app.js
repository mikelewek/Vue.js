Vue.filter('formatDate', function(d) {
	if(!window.Intl) return d;
	return new Intl.DateTimeFormat('en-US').format(new Date(d));
}); 

const app = new Vue({
	el:'#app',
	data:{
		pvId:'',
		results:[],
		noResults:false,
		searching:false
	},
	methods:{
		search:function() {
			this.searching = true;
			fetch(`http://xxxx/xx/xx/${encodeURIComponent(this.pvId)}`)
			.then(res => res.json())
			.then(res => {
				this.searching = false;
				this.results = res.results;
				this.noResults = this.results.length === 0;
			});
		}
	}
});