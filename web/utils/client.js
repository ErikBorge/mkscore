import sanityClient from '@sanity/client'
const client = sanityClient({
  projectId: 'ckjx33ma',
  dataset: 'production',
  useCdn: true,
  // token: 'skwa0Z6GpGwXULs744cC4XPZNuNYQqXcWYcaMWpYf5MPeI2zbsPNaUZLKZmUaqumyg9uzxrecwT9CE5dgXiDIeExvKrm9N74rr6T7myx0A3OrBlyx6qXpaybvlUXsyaxktqfyBn1tKlPvTNHjw243rRX2PosZuncWcf6BdAdZ1EEiMztQkGo'
})

export default client;
