import { gql } from 'apollo-server';
import { DocumentNode } from 'graphql';
import buyer from './buyer';
import produce from './produce';
import supplier from './supplier';
import user from './user';

const coreTypeDefs: DocumentNode = gql`
  type Mutation {
    createSupplier(data: SupplierUpdateInput): Supplier
    createProduce(data: ProduceUpdateInput): Produce
    updateProduce(data: ProduceUpdateInput!, id: ID!): Produce
    createBuyer(data: BuyerUpdateInput): Buyer
    updateBuyer(data: BuyerUpdateInput!, id: ID!): Buyer
    updateSupplier(data: SupplierUpdateInput!, id: ID!): Supplier
  }

  type Query {
    users: [User]
    buyersList: [Buyer]
    produceList: [Produce]
    supplierList: [Supplier]
  }
`;

export default [buyer, coreTypeDefs, produce, supplier, user];
