/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getItems = /* GraphQL */ `
  query GetItems($org: String!) {
    getItems(org: $org) {
      customer
      high
      level
      low
      message
      org
      sku_desc
      sku_number
      value
    }
  }
`;
export const listItems = /* GraphQL */ `
  query ListItems(
    $filter: TableItemsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        customer
        high
        level
        low
        message
        org
        sku_desc
        sku_number
        value
      }
      nextToken
    }
  }
`;


// export const addItem = 