const { User, Meeting } = require('./db/models');

Meeting.findOne({
  where: {
    id: 1
  },
  include: {
    model: User,
    as:'owner'
  }
}).then(res=> console.log(JSON.parse(JSON.stringify(res))))
