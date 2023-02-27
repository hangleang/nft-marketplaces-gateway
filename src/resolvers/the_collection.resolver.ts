import { Resolvers } from '../../.graphclient'

const resolvers: Resolvers = {
  // OpenSeaAllListingsResponse: {
  //   myCollection: {
  //     selectionSet: `{
  //       listings
  //     }`,
  //     resolve(root, _args, context, info) {
  //       const id = root.listings?.at(0)?.protocol_data?.parameters?.offer?.at(0)?.token?.toLowerCase();
        
  //       if (!id) return null;

  //       return context.WTFMarketplace.Query.collection({
  //         root,
  //         context,
  //         info,
  //         args: {
  //           id
  //         }
  //       })
  //     }
  //   }
  // },
  // Collection: {
  //   openseaAllListings: {
  //     selectionSet: /* GraphQL */ `
  //       {
  //         id
  //       }
  //     `,
  //     resolve(root, _args, context, info) {
  //       return context.OpenSeaAPI.Query.openseaAllListings({
  //         root, context, info, args: { slug: root.id }
  //       })
  //     }
  //   },
  //   openseaAllOffers: {
  //     selectionSet: /* GraphQL */ `
  //       {
  //         id
  //       }
  //     `,
  //     resolve(root, _args, context, info) {
  //       return context.OpenSeaAPI.Query.openseaAllOffers({
  //         root, context, info, args: { slug: root.id }
  //       })
  //     }
  //   }
  // },
  // Token: {
  //   openseaListings: {
  //     selectionSet: /* GraphQL */ `
  //       {
  //         collection { id }, tokenId
  //       }
  //     `,
  //     resolve(root, _args, context, info) {
  //       return context.OpenSeaAPI.Query.openseaListings({
  //         root,
  //         args: {
  //           asset_contract_address: root.collection.id,
  //           token_ids: root.tokenId
  //         },
  //         context,
  //         info
  //       })
  //     } 
  //   },
  //   openseaOffers: {
  //     selectionSet: /* GraphQL */ `
  //       {
  //         collection { id }, tokenId
  //       }
  //     `,
  //     resolve(root, _args, context, info) {
  //       return context.OpenSeaAPI.Query.openseaOffers({
  //         root,
  //         args: {
  //           asset_contract_address: root.collection.id,
  //           token_ids: root.tokenId
  //         },
  //         context,
  //         info
  //       });
  //     }
  //   }
  // },
  NFToken: {
    details: {
      selectionSet: /* GraphQL */ `{ id }`,
      resolve: async (root, _args, context, info) => await context.WTFMarketplace.Query.token({
        root, context, info, args: { id: root.id }
      })
    }
  },
  NFTCollection: {
    details: {
      selectionSet: /* GraphQL */ `{ id }`,
      resolve: async (root, _args, context, info) => await context.WTFMarketplace.Query.collection({
        root, context, info, args: { id: root.id }
      })
    }
  }
}

export default resolvers;