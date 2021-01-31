/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateItems = /* GraphQL */ `
  subscription OnCreateItems(
    $org: String
    $sku_number: Int
    $sku_desc: String
    $customer: String
    $level: String
  ) {
    onCreateItems(
      org: $org
      sku_number: $sku_number
      sku_desc: $sku_desc
      customer: $customer
      level: $level
    ) {
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
export const onUpdateItems = /* GraphQL */ `
  subscription OnUpdateItems(
    $org: String
    $sku_number: Int
    $sku_desc: String
    $customer: String
    $level: String
  ) {
    onUpdateItems(
      org: $org
      sku_number: $sku_number
      sku_desc: $sku_desc
      customer: $customer
      level: $level
    ) {
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
export const onDeleteItems = /* GraphQL */ `
  subscription OnDeleteItems(
    $org: String
    $sku_number: Int
    $sku_desc: String
    $customer: String
    $level: String
  ) {
    onDeleteItems(
      org: $org
      sku_number: $sku_number
      sku_desc: $sku_desc
      customer: $customer
      level: $level
    ) {
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
