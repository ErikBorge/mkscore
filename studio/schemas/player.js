export default {
  name: 'player',
  title: 'Player',
  type: 'document',
  liveEdit: false,
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
    },
    {
      title: 'Nick',
      name: 'nick',
      type: 'string',
    },
    {
      title: 'Image',
      name: 'image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      title: 'Player level',
      name: 'level',
      type: 'string',
    },
    {
      title: 'Tier',
      name: 'tier',
      type: 'string',
    },
    {
      title: 'Multiplayer grade',
      name: 'multiplayerGrade',
      type: 'string',
    },
    {
      title: 'Age',
      name: 'age',
      type: 'string',
    },
    {
      title: 'Height [m]',
      name: 'height',
      type: 'string',
    },
    {
      title: 'Bench press max [kg]',
      name: 'benchPress',
      type: 'string',
    },
    {
      title: 'Favorite pokémon',
      name: 'favoritePokemon',
      type: 'string',
    },
    {
      title: 'Illnesses',
      name: 'illnesses',
      type: 'array',
      of: [{type: 'string'}]
    },
  ],
};
