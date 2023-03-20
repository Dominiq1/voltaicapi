import '@/styles/globals.css'
import { InMemoryCache, ApolloClient, ApolloProvider, useQuery } from '@apollo/client';

import { LicenseInfo } from '@mui/x-license-pro';

LicenseInfo.setLicenseKey('9e17734200a964cd420488accda5490fTz01ODkyOSxFPTE3MDY4NzA0MzEyMTAsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI=');



export default function App({ Component, pageProps }) {



  const cache = new InMemoryCache({
    typePolicies:{
      Query:{
        fields:{
          clients:{
            merge(existing, incoming){
              return incoming;
            },
          },
          projects: {
            merge(existing, incoming){
              return incoming;
            }
          },
          leads: {
            merge(existing, incoming){
              return incoming;
            },
          },
          users: {
            merge(existing, incoming){
              return incoming;
            },
          }
        }
      }
    }
  });
 //      uri: 'http://localhost:5000/graphql',
 const client = new ApolloClient({
  uri: '/graphql',
  cache,
})


  return( 
    <>
     <ApolloProvider client={client}>

       <Component {...pageProps} />

      </ApolloProvider>

    </>

  )
}
