module.exports = [
    {
        _id: Math.round(Math.random() * 1000000),
        text: '',
        createdAt: new Date(),
        user: {
            _id: 2,
            name: 'User'
        },
        image: 'http://www.pokerpost.fr/wp-content/uploads/2017/12/iStock-604371970-1.jpg',
    },
    {
        _id: Math.round(Math.random() * 1000000),
        text: '@Kate - shared activities are a great way to build a network. Take Gold for example. Most of the largest business deals are struck on a golf course.',
        createdAt: new Date(),
        user: {
            _id: 2,
            name: 'Kyndor'
        }
    },
    {
        _id: Math.round(Math.random() * 1000000),
        text: 'Made me aware of how little I socialize outside my #professional_network. It might be a good idea to actually take up a hobby that is entirely unrelated to my professional field :)',
        createdAt: new Date(Date.UTC(2018, 0, 30, 20, 20, 0)),
        user: {
          _id: 2,
          name: 'Kyndor',
        },
    },
    {
      _id: Math.round(Math.random() * 1000000),
      text: 'I was in the 0-5 range like most people!! This exercise helped introspect my networking style and the barriers to effective networking',
      createdAt: new Date(Date.UTC(2018, 0, 30, 20, 20, 0)),
      user: {
        _id: 1,
        name: 'User',
      },
    },

  ];
