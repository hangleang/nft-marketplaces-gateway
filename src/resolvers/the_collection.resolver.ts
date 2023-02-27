import { Resolvers } from '../../.mesh'

const resolvers: Resolvers = {
  // OpenSeaAllListingsResponse: {
  //   myCollection: 
  // },
  OpenSeaAllListingsResponse: {
    myCollection: {
      selectionSet: `{
        listings
      }`,
      resolve(root, _args, context, info) {
        const id = root.listings?.at(0)?.protocol_data?.parameters?.offer?.at(0)?.token?.toLowerCase();
        
        if (!id) return null;

        return context.WTFMarketplace.Query.collection({
          root,
          context,
          info,
          args: {
            id
          }
        })
      }
    }
  },
  Token: {
    openseaListings: {
      selectionSet: /* GraphQL */ `
        {
          collection { id }, tokenId
        }
      `,
      resolve(root, _args, context, info) {
        return context.OpenSeaAPI.Query.openseaListings({
          root,
          args: {
            asset_contract_address: root.collection.id,
            token_ids: root.tokenId
          },
          context,
          info
        })
      } 
    },
    openseaOffers: {
      selectionSet: /* GraphQL */ `
        {
          collection { id }, tokenId
        }
      `,
      resolve(root, _args, context, info) {
        return context.OpenSeaAPI.Query.openseaOffers({
          root,
          args: {
            asset_contract_address: root.collection.id,
            token_ids: root.tokenId
          },
          context,
          info
        });
      }
    }
  },
  Query: {
    theCollection: {
      resolve(root, args, context, info) {
        return context.WTFMarketplace.Query.collection({
          root,
          context,
          info,
          args: {
            id: args.id
          },
          key: args.id
        }).then((data) => ({
          myCollection: data
        }))
      }
    }
  }
}

export default resolvers;