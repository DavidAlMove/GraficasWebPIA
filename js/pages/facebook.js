window.fbAsyncInit = function() {
    FB.init({
      appId            : '891646718408747',
      autoLogAppEvents : true,
      xfbml            : true,
      version          : 'v12.0'
    });
  };

(function(d,s, id){
    var js, fjs=d.getElementsByTagName(s)[0];
    if(d.getElementById(id)) {return;}
    js = d.createElement(s); js.id=id;
    js.src="//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function shareScore(score){
    FB.ui({
        method: 'share',
        href: 'https://google.com',
        hashtag: "#BrawlGuys",
        quote: "¡He ganado la partida!"
    }, function(response){});
}