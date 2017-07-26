const config = require('../config');
// const Cookies = require('universal-cookie')
// let cookies = new Cookies()
// console.log('COOKIE', global.cookies, 'x', window.cookies)
// const cookies = new Cookies()

// let cookies = {
// 	set: () => {},
// 	get: () => {},
// 	remove: () => {}
// }
// if (process.env.BROWSER) {
// 	cookies = new Cookies();
// }
// if(typeof cookies === 'undefined') cookies = new Cookies();
// We don't need "staging.[domain]" instead use ".[domain]" to cover all subdomains
const domain = {
  domain: config.DOMAIN,
  path: '/',
  secure: !config.isDev,
  expires: new Date(Number(new Date()) + 7776000000),
};

let cookieService = {};
cookieService = {
  // Set cookie string by name
  set(cookieName, str) {
    // console.log('COOKIE', cookies)
    cookies.set(cookieName, str, domain);
  },

  // Set cookie json by name
  // setJSON(cookieName, json){
  // 	cookies.set(cookieName, JSON.stringify(json), domain)
  // },

  // Get cookie string by name
  get(cookieName) {
    // console.log('COOKIE', window.cookies, global.cookies, cookies.get(cookieName, domain))
    // return cookies.get(cookieName, domain)
    return cookies.get(cookieName, domain) || null;
    // return cookies.load(cookieName)
  },

  // Get cookie json by name
  // getJSON(cookieName){
  // 	let json
  // 	//console.log('getJSON', cookieService.get(cookieName))
  // 	try{
  // 	  json = JSON.parse(cookieService.get(cookieName))
  // 	}
  // 	catch(err) {json = null}

  // 	return json
  // },

  // Remove cookie by name
  remove(cookieName) {
    cookies.remove(cookieName, domain);
  },

  // // Set article viewed flag in cookie
  // viewArticle(aid){
  // 	let viewed = cookieService.getJSON('viewed') || []
  // 	if(viewed && aid!=null){
  // 		viewed.push(aid)
  // 		viewed = _.uniq(viewed)
  // 		//console.log('viewed', viewed)
  // 		cookieService.setJSON('viewed', viewed)
  // 	}
  // },

  // getArticlesViewed(articles){
  // 	let viewed = cookieService.getJSON('viewed') || []

  // 	if(viewed && articles && articles.length>0) {
  // 		articles.forEach(a => {
  // 			a.viewed = viewed.indexOf(a._id)!==-1
  // 		})

  // 		//console.log('articles', articles)
  // 	}
  // }
};

module.exports = cookieService;
