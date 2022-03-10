  // I am creating a game, on my contract I want to have an array of users. Every user should have array_Of_NFTS, maxScore and walletAdress. The  array_Of_NFTS should have items (every item will be an object with  imageLink & points )

  Example of data structure:

  const users = [
    '0xf4eA652F5B7b55f1493631Ea4aFAA63Fe0acc27C': {
      maxScore: 90,
      arrayNFTS: [
        {
          link: "unsplash.com",
          points: 20
          },
        {
          link: "unsplash.com",
          points: 20
          },
      ]
    },

    '0xf4eA652F5B7b55f1493631Ea4aFAA63Fe0acc27C': {
      maxScore: 90,
      arrayNFTS: [
        {
          link: "unsplash.com",
          points: 20
          },
        {
          link: "unsplash.com",
          points: 20
          },
      ]
    },
  ]


where every user will have an

 and my question is, can have a struct inside  another struct using Solidity?  if so how can I accomplish this?



1:
{
  arrayNFTS: [
    {
      link: "unsplash,.com",
      points: 20
      },
    {
      link: "unsplash,.com",
      points: 20
      },
    {
      link: "unsplash,.com",
      points: 20
      },
    {
      link: "unsplash,.com",
      points: 20
      },
    ]

}


arrayOfNFTs = [
        {
            link: "unsplash.com/something",
            points: 100
        },

        {
            link: "unsplash.com/something",
            points: 100
        },

     ]
