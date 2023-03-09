import { Resolvers } from '../.graphclient'

const resolvers: Resolvers = {
  Account: {
    asUser: {
      selectionSet: /* GraphQL */ `{ id }`,
      resolve: async (root, _args, context, info) => await context.WTFMarketplace.Query.user({
        root, context, info, args: { id: root.id }
      })
    },
    openseaListings: {
      selectionSet: /* GraphQL */ `{ id }`,
      resolve: async (root, _args, context, info) => await context.OpenSeaAPI.Query.openseaListings({
        root, context, info, args: { maker: root.id }
      })
    },
    openseaOffers: {
      selectionSet: /* GraphQL */ `{ id }`,
      resolve: async (root, _args, context, info) => await context.OpenSeaAPI.Query.openseaOffers({
        root, context, info, args: { maker: root.id }
      })
    },
    openseaGivenOffers: {
      selectionSet: /* GraphQL */ `{ id }`,
      resolve: async (root, _args, context, info) => await context.OpenSeaAPI.Query.openseaOffers({
        root, context, info, args: { taker: root.id }
      })
    }
  },
  User: {
    asAccount: {
      selectionSet: /* GraphQL */ `{ id }`,
      resolve: async (root, _args, context, info) => await context.NFTs.Query.account({
        root, context, info, args: { id: root.id }
      })
    },
  },
  ERC721Contract: {
    asMyCollection: {
      selectionSet: /* GraphQL */ `{ id }`,
      resolve: async (root, _args, context, info) => await context.WTFMarketplace.Query.collection({
        root, context, info, args: { id: root.id }
      })
    },
    asOpenseaContract: {
      selectionSet: /* GraphQL */ `{ id }`,
      resolve: async (root, _args, context, info) => context.OpenSeaOldAPI.Query.openseaAssetContract({
        root, context, info, args: { asset_contract_address: root.id }
      })
    },
  },
  ERC1155Contract: {
    asMyCollection: {
      selectionSet: /* GraphQL */ `{ id }`,
      resolve: async (root, _args, context, info) => await context.WTFMarketplace.Query.collection({
        root, context, info, args: { id: root.id }
      })
    },
    asOpenseaContract: {
      selectionSet: /* GraphQL */ `{ id }`,
      resolve: async (root, _args, context, info) => context.OpenSeaOldAPI.Query.openseaAssetContract({
        root, context, info, args: { asset_contract_address: root.id }
      })
    },
  },
  ERC721Token: {
    asMyToken: {
      selectionSet: /* GraphQL */ `{ id }`,
      resolve: async (root, _args, context, info) => await context.WTFMarketplace.Query.token({
        root, context, info, args: { id: root.id }
      })
    },
    openseaListings: {
      selectionSet: /* GraphQL */ `{ contract { id } identifier }`,
      resolve: async (root, _args, context, info) => await context.OpenSeaAPI.Query.openseaListings({
        root, context, info, args: { asset_contract_address: root.contract.id, token_ids: root.identifier }
      })
    },
    openseaOffers: {
      selectionSet: /* GraphQL */ `{ contract { id } identifier }`,
      resolve: async (root, _args, context, info) => await context.OpenSeaAPI.Query.openseaOffers({
        root, context, info, args: { asset_contract_address: root.contract.id, token_ids: root.identifier }
      })
    }
  },
  ERC1155Token: {
    asMyToken: {
      selectionSet: /* GraphQL */ `{ id }`,
      resolve: async (root, _args, context, info) => await context.WTFMarketplace.Query.token({
        root, context, info, args: { id: root.id }
      })
    },
    openseaListings: {
      selectionSet: /* GraphQL */ `{ contract { id } identifier }`,
      resolve: async (root, _args, context, info) => await context.OpenSeaAPI.Query.openseaListings({
        root, context, info, args: { asset_contract_address: root.contract.id, token_ids: root.identifier }
      })
    },
    openseaOffers: {
      selectionSet: /* GraphQL */ `{ contract { id } identifier }`,
      resolve: async (root, _args, context, info) => await context.OpenSeaAPI.Query.openseaOffers({
        root, context, info, args: { asset_contract_address: root.contract.id, token_ids: root.identifier }
      })
    }
  },
  Collection: {
    asContract: {
      selectionSet: /* GraphQL */ `{ id, collectionType }`,
      resolve: async (root, _args, context, info) => {
        if (root.collectionType == "MultiEdition") {
          return context.NFTs.Query.erc1155Contract({
            root, context, info, args: { id: root.id }
          })
        } else if (root.collectionType == "SingleEdition") {
          return context.NFTs.Query.erc721Contract({
            root, context, info, args: { id: root.id }
          })
        }
        return null;
      }
    }
  },
  Token: {
    asNFT: {
      selectionSet: /* GraphQL */ `{ id, collection { collectionType } }`,
      resolve: async (root, _args, context, info) => {
        if (root.collection.collectionType == "MultiEdition") {
          return context.NFTs.Query.erc1155Token({
            root, context, info, args: { id: root.id }
          })
        } else if (root.collection.collectionType == "SingleEdition") {
          return context.NFTs.Query.erc721Token({
            root, context, info, args: { id: root.id }
          })
        } 
        return null
      }
    }
  },
  OS_Collection: {
    asContract: {
      selectionSet: /* GraphQL */ `{ id, nftStandard }`,
      resolve: async (root, _args, context, info) => {
        if (root.nftStandard == "ERC1155") {
          return context.NFTs.Query.erc1155Contract({
            root, context, info, args: { id: root.id }
          })
        } else if (root.nftStandard == "ERC721") {
          return context.NFTs.Query.erc721Contract({
            root, context, info, args: { id: root.id }
          })
        }
        return null;
      }
    },
    asOpenseaContract: {
      selectionSet: /* GraphQL */ `{ id }`,
      resolve: async (root, _args, context, info) => context.OpenSeaOldAPI.Query.openseaAssetContract({
        root, context, info, args: { asset_contract_address: root.id }
      })
    }
  },
  OpenSeaAssetContract: {
    asOpenseaCollection: {
      selectionSet: /* GraphQL */ `{ address }`,
      resolve: async (root, _args, context, info) => {
        const id = root.address;
        if (!id) return null;
        
        return context.OpenSeaSeaport.Query.os_collection({
          root, context, info, args: { id }
        })
      }
    },
    openseaAllListings: {
      selectionSet: /* GraphQL */ `{ collection { slug } }`,
      resolve: async (root, _args, context, info) => {
        const slug = root.collection?.slug;
        if (!slug) return null;

        return context.OpenSeaAPI.Query.openseaAllListings({
          root, context, info, args: { slug: slug }
        })
      }
    },
    openseaAllOffers: {
      selectionSet: /* GraphQL */ `{ collection { slug } }`,
      resolve: async (root, _args, context, info) => {
        const slug = root.collection?.slug;
        if (!slug) return null;

        return context.OpenSeaAPI.Query.openseaAllOffers({
          root, context, info, args: { slug }
        })
      }
    }
  },
  // Query: {
  //   marketplaces: async (root, _args, context, info) => {
  //     return Promise.all([
  //       context.WTFMarketplace.Query.marketplaces({root, context, info}),
  //       context.OpenSeaSeaport.Query.marketplaces({root, context, info})
  //     ]).then((all) => all.flat())
  //   },
  //   marketplace: async (root, args, context, info) => {
  //     return Promise.all([
  //       context.WTFMarketplace.Query.marketplace({root, context, info, args}),
  //       context.OpenSeaSeaport.Query.marketplace({root, context, info, args})
  //     ]).then((all) => all.find((e) => e != null || e != undefined) || null)
  //   }
  // }
}

export default resolvers;