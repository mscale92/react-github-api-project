var React = require('react');
var Link = require('react-router').Link;
var $ = require('jquery');
var GithubUser = require("./GithubUser");
var Infinite = require('react-infinite');


var Followers = React.createClass({
	
    getInitialState: function(){
    	return {
    		page: 1,
    		loading: false,
    		followers: []
    	};
    },
    // abosolutely do not forget this!!
    	// the getInitialState is necessary for setting states
    	//otherwise, null ^(>o<)^
	fetchData: function(){
		var that = this;
			// that is the this referring to our component
			this.setState({
				loading: true
			});


		 $.getJSON(`https://api.github.com/users/${this.props.params.username}/followers?access_token=8dbd67ccdec639d5803b020db060a7e3d5be27cc&page=1&per_page=50`)
			 .then(
			 	function(results){
				 	
			 		
				 	that.setState({
                        followers: that.state.followers.concat(results),
                        loading: false,
                        page: +1
                    });
			 	}
			 );
	},
	
	getFollowers: function(follow){
		return <GithubUser user={follow} />;
	},
	render: function(){
		
		if (!this.state.followers) {
			return (<div>LOADING FOLLOWERS...</div>);
		}

		return (
		    <div className="followers-page">
		        <h2>Followers of {this.props.params.username}</h2>
		        <Infinite className="follow-list" isInfiniteLoading={this.state.loading} onInfiniteLoad={this.fetchData} useWindowAsScrollContainer elementHeight={100} infiniteLoadBeginEdgeOffset={100}>
		            {this.state.followers.map(this.getFollowers)}
		        </Infinite>
		    </div>
		);
	}
});


module.exports = Followers;