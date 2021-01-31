/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateItems = /* GraphQL */ `
  subscription OnCreateItems(
    $customer: String
    $level: String
    $org: String
    $sku_desc: String
    $sku_number: Int
  ) {
    onCreateItems(
      customer: $customer
      level: $level
      org: $org
      sku_desc: $sku_desc
      sku_number: $sku_number
    ) {
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
export const onDeleteItems = /* GraphQL */ `
  subscription OnDeleteItems(
    $customer: String
    $level: String
    $org: String
    $sku_desc: String
    $sku_number: Int
  ) {
    onDeleteItems(
      customer: $customer
      level: $level
      org: $org
      sku_desc: $sku_desc
      sku_number: $sku_number
    ) {
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
export const onUpdateItems = /* GraphQL */ `
  subscription OnUpdateItems(
    $customer: String
    $level: String
    $org: String
    $sku_desc: String
    $sku_number: Int
  ) {
    onUpdateItems(
      customer: $customer
      level: $level
      org: $org
      sku_desc: $sku_desc
      sku_number: $sku_number
    ) {
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
