import PubSub from 'pubsub-js';
let bus = {
  subscribe: function(msg, cb) {
    return PubSub.subscribe(msg, (msg, arg) => cb(arg));
  },
  unsubscribe: function(tokenOrCb) {
    return PubSub.unsubscribe(tokenOrCb);
  },
  publish: function(msg, arg) {
    return PubSub.publish(msg, arg);
  },
  publishSync: function(msg, arg) {
    return PubSub.publishSync(msg, arg);
  }
};
export default bus;
