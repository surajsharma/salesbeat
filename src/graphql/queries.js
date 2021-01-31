/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getItems = /* GraphQL */ `
  query GetItems($org: String!) {
    getItems(org: $org) {
      org
      sku_number
      sku_desc
      customer
      level
      low
      high
      value
      message
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
        org
        sku_number
        sku_desc
        customer
        level
        low
        high
        value
        message
      }
      nextToken
    }
  }
`;
