import { Resolvers } from '../.graphclient'

const resolvers: Resolvers = {
  NFToken: {
    myToken: {
      selectionSet: /* GraphQL */ `{ id }`,
      resolve: async (root, _args, context, info) => await context.WTFMarketplace.Query.token({
        root, context, info, args: { id: root.id }
      })
    }
  },
  NFTCollection: {
    myCollection: {
      selectionSet: /* GraphQL */ `{ id }`,
      resolve: async (root, _args, context, info) => await context.WTFMarketplace.Query.collection({
        root, context, info, args: { id: root.id }
      })
    }
  },
  Collection: {
    nftCollection: {
      selectionSet: /* GraphQL */ `{ id, collectionType }`,
      resolve: async (root, _args, context, info) => {
        if (root.collectionType == "SingleEdition") {
          return context.NFTs.Query.erc721Contract({
            root, context, info, args: { id: root.id }
          })
        } else if (root.collectionType == "MultiEdition") {
          return context.NFTs.Query.erc1155Contract({
            root, context, info, args: { id: root.id }
          })
        } else {
          return null;
        }
      }
    }
  },
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
}

export default resolvers;