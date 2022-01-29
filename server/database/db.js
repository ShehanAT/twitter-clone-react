const users = [
    {
      id: '1',
      firstName: 'Andrew',
      lastName: 'Obama',
      email: 'andrew@example.com',
      password: '2342adfawewoi2u34',
      age: 27,
    },
    {
      id: '2',
      firstName: 'Hannah',
      lastName: 'Schweinstagger',
      email: 'sarah@example.com',
      password: '2342adfawasdfawe3223',
      age: 23
    },
    {
      id: '3',
      firstName: 'Micheal',
      lastName: 'Borgia',
      email: 'mike@example.com',
      password: '234aedfasdfwe5674yp',
      age: 23
    },
  ];
  
  const tweets = [
    {
      id: '10',
      body: 'These are tweets read from a JSON file acting as a primitive database',
      published: true,
      author: '1',
    },
    {
      id: '11',
      body: 'The flying velocity of a bald eagle is 88mph on windy days',
      published: false,
      author: '1',
    },
    {
      id: '12',
      body: 'Exercise strengths the body and mind',
      published: true,
      author: '2',
    },
  ];
  
  const comments = [
    {
      id: '102',
      text: 'This worked well for me. Thanks!',
      author: '3',
      post: '10',
    },
    {
      id: '103',
      text: 'Glad you enjoyed it.',
      author: '1',
      post: '10',
    },
    {
      id: '104',
      text: 'This did no work.',
      author: '2',
      post: '11',
    },
    {
      id: '105',
      text: 'Nevermind. I got it to work.',
      author: '1',
      post: '12',
    },
  ];
  
  const db = {
    users,
    tweets,
    comments,
  };
  
  export { db as default };
  