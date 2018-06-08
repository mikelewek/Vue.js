const app = new Vue({
	el:'#app',
	data:{
		pvIdList:'',
		results:[],
		noResults:false,
        searching: false,
        searchBy: 'pvid',
        errorMessage: '',
	},
	methods:{
        multiSearch: function () {
            this.results = [];
            var apiUrl = '';

            if (this.pvIdList.length === 0) {
                this.searching = false;
                this.noResults = true;
                return;
            }

            switch (this.searchBy) {
                case 'pvid':
                    apiUrl = '../api/crm/contact/getbypvid/';
                    break;
                case 'contactid':
                    apiUrl = '../api/crm/contact/';
                    break;
                case 'email':
                    apiUrl = '../api/crm/contact/getbyemail/';
                    break;
                case 'lastname':
                    apiUrl = '../api/crm/contact/getbylastname/';
                    break;
                case 'fullname':
                    apiUrl = '../api/crm/contact/getbyfullname/';
                    break;
            }

            var json = this.pvIdList.split("\n");

            this.$http.post(apiUrl, json)
                .then(function (res) {
                    this.searching = false;
                    this.noResults = false;
                    this.results = res.body;

                }, function (response) {
                    // Error
                    this.noResults = true;
                    this.errorMessage = ' - Error. It\'s possible there were too many results or and invalid entry causing the error.';
                    console.log(res)
                });
		}
	}
});