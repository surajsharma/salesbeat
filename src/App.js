// https://master.d3n3stkm7zxdye.amplifyapp.com/

import Amplify, { API, graphqlOperation, Auth } from "aws-amplify";
import awsconfig from "./aws-exports";
import { AmplifySignOut, withAuthenticator } from "@aws-amplify/ui-react";
import { useState, useEffect } from "react";
import { listItems } from "./graphql/queries";
import { createItems, deleteItems, updateItems } from "./graphql/mutations";
import {
  Flex,
  Spacer,
  Box,
  Input,
  Button,
  Grid,
  Center,
  GridItem,
} from "@chakra-ui/react";
import "./App.css";

Amplify.configure(awsconfig);

function App() {
  const [orgs, setOrgs] = useState(null);
  const [formData, setFormData] = useState([]);
  const [itemData, setItemData] = useState([]);
  const [editableId, setEditableId] = useState(null);

  useEffect(() => {
    if (!orgs) {
      fetchOrgs();
    } else {
      console.log(orgs, AmplifySignOut);
    }
  }, [orgs]);

  const fetchOrgs = async () => {
    try {
      const data = await API.graphql(graphqlOperation(listItems));
      const list = data.data.listItems.items;
      setOrgs(list);
    } catch (error) {
      console.log("error on fetching items", error);
    }
  };

  const addNewItem = async (data) => {
    try {
      const result = await API.graphql(
        graphqlOperation(createItems, { input: data })
      );
      const newItems = [...orgs, result.data.createItems];
      setOrgs(newItems);
      setFormData([]);
      console.log(result);
    } catch (error) {
      console.log("error on adding new item", error);
    }
  };

  const deleteItem = async (item) => {
    try {
      const result = await API.graphql(
        graphqlOperation(deleteItems, { input: item })
      );
      const newItems = orgs.filter(
        (o) => o.org !== result.data.deleteItems.org
      );
      setOrgs(newItems);
      console.log(result.data.deleteItems);
    } catch (error) {
      console.log("error on deleting item", error.error);
    }
  };

  const updateItem = async (item) => {
    try {
      const result = await API.graphql(
        graphqlOperation(updateItems, { input: item })
      );
      console.log(result.data);
    } catch (error) {
      console.log("error on updating item", error.errors);
    }

    if (setEditableId) {
      setEditableId(null);
      setItemData([]);
      fetchOrgs();
    }
  };

  const AddModal = () => {
    return (
      <Flex p={4} direction={"column"} className="App-header">
        <Input
          onChange={(e) => setFormData({ ...formData, org: e.target.value })}
          placeholder="org"
          value={formData.description}
        />
        <Spacer />
        <Input
          onChange={(e) =>
            setFormData({ ...formData, customer: e.target.value })
          }
          placeholder="customer"
          value={formData.name}
        />
        <Spacer />
        <Input
          onChange={(e) =>
            setFormData({ ...formData, sku_number: e.target.value })
          }
          placeholder="sku number"
          value={formData.sku_number}
        />
        <Spacer />
        <Input
          onChange={(e) =>
            setFormData({ ...formData, sku_desc: e.target.value })
          }
          placeholder="sku description"
          value={formData.sku_desc}
        />
        <Spacer />
        <Input
          onChange={(e) => setFormData({ ...formData, value: e.target.value })}
          placeholder="value"
          value={formData.value}
        />
        <Spacer />
        <Input
          onChange={(e) => setFormData({ ...formData, high: e.target.value })}
          placeholder="high"
          value={formData.high}
        />
        <Spacer />
        <Input
          onChange={(e) => setFormData({ ...formData, low: e.target.value })}
          placeholder="low"
          value={formData.low}
        />
        <Spacer />
        <Input
          onChange={(e) => setFormData({ ...formData, level: e.target.value })}
          placeholder="level"
          value={formData.level}
        />
        <Spacer />
        <Input
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          placeholder="message"
          value={formData.message}
        />
        <Spacer />
        <Button onClick={() => addNewItem(formData)}>Add Item</Button>
        <hr />
      </Flex>
    );
  };

  return (
    <div className="App">
      <Button onClick={() => Auth.signOut()}>Sign Out</Button>
      <Grid templateColumns="repeat(1, 1fr)" gap={6}>
        {orgs &&
          orgs.map((org, index) => (
            <GridItem key={org.org} p={4}>
              <Box p={4} borderWidth="1px" borderRadius="lg" overflow="hidden">
                {Object.entries(org).map(([k, v]) => {
                  return editableId === index && k !== "org" ? (
                    <Input
                      onChange={(e) => {
                        let key = k;
                        let val = e.target.value;
                        let obj = {};
                        obj[key] = val;
                        setItemData({ ...itemData, ...obj });
                      }}
                      placeholder={k}
                      value={itemData[k] ? itemData[k] : v}
                      key={k}
                    />
                  ) : (
                    <p key={k}>{`${k}:${v}`}</p>
                  );
                })}
                <br />
                <hr />
                <br />
                <Button colorScheme="red" onClick={() => deleteItem(org)}>
                  Delete
                </Button>
                &nbsp;
                <Button
                  onClick={() => {
                    console.log({ ...org, ...itemData });
                    editableId === index
                      ? updateItem({ ...org, ...itemData })
                      : setEditableId(index);
                  }}
                >
                  {editableId === index ? "Update Item" : "Edit Item"}
                </Button>
                <br />
              </Box>
            </GridItem>
          ))}
      </Grid>
    </div>
  );
}

export default withAuthenticator(App);
