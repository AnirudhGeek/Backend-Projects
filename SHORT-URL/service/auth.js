const sessionIdToUserMap = new Map(); //it is basically a hashmap

function setUser(id, user) {
  sessionIdToUserMap.set(id, user);
}

function getUser(id) {
  sessionIdToUserMap.get(id);
}

module.exports = {
  setUser,
  getUser,
};
