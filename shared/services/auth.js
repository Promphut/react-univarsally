const Request = require('superagent'),
  cookieService = require('./cookieService'),
  toUpper = require('lodash/toUpper'),
  filter = require('lodash/filter'),
  config = require('../config');

let auth = {};
auth = {
  setCookieAndToken(cookieAndToken) {
    // //console.log('setCookieAndToken', cookieAndToken)
    if (cookieAndToken.token) cookieService.set('token', cookieAndToken.token);
    if (cookieAndToken.user) cookieService.set('user', cookieAndToken.user); // cookieService.setJSON('user', cookieAndToken.user)
    if (cookieAndToken.roles) cookieService.set('roles', cookieAndToken.roles); // cookieService.setJSON('roles', cookieAndToken.roles)
    // if(cookieAndToken.menu) cookieService.setJSON('menu', cookieAndToken.menu)
  },

  getToken() {
    return cookieService.get('token');
  },

  getUser() {
    // return cookieService.getJSON('user')
    return cookieService.get('user');
  },

  getRoles() {
    // return cookieService.getJSON('roles')
    return cookieService.get('roles');
  },

  // hasRoleOf(roleName, ofId){
  //   ofId = parseInt(ofId)
  //   if(_.isNaN(ofId)) throw new Error('ofId must be specified.')

  //   return auth['is'+roleName](ofId)
  // },

  // isAdmin(pid){
  //   pid = parseInt(pid)
  //   if(_.isNaN(pid)) throw new Error('pid must be specified.')

  //   let user = cookieService.getUser(),
  //       roles = cookieService.getRoles()
  //   if(!user || !roles) return false // this user hasn't logged in, authorization will be false.

  //   return _.filter(roles, {type:ROLES.ADMIN, user:user._id, publisher:pid}).length > 0
  // },

  // isWriter(cid){
  //   cid = parseInt(cid)
  //   if(_.isNaN(cid)) throw new Error('cid must be specified.')

  //   let user = cookieService.getUser(),
  //       roles = cookieService.getRoles()
  //   if(!user || !roles) return false // this user hasn't logged in, authorization will be false.

  //   return _.filter(roles, {type:ROLES.WRITER, user:user._id, column:cid}).length > 0
  // },

  // isEditor(cid){
  //   cid = parseInt(cid)
  //   if(_.isNaN(cid)) throw new Error('cid must be specified.')

  //   let user = cookieService.getUser(),
  //       roles = cookieService.getRoles()
  //   if(!user || !roles) return false // this user hasn't logged in, authorization will be false.

  //   return _.filter(roles, {type:ROLES.EDITOR, user:user._id, column:cid}).length > 0
  // },

  // cid is optional but needed when checking for editor and writer.
  hasRoles(roles = [], cid, bypassCidCheck = true) {
    let authorized = false,
      cookieRoles = auth.getRoles() || [],
      user = auth.getUser(),
      pid = parseInt(config.PID);
    if (!user) return false;
    // console.log('getRoles', auth.getRoles())
    roles.forEach((role) => {
      role = toUpper(role);
      let compare;
      // console.log('CID', cid, cid!=null)
      if (role === 'ADMIN') compare = { type: config.ROLES.ADMIN, user: user._id, publisher: pid };
      else if (role === 'EDITOR' && !bypassCidCheck && cid != null) {
        // Pessimistic check
        compare = { type: config.ROLES.EDITOR, user: user._id, column: cid };
      } else if (role === 'EDITOR') {
        // Optimistic, You just an editor is authorized, no need to check for the column that belongs to him.
        compare = { type: config.ROLES.EDITOR, user: user._id };
      } else if (role === 'WRITER' && !bypassCidCheck && cid != null) {
        // Pessimistic check
        compare = { type: config.ROLES.WRITER, user: user._id, column: cid };
      } else if (role === 'WRITER') {
        // Optimistic check
        compare = { type: config.ROLES.WRITER, user: user._id };
      }

      // console.log('role compare', role, compare, filter(cookieRoles, compare), cookieRoles)
      if (compare) authorized = authorized || filter(cookieRoles, compare).length > 0;
    });

    // console.log('authorized', authorized)
    return authorized;
  },

  logout(cb) {
    cookieService.remove('token');
    cookieService.remove('user');
    cookieService.remove('roles');
    // except menu

    if (cb) cb();
  },

  loggedIn() {
    // console.log('auth.loggedIn', auth.getToken(), auth.getUser())
    return !!auth.getToken() && !!auth.getUser();
  },
};

module.exports = auth;
