module.exports = [
    {
      _id: Math.round(Math.random() * 1000000),
      text: 'Here we start from redirecting to facebook website https://www.facebook.com',
      createdAt: new Date(Date.UTC(2019, 0, 30, 3, 20, 0)),
      user: {
        _id: 1,
        name: 'Kyndor',
      },
    },
    {
      _id: Math.round(Math.random() * 1000000),
      text: 'This is a basic chat interface with very less known functionalities such as url redirecting, hashtagging, mentioning, getting phone numbers',
      createdAt: new Date(Date.UTC(2019, 0, 30, 3, 20, 0)),
      user: {
        _id: 1,
        name: 'Kyndor',
      },
    },
    
  ];