import sanityClient from '@sanity/client'
export default sanityClient({
  projectId: 'ckjx33ma',
  dataset: 'production',
  useCdn: true
})
